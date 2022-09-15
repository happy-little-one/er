import { css } from '@emotion/css'
import { render } from 'lit-html'

export default args => {
  const wrapper = document.createElement('div')
  wrapper.className = css({
    position: 'fixed',
    zIndex: 3,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    paddingTop: 200,
    background: 'rgb(0 0 0 / 65%)',
  })

  render(body(args), wrapper)

  document.body.appendChild(wrapper)
}

const body = ({ title, content, on_ok }) => html`
  <div
    class=${css({
      width: 500,
      margin: 'auto',
      borderRadius: 4,

      borderRadius: 4,
      boxShadow: 'var(--shadow)',
      overflow: 'hidden',
    })}
  >
    <div
      class=${css({
        padding: '0 8px',
        height: 40,
        lineHeight: '40px',
        color: '#fff',
        background: 'var(--primary)',
      })}
    >
      <span
        class=${css({
          fontSize: 16,
          fontWeight: 700,
        })}
      >
        ${title}
      </span>
    </div>
    <div
      class=${css({
        padding: 8,
        background: '#fff',
      })}
    >
      xxx
    </div>
    <div
      class=${css({
        padding: 8,
        textAlign: 'right',
        borderTop: 'solid 1px var(--border)',
        background: '#fff',
      })}
    >
      <button
        class=${css({
          color: 'var(--primary)',
          fontSize: 18,
          cursor: 'pointer',
        })}
      >
        ok
      </button>
      <button
        class=${css({
          color: 'var(--primary)',
          fontSize: 18,
          cursor: 'pointer',
        })}
      >
        ok
      </button>
    </div>
  </div>
`
