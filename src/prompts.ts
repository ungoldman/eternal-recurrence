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
  'parable',
  'comedy',
  'tragedy'
]

const prepositions = [
  'about',
  'on',
  'concerning',
  'considering',
  'regarding',
  'for'
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
  'based on the works of',
  'written by',
  'in the voice of'
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

const oneOf = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const randomCommitMsg = (): string[] => {
    const medium = oneOf(mediums)
    const prep = oneOf(prepositions)
    const subject = oneOf(subjects)
    const relation = oneOf(relations)
    const author = oneOf(authors)
    const message = `${medium} ${prep} ${subject} ${relation} ${author}`

    const prompt = `Please write an original ${message}.`
    const commitMsg = message.charAt(0).toUpperCase() + message.slice(1)
    return [prompt, commitMsg];
}    
