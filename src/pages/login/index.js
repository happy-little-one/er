import { css } from '@emotion/css'

import bg from './bg.png'
import form from 'auth/cpt/login'

export default () => html`
  <div
    class=${css({
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundImage:
        'linear-gradient(165deg, var(--primary) 40%, #d46b08 74%)',
    })}
  >
    <div
      class=${css({
        width: '50vw',
        height: '100vh',
        background: `url(${bg})`,
        transform: 'skewX(-5deg)',
        transformOrigin: 'top left',
        backgroundSize: 'contain',
        boxShadow: 'var(--shadow)',
      })}
    ></div>
    <div
      class=${css({
        width: '50vw',
        paddingTop: 240,
      })}
    >
      ${form()}
    </div>
  </div>
`
