import { injectGlobal } from '@emotion/css'
import { html, render } from 'lit-html'

import store from 'er/adt/store'

import app from './app'

window.html = html
window.__RENDER__ = () => render(app(store), document.body)

render(app(store), document.body)

injectGlobal/* css */ `
  :root {
    --primary: #fa8c16;
    --link: #1890ff;
    --success: #52c41a;
    --error: #f5222d;

    --text: rgb(0 0 0 / 85%);
    --sub-text: rgb(0 0 0 / 65%);
    --holder: rgb(0 0 0 / 45%);
    --disabled: rgb(0 0 0 / 45%);
    --active: #fa8c16;
    
    --border: #d9d9d9;
    --bg: #f5f5f5;
    --stroke: #8c8c8c;

    --radius: 4px;

    --shadow: 
      0 3px 6px -4px rgba(0, 0, 0, 0.12), 
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }

  *, ::before, ::after {
    box-sizing: border-box;
  }

  * {
    outline: none;
  }


  body {
    margin: 0;
    font-family: "Fira Code";
    color: var(--text);
    overflow: hidden;
  }

  input, textarea {
    width: 100%;
    line-height: inherit;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border: none;
    background: transparent;
    pointer-events: inherit;
    user-select: none;
    word-break: break-all;
    &::placeholder {
      font-weight: normal;
      color: var(--holder);
    }
  }

  button {
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }
`
