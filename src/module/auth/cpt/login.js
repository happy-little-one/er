import { css } from '@emotion/css'
import modal from 'lib/cpt/modal'

const style = {
  input: css({
    padding: '6px 0',
    borderBottom: 'solid 1px var(--border)',
  }),
}

function on_signin_or_signup() {
  modal({ title: 'veryfiy code' })
}

export default () =>
  html`
    <div
      class=${css({
        width: 320,
        margin: 'auto',
        background: 'var(--bg)',
        boxShadow: 'var(--shadow)',
        borderRadius: 4,
      })}
    >
      <div
        class=${css({
          padding: 12,
          boxShadow: 'var(--inline-shadow)',
        })}
      >
        <h1
          class=${css({
            margin: 0,
            fontSize: 24,
            color: 'var(--primary)',
          })}
        >
          Pureer
        </h1>
      </div>
      <div
        class=${css({
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          padding: 12,
        })}
      >
        <input class=${style.input} type="email" placeholder="email" />
        <input class=${style.input} type="password" placeholder="6-12 words" />
        <button
          class=${css({
            height: 36,
            fontSize: 18,
            color: '#fff',
            borderRadius: 4,
            background: 'var(--primary)',
            boxShadow: 'var(--inline-shadow)',
            transition: 'opacity .25s',
            '&:hover': {
              opacity: 0.8,
            },
          })}
          @click=${on_signin_or_signup}
        >
          signin or signup
        </button>
      </div>
    </div>
  `
