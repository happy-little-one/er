import { get_d_and_lines } from 'er/mod/edge'
import { obs } from 'lib/utils'

const store = {
  id: undefined,
  translate: { x: 0, y: 0 },
  connector: [0, 0, 0, 0],
  doc: {
    text: '',
    width: 150,
    height: 32,
  },
  map: {
    'node#1': {
      id: 'node#1',
      name: 'table',
      x: 100,
      y: 100,
      height: 128,
      attrs: [
        { id: '1-1df', name: 'name', type: 'String' },
        { id: '1-2sdf', name: 'age', type: 'Int' },
        { id: '1-3sdf', name: 'email', type: 'String' },
      ],
    },
    'node#2': {
      id: 'node#2',
      name: 'table',
      x: 400,
      y: 300,
      height: 128,
      attrs: [
        { id: '2-1', name: 'name', type: 'String' },
        { id: '2-2', name: 'age', type: 'Int' },
        { id: '2-3', name: 'email', type: 'String' },
      ],
    },
  },
}

export const directive = {
  nodes: store =>
    Object.values(store.map).filter(it => it?.id.startsWith('node')),
  edges: store =>
    Object.values(store.map)
      .filter(it => it?.id.startsWith('edge'))
      .map(edge => {
        const { map } = store
        const { id, type, source, target } = edge
        const { d, lines } = get_d_and_lines(
          edge,
          map[source.id],
          map[target.id],
        )
        const marker = type.map((it, index) => `${it}-${index}`)
        return { id, type, d, lines, marker }
      }),
}

export default obs(store)
