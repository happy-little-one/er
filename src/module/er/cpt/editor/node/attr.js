import { css } from '@emotion/css'
import icon from 'lib/cpt/icon'

import * as app from 'er/app'

import style from './style'

function on_key_down(e, node_id, index, key) {
  if (e.key === 'ArrowUp' && e.altKey) {
    e.preventDefault()
    app.move_attr_up(node_id, index, key)
  }

  if (e.key === 'ArrowDown' && e.altKey) {
    e.preventDefault()
    app.move_attr_down(node_id, index, key)
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
      <input
        id="${id}_name"
        value=${name}
        placeholder="name"
        type="text"
        @focus=${e => e.preventDefault()}
        @keydown=${e => on_key_down(e, node_id, index, 'name')}
        @input=${e => app.set_attr_name(node_id, index, e.target.value.trim())}
      />
      <input
        id="${id}_type"
        value=${type}
        type="text"
        placeholder="type"
        @keydown=${e => on_key_down(e, node_id, index, 'type')}
        @input=${e => app.set_attr_type(node_id, index, e.target.value.trim())}
      />
      <button
        class=${style.btn({ color: 'var(--sub-text)' })}
        @click=${() => app.del_attr(node_id, index)}
      >
        ${icon('minus', 18)}
      </button>
    </div>
  `
}
