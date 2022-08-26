import { resolve } from 'path'

export default {
  resolve: {
    alias: {
      lib: resolve('src/lib'),
      pages: resolve('src/pages'),
      er: resolve('src/module/er'),
    },
  },
}
