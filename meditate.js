// adapted from https://github.com/austenstone/openai-completion-action/blob/4ceec96fe77a0734567849606910f7d7b5723642/src/context.ts

import * as core from '@actions/core'
import { Configuration, OpenAIApi } from 'openai'

const mediums = [
  'poem',
  'soliloquy',
  'short story',
  'meditation',
  'speech',
  'essay',
  'journal entry',
  'reflection',
  'ode',
  'song',
  'fable',
  'fairy tale',
  'yarn',
  'tall tale',
  'parable'
]

const subjects = [
  'existentialism',
  'the nature of existence',
  'idealism',
  'cynicism',
  'realism',
  'pragmatism',
  'theoretical particle physics',
  'quantum physics',
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
  'truth',
  'uncertainty',
  'mortality',
  'transcendence',
  'enlightenment',
  'humanity',
  'artificial intelligence',
  'art',
  'food',
  'revolution',
  'justice',
  'ethics',
  'ambiguity',
  'joy',
  'adventure',
  'tragedy',
  'action',
  'comedy',
  'youth',
  'old age',
  'middle age',
  'depression',
  'inspiration',
  'a subject of your choosing'
]

const relations = [
  'in the style of',
  'based on the works of'
]

const authors = [
  'Friedrich Nietzsche',
  'Ludwig Wittgenstein',
  'David Hume',
  'Mary Wollstonecraft',
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
  'Hypatia',
  'Albert Camus',
  'Simone Weil',
  'Paul Sartre',
  'Simone de Beauvoire',
  'Hannah Arendt',
  'Alan Watts',
  'Hermann Hesse',
  'Iris Murdoch',
  'Judith Butler',
  'bell hooks',
  'Octavia Butler',
  'Angela Davis',
  'W.E.B. Du Bois',
  'Cornel West',
  'Kwame Anthony Appiah',
  'Ursula K. Le Guin',
  'Philip K. Dick',
  'J.R.R. Tolkein',
  'Isaac Asimov',
  'James Joyce',
  'Oscar Wilde',
  'Virginia Woolf',
  'Dante Alighieri',
  'William Shakespeare',
  'Lev Tolstoy',
  'Fyodor Dostoevsky',
  'Sophocles',
  'Edgar Allan Poe',
  'Ernest Hemingway',
  'Haruki Murakami',
  'Mark Twain',
  'Arthur Conan Doyle',
  'Molière',
  'your choosing'
]

function oneOf (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const run = async () => {
  const { OPENAI_API_KEY, CUSTOM_PROMPT } = process.env

  if (OPENAI_API_KEY == null) {
    throw new Error('Missing required env var: OPENAI_API_KEY')
  }

  const engineId = core.getInput('engineId') || 'text-davinci-002'

  let prompt
  let commitMsg

  core.setOutput('engine_id', engineId)

  if (typeof CUSTOM_PROMPT === 'string' && CUSTOM_PROMPT !== '') {
    prompt = CUSTOM_PROMPT
    commitMsg = prompt.charAt(0).toUpperCase() + prompt.slice(1)

    core.setOutput('prompt', prompt)
    core.setOutput('commitMsg', commitMsg)
  } else {
    const medium = oneOf(mediums)
    const subject = oneOf(subjects)
    const relation = oneOf(relations)
    const author = oneOf(authors)
    const message = `${medium} about ${subject} ${relation} ${author}`

    prompt = `Please write an original ${message}.`
    commitMsg = message.charAt(0).toUpperCase() + message.slice(1)

    core.setOutput('prompt', prompt)
    core.setOutput('commitMsg', commitMsg)
  }

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

    core.info('Response:')
    core.info(JSON.stringify(data, null, 2))
    core.setOutput('response', JSON.stringify(data))

    const datePrefix = ((new Date()).toISOString()).slice(0, 10)
    const baseName = `${datePrefix} - ${commitMsg}`
    const fileName = `stories/${baseName}.md`
    core.setOutput('baseName', baseName)
    core.setOutput('fileName', fileName)
  }).catch((err) => {
    core.setFailed(err)
  })
}

// no top-level await until standard@17
// https://github.com/standard/standard/issues/1548
(async function () { await run() })()
