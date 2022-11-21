# Eternal Recurrence

An experiment in generative creative writing.

## About

Feeds a randomly generated prompt to [OpenAI's Completions API](https://beta.openai.com/docs/api-reference/completions) to produce a (*hopefully*) original text each time.


## Usage

1. Put your API key in a .env file at the root
2. Run TSC to build dist directory with JavaScript files
3. Run run.cjs to produce text


### Configuration

Put your OpenAI key into the __.env.sample__ file and then copy it to __.env__
```sh
$ cp .env.sample .env
```


### Build Javascript files

Create the dist directory containing the Javascript files
```sh
$ npm run build
```


### Run the executable

Run __run.cjs__ to fetch text. Will write out to stdio.
```sh
$ node run.cjs
```


## Blue Oak Model License

Version 1.0.0

### Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

### Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

### Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

### Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

### Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

### Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

### Reliability

No contributor can revoke this license.

### No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***
