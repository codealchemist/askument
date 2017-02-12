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

## Why?

I wanted a dead simple way to ensure an argument is provided letting
the user input it interactively instead of displaying the typical _usage_
description.
