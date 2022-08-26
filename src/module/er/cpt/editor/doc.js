import { css } from '@emotion/css'
import icon from 'lib/cpt/icon'
import { drag } from 'lib/utils'

import { resize_doc } from 'er/app'

function start_resize(e) {
  drag(e, [e => e.preventDefault(), e => resize_doc(e.movementX, e.movementY)])
}

export default ({ text, width, height }) => {
  return html`
    <div
      class=${css({
        position: 'fixed',
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow)',
      })}
      style="width:${width}px; height: ${height}px"
    >
      <div
        class=${css({
          height: 32,
          padding: '0 12px',
          lineHeight: '32px',
          color: '#fff',
          background: 'var(--primary)',
          userSelect: 'none',
          borderTopLeftRadius: 'var(--radius)',
        })}
      >
        document
      </div>

      <textarea
        class=${css({
          flexGrow: 1,
          diplay: 'block',
          padding: '8px 12px',
          fontSize: 16,
          lineHeight: 1.5,
          resize: 'none',
          borderColor: 'var(--border)',
          background: 'rgb(255 255 255 / 65%)',
        })}
        .value=${text}
        placeholder="any thing you want to discrible about this model, support markdown"
      ></textarea>

      <button
        class=${css({
          position: 'absolute',
          top: 0,
          left: 0,
          color: '#fff',
          cursor: 'se-resize',
          transform: 'rotate(180deg)',
        })}
        @mousedown=${start_resize}
      >
        ${icon('resizer', 22)}
      </button>
    </div>
  `
}
