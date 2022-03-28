// adapted from https://github.com/austenstone/openai-completion-action/blob/4ceec96fe77a0734567849606910f7d7b5723642/src/context.ts

import * as core from '@actions/core'
import { Configuration, OpenAIApi } from 'openai'

const mediums = [
  'poem',
  'haiku',
  'soliloquy',
  'short story',
  'meditation',
  'speech',
  'essay',
  'journal entry',
  'abstract',
  'thought'
]
const subjects = [
  'existentialism',
  'the nature of existence',
  'idealism',
  'cynicism',
  'realism',
  'pragmatism',
  'theoretical particle physics',
  'politics',
  'economics',
  'love',
  'human computer interaction',
  'a dream',
  'the sun',
  'the moon',
  'the stars',
  'the universe',
  'science',
  'faith',
  'humanity',
  'artificial intelligence',
  'a subject of your choosing'
]
const styles = [
  'Friedrich Nietzsche',
  'David Hume',
  'Baruch Spinoza',
  'René Descartes',
  'Rabindranath Tagore',
  'Confucius',
  'Lao Tzu',
  'Avicenna',
  'Epictetus',
  'Socrates',
  'Aristotle',
  'Plato',
  'Diogenes',
  'Albert Camus',
  'Paul Sartre',
  'Simone de Beauvoire',
  'Hannah Arendt',
  'your choosing'
]

function oneOf (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const run = async () => {
  if (typeof process.env.OPENAI_API_KEY == null) {
    throw new Error('missing required env var: process.env.OPENAI_API_KEY')
  }

  const medium = oneOf(mediums)
  const subject = oneOf(subjects)
  const style = oneOf(styles)
  const engineId = core.getInput('engineId') || 'text-davinci-002'
  const prompt = core.getInput('prompt') || `Please write an original ${medium} about ${subject} in the style of ${style}.`

  core.setOutput('medium', medium)
  core.setOutput('subject', subject)
  core.setOutput('style', style)
  core.setOutput('style', engineId)
  core.setOutput('prompt', prompt)

  const payload = {
    prompt,
    max_tokens: parseInt(core.getInput('max_tokens')) || 2048,
    temperature: parseInt(core.getInput('temperature')) || 0.9,
    top_p: parseInt(core.getInput('top_p')) || undefined,
    n: parseInt(core.getInput('n')) || undefined,
    stream: core.getInput('echo') ? Boolean(core.getInput('stream')) : undefined,
    logprobs: parseInt(core.getInput('logprobs')) || undefined,
    echo: core.getInput('echo') || undefined,
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

  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
  const openai = new OpenAIApi(configuration)

  core.info(`Request using engineId: ${engineId}`)
  core.info(JSON.stringify(payload, null, 2))

  openai.createCompletion(engineId, payload).then((response) => {
    const data = response.data.choices?.[0]?.text || response.data

    console.log(data)

    core.info('Response:')
    core.info(JSON.stringify(data, null, 2))
    core.setOutput('response', JSON.stringify(data))
  }).catch((err) => {
    core.setFailed(err)
  })
}

// no top-level await until standard@17
// https://github.com/standard/standard/issues/1548
(async function () { await run() })()