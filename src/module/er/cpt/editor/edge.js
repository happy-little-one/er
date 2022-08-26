import { css } from '@emotion/css'
import { svg } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat.js'
import { drag } from 'lib/utils'

import { adujst_offset, adujst_pos } from 'er/app'

function adjust({ id, e, is_horizontal, index }) {
  drag(e, [
    e => e.preventDefault(),
    e => {
      const mx = is_horizontal ? 0 : e.movementX
      const my = is_horizontal ? e.movementY : 0
      const offset = is_horizontal ? e.movementY : e.movementX
      const key = index ? 'target' : 'source'

      index === 1 ? adujst_offset(id, offset) : adujst_pos(id, { mx, my }, key)
    },
  ])
}

export default edge => {
  const { id, d, marker, lines } = edge
  const [start, end] = marker

  return svg/*html*/ `
    <g>
      <path
        class=${css({ fill: 'none', pointerEvents: 'none' })}
        d=${d}
        marker-start="url(#${start})"
        marker-end="url(#${end})"
        pointer-events="none"
      />

      ${repeat(
        lines,
        it => it.index,
        ({ index, data, is_horizontal }) => {
          const [x1, y1, x2, y2] = data
          return svg/*html*/ `
          <line
            x1=${x1} y1=${y1} x2=${x2} y2=${y2} 
            stroke-width="10"
            stroke="transparent"
            cursor=${is_horizontal ? 'n-resize' : 'e-resize'}
            @mousedown=${e => adjust({ id, e, index, is_horizontal })}
          />
        `
        },
      )}
    </g>
  `
}
