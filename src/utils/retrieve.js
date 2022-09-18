// utils -> retrieve

import fetch from 'cross-fetch'

export default async (url) => {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0'
    }
  })
  const data = await res.json()
  return data
}
