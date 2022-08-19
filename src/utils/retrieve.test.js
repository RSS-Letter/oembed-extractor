// retrieve.test
/* eslint-env jest */

import nock from 'nock'

import retrieve from './retrieve.js'

const parseUrl = (url) => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname
  }
}

describe('test retrieve() method', () => {
  test('test retrieve from good source', async () => {
    const url = 'https://some.where/good/source'
    const { baseUrl, path } = parseUrl(url)
    nock(baseUrl).get(path).reply(200, { data: { name: 'oembed-parser' } }, {
      'Content-Type': 'application/json'
    })
    const result = await retrieve(url)
    expect(result.data.name).toEqual('oembed-parser')
    nock.cleanAll()
  })

  test('test retrieve with error 500', async () => {
    const url = 'https://some.where/error/500'
    const { baseUrl, path } = parseUrl(url)
    nock(baseUrl).get(path).reply(500, 'Error 500', {
      'Content-Type': 'application/json'
    })
    expect(retrieve(url)).rejects.toThrow(new Error('AxiosError: Request failed with status code 500'))
    try {
      await retrieve(url)
    } catch (err) {
      expect(err).toBeTruthy()
    }
    nock.cleanAll()
  })
})
