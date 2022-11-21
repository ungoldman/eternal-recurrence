// adapted from https://github.com/austenstone/openai-completion-action/blob/4ceec96fe77a0734567849606910f7d7b5723642/src/context.ts

import * as core from '@actions/core'
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai'

import { randomCommitMsg } from './prompts';
import { fetchEnv } from './env';

export const run = async () => {
  const OPENAI_API_KEY = fetchEnv()

  const engineId = core.getInput('engineId') || 'text-davinci-002'

  core.setOutput('engine_id', engineId)

  const [prompt, commitMsg] = randomCommitMsg();
  
  core.setOutput('prompt', prompt)
  core.setOutput('commitMsg', commitMsg)

  const payload: CreateCompletionRequest = {
    prompt,
    max_tokens: parseInt(core.getInput('max_tokens')) || 2048,
    temperature: parseInt(core.getInput('temperature')) || 0.9,
    top_p: parseInt(core.getInput('top_p')) || undefined,
    n: parseInt(core.getInput('n')) || undefined,
    stream: core.getInput('echo') ? Boolean(core.getInput('stream')) : undefined,
    logprobs: parseInt(core.getInput('logprobs')) || undefined,
    echo: Boolean(core.getInput('echo')) || undefined,
    stop: core.getInput('stop') || undefined,
    presence_penalty: parseInt(core.getInput('presence_penalty')) || undefined,
    frequency_penalty: parseInt(core.getInput('frequency_penalty')) || undefined,
    best_of: parseInt(core.getInput('best_of')) || undefined,
    logit_bias: ((lb) => {
      try {
        return JSON.parse(lb)
      } catch (e) {
        return undefined
      }
    })(core.getInput('logit_bias'))
  }

  if (!payload.prompt) {
    core.setFailed('No prompt provided')
    return
  }

  const configuration = new Configuration({ apiKey: OPENAI_API_KEY })
  const openai = new OpenAIApi(configuration)

  core.info(`Request using engineId: ${engineId}`)
  core.info(JSON.stringify(payload, null, 2))

  openai.createCompletion(engineId, payload).then((response) => {
    const data = response.data.choices?.[0]?.text || response.data

    core.info('Response:')
    core.info(JSON.stringify(data, null, 2))
    core.setOutput('response', JSON.stringify(data))

    const datePrefix = ((new Date()).toISOString()).slice(0, 10)
    const baseName = `${datePrefix} - ${commitMsg}`
    const fileName = `stories/${baseName}.md`
    const linkText = `- [${baseName}](${fileName.replace(/ /g, '%20')})`
    core.setOutput('baseName', baseName)
    core.setOutput('fileName', fileName)
    core.setOutput('linkText', linkText)
  }).catch((err) => {
    core.setFailed(err)
  })
}
