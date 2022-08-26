import { svg } from 'lit-html/static.js'

export default () => svg/*html*/ `
  <defs>
    <marker
      id="n-0"
      markerWidth="6"
      markerHeight="8"
      refx="0"
      refy="4"
      orient="auto"
      maskUnits="strokeWidth"
    >
      <path d="M0 0, L6 4, L0 8" stroke-width="1" />
    </marker>

    <marker
      id="n-1"
      markerWidth="6"
      markerHeight="8"
      refx="6"
      refy="4"
      orient="auto"
      maskUnits="strokeWidth"
    >
      <path d="M6 0, L0 4, L6 8" stroke-width="1" />
    </marker>

    <marker
      id="1-0"
      markerWidth="4"
      markerHeight="8"
      refx="-4"
      refy="4"
      orient="auto"
      maskUnits="strokeWidth"
    >
      <path d="M0 0, 0 8" />
    </marker>

    <marker
      id="1-1"
      markerWidth="4"
      markerHeight="8"
      refx="4"
      refy="4"
      orient="auto"
      maskUnits="strokeWidth"
    >
      <path d="M0 0, 0 8" />
    </marker>
  </defs>
`
