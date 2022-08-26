import { css } from '@emotion/css'
import icon from 'lib/cpt/icon'

import * as app from 'er/app'

import style from './style'

function on_key_down(e, node_id, index) {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    app.move_attr_up(node_id, index)
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    app.move_attr_down(node_id, index)
  }
}

export default (node_id, { id, name, type }, index) => {
  return html`
    <div
      class=${css({
        position: 'relative',
        display: 'flex',
        padding: '0 6px',
        height: 32,
        lineHeight: '32px',
        borderBottom: 'solid 1px var(--border)',
        '&:hover button': {
          opacity: 1,
        },
      })}
    >
      <input value=${name} placeholder="name" type="text" />
      <input
        id=${id}
        value=${type}
        type="text"
        placeholder="type"
        @keydown=${e => on_key_down(e, node_id, index)}
      />

      <button
        class=${style.btn({ color: 'var(--sub-text)' })}
        @click=${() => app.del_attr(node_id, index)}
      >
        ${icon('delete', 18)}
      </button>
    </div>
  `
}
