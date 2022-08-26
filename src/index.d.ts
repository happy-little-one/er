import { html } from 'lit-html'

declare global {
  interface Window {
    html: typeof html
    r(): void
  }
}
