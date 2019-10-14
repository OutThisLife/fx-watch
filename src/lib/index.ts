export const normalize = (data: RawData): Item[] =>
  Object.entries(data['Time Series FX (5min)']).map(([k, v]) => ({
    date: new Date(k),
    open: parseFloat(v['1. open']),
    high: parseFloat(v['2. high']),
    low: parseFloat(v['3. low']),
    close: parseFloat(v['4. close'])
  }))

export interface RawData {
  'Meta Data': {
    [key: string]: any
  }

  'Time Series FX (5min)': RawItem
}

export interface RawItem {
  [key: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
  }
}

export interface Item {
  date: Date
  open: number
  high: number
  low: number
  close: number
}
