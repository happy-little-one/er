import { css } from '@emotion/css'
import { svg } from 'lit-html'

export default ([x1, y1, x2, y2]) => svg/*html*/ `
  
<line
  class=${css({
    strokeDasharray: 4,
    pointerEvents: 'none',
  })}
  x1=${x1}
  y1=${y1}
  x2=${x2}
  y2=${y2}
/>
`
