import { css } from '@emotion/css'

import { scroll } from 'er/app'

import menu_bar from './menu_bar'
import tool_bar from './tool_bar'
import graph from './graph'
import doc from './doc'

if (window.location.pathname == '/') {
  window.onmousewheel = e => scroll(e.deltaY)
}

export default store => html`
  <header
    class=${css({
      position: 'fixed',
      width: '100vw',
      background: '#fff',
    })}
  >
    ${menu_bar()} ${tool_bar()}
  </header>

  ${graph(store)} ${doc(store.doc)}
`
