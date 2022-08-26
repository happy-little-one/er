import { ulid } from 'ulid'
import { fix_to, tiny_id } from 'lib/utils'

export function create(x, y) {
  return {
    id: `node#${ulid()}`,
    name: '',
    x,
    y,
    height: 32,
    attrs: [],
  }
}

export function create_attr() {
  return {
    id: tiny_id(),
    name: '',
    type: '',
  }
}

export function get_abs_pos([relx, rely], { x, y }) {
  return [x + relx, y + rely]
}

export function get_direction([x, y], node) {
  if (x === 220) return 'right'
  if (x === 0) return 'left'
  if (y === node.height) return 'bottom'
  return 'top'
}

export function get_rel_direction(source, target) {
  const { x: x1, y: y1, height: h1 } = source
  const { x: x2, y: y2 } = target

  if (x2 >= x1 + 220) return 'right'
  if (x1 >= x2 + 220) return 'left'
  if (y2 >= y1 + h1) return 'bottom'

  return 'top'
}

export function get_edges(node_id, edges) {
  return edges.filter(
    it => it.source.id === node_id || it.target.id === node_id,
  )
}

export function get_direction_edges(node, edges, direction) {
  return get_edges(node.id, edges).filter(it => {
    const source_direction = get_direction(it.source.pos, node)
    const target_direction = get_direction(it.target.pos, node)
    return source_direction === direction || target_direction === direction
  })
}

export function fix_node(node) {
  node.x = fix_to(node.x, 20)
  node.y = fix_node(node.y, 20)
}
