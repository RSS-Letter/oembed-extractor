// utils -> retrieve

import fetch from 'cross-fetch'

export default async (url) => {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0'
    }
  })
  const status = res.status
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`)
  }
  try {
    const text = await res.text()
    return JSON.parse(text)
  } catch (err) {
    throw new Error('Failed to convert data to JSON object')
  }
}
