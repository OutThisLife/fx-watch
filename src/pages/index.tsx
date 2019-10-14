import { Item } from '@/lib'
import { extentLinear, extentTime } from '@d3fc/d3fc-extent'
import { seriesCanvasOhlc, seriesSvgOhlc } from '@d3fc/d3fc-series'
import { scaleLinear, select } from 'd3'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  .ohlc {
    stroke: #0f0;
  }

  .bottom-axis [stroke] {
    stroke: transparent;
  }

  .right-axis {
    grid-column: -1;

    [stroke] {
      stroke: currentColor;
    }

    text {
      fill: currentColor;
    }
  }

  .plot-area {
    grid-column: 1 / span 4;
  }
`

export default () => {
  const [data, setData] = useState<Item[]>([])

  const getData = useCallback(async () => {
    try {
      const [x, y] = (location.search.split('?s=').pop() || 'USD/CAD').split(
        '/'
      )

      const res: Item[] = await (await fetch(`/api/quote?x=${x}&y=${y}`)).json()

      setData(res.map(r => ({ ...r, date: new Date(r.date) })))
    } catch (err) {
      console.error(err)
    }
  }, [])

  const draw = useCallback(async () => {
    const { chartCartesian } = await import('@d3fc/d3fc-chart')

    const xExtent = extentTime().accessors([(d: Item) => d.date])
    const yExtent = extentLinear().accessors([
      (d: Item) => d.high,
      (d: Item) => d.low
    ])

    const chart = chartCartesian(scaleLinear(), scaleLinear())
      .xDomain(xExtent(data))
      .xTicks(0)
      .yOrient('right')
      .yDomain(yExtent(data))
      .canvasPlotArea(seriesCanvasOhlc())
      .svgPlotArea(seriesSvgOhlc())

    await import('@d3fc/d3fc-element')

    select('#chart')
      .datum(data)
      .call(chart)
  }, [data])

  useEffect(() => {
    if (!('browser' in process)) {
      return
    }

    if (data.length) {
      window.requestAnimationFrame(draw)
    } else {
      getData()
    }
  }, [data])

  return (
    <>
      <Wrapper id="chart" style={{ width: '100vw', height: '100vh' }} />

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
        }

        html {
          user-select: none;
          color: #fafafa;
          background: #0000ee;
        }
      `}</style>
    </>
  )
}
