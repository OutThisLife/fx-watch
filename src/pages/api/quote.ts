import { normalize, RawData } from '@/lib'
import fetch from 'isomorphic-unfetch'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { x, y } = req.query

    const data: RawData = await (await fetch(
      `${process.env.API_PROVIDER}&from_symbol=${x}&to_symbol=${y}`
    )).json()

    res.json(normalize(data))
  } catch (err) {
    console.error({ err })
    res.status(500).end({ err })
  }
}
