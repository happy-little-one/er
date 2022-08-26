import { css } from '@emotion/css'

export default {
  btn: extra =>
    css({
      position: 'absolute',
      right: 6,
      top: 6,
      opacity: 0,
      transition: 'opacity 0.35s',
      ...extra,
    }),
}
