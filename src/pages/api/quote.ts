import { normalize, RawData } from '@/lib'
import fetch from 'isomorphic-unfetch'
import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

const {
  serverRuntimeConfig: { API_PROVIDER }
} = getConfig()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { x, y } = req.query

    const data: RawData = await (await fetch(
      `${API_PROVIDER}&from_symbol=${x}&to_symbol=${y}`
    )).json()

    res.json(normalize(data))
  } catch (err) {
    console.error(err)
    res.status(500).end({ err })
  }
}
