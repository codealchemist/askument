'use strict'
const ask = require('just-ask')

/**
 * Returns requested param in a promise.
 * If param is set in passed params collection resolves to that value.
 * Otherwise, asks the user for it.
 * Question can be ommited passing param name and params collection only.
 * When question is ommited it defaults to `${name}?`.
 *
 * Examples:
 *
 * - Will ask for missing param 'id':
 * const params = {}
 * get('id', 'Provide an ID:', params) // asks: Provide an ID:
 *
 * - Will ask default question for missing param 'id':
 * const params = {}
 * get('id', params) // asks: id?
 *
 * - Will resolve to existing value without asking:
 * const params = {id: 'xer389i9ads8'}
 * get('id', 'Provide an ID:', params) // doesn't ask, resolves to 'xer389i9ads8'
 *
 * @param  {string} name Parameter name.
 * @param  {string} question Optional.
 * @param  {object} args Params collection.
 * @return {promise}
 */
function get (name, question, params){
  // Support passing name and params without question.
  // Set default question.
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
