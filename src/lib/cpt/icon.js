import { map } from 'lit/directives/map.js'
import { svg } from 'lit-html'
import { css } from '@emotion/css'
import icons from '../icons'

export default (type, size = 16) => {
  const ds = [].concat(icons[type])

  return html`
    <svg
      class=${css({
        verticalAlign: '-0.25em',
        fill: 'currentcolor',
        pointerEvents: 'none',
      })}
      width=${size}
      height=${size}
      viewBox="0 0 1024 1024"
    >
      ${map(ds, d => svg`<path d=${d} />`)}
    </svg>
  `
}
