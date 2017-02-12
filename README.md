# askument
If argument is not present ask for it. Returns a promise.

## Install

`npm install --save askument`

## Usage

- Will ask for missing param 'id':
```
const params = {}
const promise = askument('id', 'Provide an ID:', params) // asks: Provide an ID:
```

- Will ask default question for missing param 'id':
```
const params = {}
const promise = askument('id', params) // asks: id?
```

- Will resolve to existing value without asking:
```
const params = {id: 'xer389i9ads8'}
const promise = askument('id', 'Provide an ID:', params) // doesn't ask, resolves to 'xer389i9ads8'
```

## Plays well with minimist

`askument` is a good companion for [minimist](https://github.com/substack/minimist).
See both of them in action:

```
const args = require('minimist')(process.argv.slice(2))
const askument = require('askument')

// ask for id if not set in arguments, or resolve to provided value when set
askument('id', args).then((id) => {
  console.log(`Provided ID: ${id}`)
})
```

## Resolving multiple arguments

When you want to get multiple arguments you need to ensure they run in series because you can't read from the command line more than once at a time.
Luckily for us there's [p-series](https://github.com/sindresorhus/p-series), a good friend of `askument`, which will help us get each argument in series.

Example:

```
const promises = [
  () => askument('id', args),
  () => askument('range', args),
  () => askument('title', args)
]

// Ensure we get required arguments resolving promises in series.
series(promises).then((results) => {
  const id = results[0]
  const range = results[1]
  const title = results[2]
  console.log('- Provided ID:', id)
  console.log('- Provided Range:', range)
  console.log('- Provided Title:', title)
})
```

## Why?

I wanted a dead simple way to ensure an argument is provided letting
the user input it interactively instead of displaying the typical _usage_
description.
