'use strict'

const Joi = require('@hapi/joi')
const { BaseJsonService } = require('..')

const schema = Joi.object({
  version: Joi.string().required(),
  license: Joi.alternatives(
    Joi.string().required(),
    Joi.object({
      type: Joi.string().required(),
    }).required()
  ).required(),
  // https://github.com/badges/shields/pull/209
  platforms: Joi.object().default({ ios: '5.0', osx: '10.7' }),
}).required()

module.exports = class BaseCocoaPodsService extends BaseJsonService {
  async fetch({ spec }) {
    return this._requestJson({
      schema,
      url: `https://trunk.cocoapods.org/api/v1/pods/${spec}/specs/latest`,
    })
  }
}
