import store from 'er/adt/store'
import * as mod from 'er/mod'
import { fix_to, is_between } from 'lib/utils'

export function grab(x, y) {
  const { translate } = store
  translate.x += x
  translate.y += y
}

export function scroll(y) {
  store.translate.y += y
}

export function set_doc(text) {
  store.doc.text = text
}

export function add_node(left, top) {
  const { x: tx, y: ty } = store.translate
  const x = fix_to(left - 110 - tx, 20)
  const y = fix_to(top - 16 - ty, 20)
  const node = mod.node.create(x, y)

  store.map[node.id] = node
}

export function move_node(id, mx, my) {
  const node = store.map[id]
  node.x += mx
  node.y += my
}

export function move_attr_up(node_id, index, key) {
  const node = store.map[node_id]
  const { attrs } = node

  if (index > 0) {
    const attr1 = attrs[index - 1]
    const attr2 = attrs[index]
    attrs.splice(index - 1, 2, attr2, attr1)

    document.getElementById(attr2.id).focus()
  }
}

export function move_attr_down(node_id, index) {
  const node = store.map[node_id]
  const { attrs } = node

  if (index < attrs.length - 1) {
    const attr1 = attrs[index]
    const attr2 = attrs[index + 1]
    attrs.splice(index, 2, attr2, attr1)

    document.getElementById(attr1.id).focus()
  }
}

export function add_attr(id) {
  const { map } = store
  const node = map[id]

  const edges = Object.values(map).filter(it => it.id?.startsWith('edge'))
  const bottom_edges = mod.node.get_direction_edges(node, edges, 'bottom')

  const attr = mod.node.create_attr()
  node.attrs.push(attr)
  node.height += 32

  bottom_edges.forEach(it => {
    if (it.source.id === id) it.source.pos[1] = node.height
    else it.target.pos[1] = node.height
  })
}

export function del_attr(id, index) {
  const { map } = store
  const node = map[id]

  const edges = Object.values(map).filter(it => it.id?.startsWith('edge'))
  const bottom_edges = mod.node.get_direction_edges(node, edges, 'bottom')
  const right_edges = mod.node.get_direction_edges(node, edges, 'right')
  const left_edges = mod.node.get_direction_edges(node, edges, 'left')
  const horizontal_edges = right_edges.concat(left_edges)

  node.attrs.splice(index, 1)
  node.height -= 32
  const bottom = node.height - 12

  bottom_edges.forEach(it => {
    if (it.source.id === id) it.source.pos[1] = node.height
    else it.target.pos[1] = node.height
  })

  horizontal_edges.forEach(it => {
    if (it.source.id === id) {
      if (it.source.pos[1] > bottom) it.source.pos[1] = bottom
    } else {
      if (it.target.pos[1] > bottom) it.target.pos[1] = bottom
    }
  })
}

export function set_attr_name(node_id, index, name) {
  const node = store.map[node_id]
  node.attrs[index].name = name
}

export function set_attr_type(node_id, index, type) {
  const node = store.map[node_id]
  node.attrs[index].type = type
}

export function fix_node(id) {
  const node = store.map[id]
  const { x, y } = node
  node.x = fix_to(x, 20)
  node.y = fix_to(y, 20)
}

let connecting_source_id
export const connect = {
  start(source_id, x, y) {
    connecting_source_id = source_id
    store.connector = [x, y, x, y]
  },
  connecting(x, y) {
    store.connector[2] = x
    store.connector[3] = y
  },
  end(target_id) {
    if (
      target_id?.startsWith('node') &&
      connecting_source_id &&
      target_id !== connecting_source_id
    ) {
      const { map, connector } = store
      const source = map[connecting_source_id]
      const target = map[target_id]

      const edge = mod.edge.create(source, target, connector)
      map[edge.id] = edge
    }

    store.connector = [0, 0, 0, 0]
    connecting_source_id = undefined
  },
}

export function adujst_pos(id, { mx, my }, key) {
  const { map } = store
  const edge = map[id]
  const { height } = map[edge[key].id]

  const [oldx, oldy] = map[id][key].pos
  const newx = oldx + mx
  const newy = oldy + my

  if (is_between(newx, [0, 220]) && is_between(newy, [0, height])) {
    edge[key].pos = [newx, newy]
  }
}

export function adujst_offset(id, offset) {
  const edge = store.map[id]
  edge.offset += offset
}

export function resize_doc(x, y) {
  const { doc } = store
  const { width, height } = doc
  doc.width = width - x > 150 ? width - x : 150
  doc.height = height - y > 32 ? height - y : 32
}
