import { normalize, RawData } from '@/lib'
import fetch from 'isomorphic-unfetch'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { x = 'USD', y = 'CAD' } = req.query

    const data: RawData = await (await fetch(
      `https://www.alphavantage.co/query?function=FX_INTRADAY&interval=5min&apikey=${process.env.ALPHA_API_KEY}&from_symbol=${x}&to_symbol=${y}`
    )).json()

    res.json(normalize(data))
  } catch (err) {
    console.error(process.env, { err })
    res.status(500).end({ err })
  }
}
