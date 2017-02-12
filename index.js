'use strict'
const ask = require('just-ask')

/**
 * Returns requested param in a promise.
 * If param is set in passed params collection resolves to that vlaue.
 * Otherwise, asks the user for it.
 * Question can be ommited passing param name and params collection only.
 * When question is ommited it defaults to `${name}?`.
 *
 * Examples:
 *
 * - Will ask for missing param 'id':
 * const params = {}
 * get({name: 'id', question: 'Provide an ID:', params}) // asks: Provide an ID:
 *
 * - Will ask default question for missing param 'id':
 * const params = {}
 * get({name: 'id', params}) // asks: id?
 *
 * - Will resolve to existing value without asking:
 * const params = {id: 'xer389i9ads8'}
 * get({name: 'id', question: 'Provide an ID:', params}) // doesn't ask, resolves to 'xer389i9ads8'
 *
 * @param  {string} options.name Parameter name.
 * @param  {string} options.question Optional.
 * @param  {object} options.params
 * @return {promise}
 */
function get ({name, question, params}){
  // Support name and params without question.
  if (typeof question === 'object') {
    params = JSON.parse(JSON.stringify(question))
    question = `${name}?`
  }

  return new Promise((resolve, reject) => {
    if (params[name]) return resolve(params[name])
    resolve(ask(question))
  })
}

module.exports = get
