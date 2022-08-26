import icon from 'lib/cpt/icon'
import { css } from '@emotion/css'

export default () => {
  return html`
    <div
      class=${css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2px 12px',
        borderBottom: 'solid 1px var(--border)',
      })}
    >
      <div>
        <button class=${css({ cursor: 'move' })} draggable="true">
          ${icon('table', 18)}
        </button>
        <select
          class=${css({
            height: 24,
            minWidth: 24,
            padding: 0,
            fontSize: 13,
            borderRadius: 2,
            background: 'transparent',
            border: 'solid 1px transparent',
            '&:hover': {
              borderColor: 'var(--border)',
              background: 'var(--bg)',
            },
            '&:disabled': {
              opacity: 0.7,
            },
          })}
        >
          <option value="1,n">1 -- N</option>
          <option value="1,1">1 -- 1</option>
          <option value="n,1">N -- 1</option>
          <option value="n,n">N -- N</option>
        </select>
      </div>

      <button>${icon('help')}</button>
    </div>
  `
}
