import { repeat } from 'lit-html/directives/repeat.js'
import { css } from '@emotion/css'
import { drag } from 'lib/utils'

import { directive } from 'er/adt/store'
import * as app from 'er/app'

import node from './node'
import Connector from './helper/connector'
import edge from './edge'
import defs from './helper/defs'

function on_mouse_down(e) {
  if (e.target.tagName !== 'svg') return
  drag(e, [e => e.preventDefault(), e => app.grab(e.movementX, e.movementY)])
}

function on_drop(e) {
  console.log(0)
  e.preventDefault()
  app.add_node(e.clientX, e.clientY)
}

export default store => {
  const { connector, translate } = store
  const nodes = directive.nodes(store)
  const edges = directive.edges(store)

  const { x, y } = translate

  return html`
    <svg
      class=${css({
        width: '100vw',
        height: '100vh',
        strokeWidth: 2,
        stroke: 'var(--stroke)',
        fill: 'none',
        background: 'var(--bg)',
        cursor: 'grabbing',
      })}
      @mousedown=${on_mouse_down}
      @dragover=${e => e.preventDefault()}
      @drop=${on_drop}
    >
      <g transform="translate(${x}, ${y})">
        ${defs()}
        ${repeat(
          nodes,
          it => it.id,
          it => node(it),
        )}
        ${repeat(
          edges,
          it => it.id,
          it => edge(it),
        )}
      </g>
      ${Connector(connector)}
    </svg>
  `
}
