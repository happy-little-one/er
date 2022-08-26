import { css } from '@emotion/css'
import { svg } from 'lit-html'
import icon from 'lib/cpt/icon'
import { repeat } from 'lit-html/directives/repeat.js'
import { drag } from 'lib/utils'

import * as app from 'er/app'
import Attr from './attr'

import style from './style'

function start_connect(e, id) {
  drag(e, [
    e => {
      e.preventDefault()
      app.connect.start(id, e.clientX, e.clientY)
    },
    e => {
      app.connect.connecting(e.clientX, e.clientY)
    },
    e => app.connect.end(e.target.dataset.id),
  ])
}

function start_move(e, id) {
  drag(e, [
    () => true,
    e => {
      e.preventDefault()
      app.move_node(id, e.movementX, e.movementY)
    },
    () => app.fix_node(id),
  ])
}

export default node => {
  const { id, x, y, height, attrs } = node

  return svg/*html*/ `
    <g transform="translate(${x}, ${y})">
      <foreignObject
        class=${css({
          position: 'relative',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          background: '#fff',
          overflow: 'hidden',
        })}
        width=220
        height=${height}
      >
        <div
          class=${css({
            position: 'relative',
            height: 32,
            lineHeight: '32px',
            color: '#fff',
            background: 'var(--primary)',
            '&:hover button': {
              opacity: 1,
            },
          })}
        >
          <input
            class=${css({
              height: 32,
              fontSize: 16,
              textAlign: 'center',
              background: 'var(--primary)',
              '&::placeholder': {
                color: 'rgb(255 255 255 / 65%)',
              },
            })}
            value=${node.name}
            type="text"
            autocomplete="nope"
            placeholder="name"
            @mousedown=${e => start_move(e, id)}
          />

          <button class=${style.btn()} @click=${() => app.add_attr(id)}>
            ${icon('plus', 20)}
          </button>
        </div>

        <div class=${css({ fontSize: 13, background: '#e6f7ff' })}>
          ${repeat(
            attrs,
            it => it.id,
            (it, index) => Attr(id, it, index),
          )}
        </div>
      </foreignObject>

      <rect
        data-id=${id}
        class=${css({
          stroke: 'transparent',
          strokeWidth: 12,
          cursor: 'crosshair',
        })}
        rx="4"
        ry="4"
        width=220
        height=${height}
        @mousedown=${e => start_connect(e, id)}
      />
    </g>
  
  `
}
