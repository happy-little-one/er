import { css } from '@emotion/css'

export default () => html`
  <div
    class=${css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 40,
      padding: '0 12px',
      borderBottom: 'solid 1px var(--border)',
    })}
  >
    <div class=${css({ fontSize: 16, fontWeight: 700, border: 0 })}>
      流程名称
    </div>

    <div>
      <button>DOWNLOD</button>
      <button>SAVE</button>
    </div>
  </div>
`
