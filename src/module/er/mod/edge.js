import { ulid } from 'ulid'
import { fix_in_range } from 'lib/utils'

import { get_abs_pos, get_rel_direction, get_direction } from './node'

export function create(source, target, connector) {
  const [x1, y1, x2, y2] = get_default_ports(source, target, connector)

  return {
    id: `edge#${ulid()}`,
    type: ['1', 'n'],
    source: {
      id: source.id,
      pos: [x1, y1],
    },
    target: {
      id: target.id,
      pos: [x2, y2],
    },
    offset: get_default_offset(source, target, [x1, y1, x2, y2]),
  }
}

export function get_d_and_lines(edge, source, target) {
  const source_pos = edge.source.pos
  const target_pos = edge.target.pos
  const { offset } = edge

  const [x1, y1] = get_abs_pos(source_pos, source)
  const [x2, y2] = get_abs_pos(target_pos, target)
  const source_direction = get_direction(source_pos, source)
  const target_direction = get_direction(target_pos, target)

  const rel_direction = `${source_direction}-${target_direction}`

  let mid = ''
  if (x1 !== x2 && y1 !== y2) {
    switch (rel_direction) {
      case 'right-left': {
        const [q1, q2] =
          y2 >= y1 ? ['4 0 4 4', '0 4 4 4'] : ['4 0 4 -4', '0 -4 4 -4']
        const op = y2 >= y1 ? 1 : -1
        mid = `h${offset - 4} q${q1} v${y2 - y1 - op * 8} q${q2}`
        break
      }
      case 'left-right': {
        const [q1, q2] =
          y2 >= y1 ? ['-4 0 -4 4', '0 4 -4 4'] : ['-4 0 -4 -4', '0 -4 -4 -4']
        const op = y2 >= y1 ? 1 : -1
        mid = `h${offset + 4} q${q1} v${y2 - y1 - op * 8} q${q2}`
        break
      }
      case 'bottom-top': {
        const [q1, q2] =
          x2 >= x1 ? ['0 4 4 4', '4 0 4 4'] : ['0 4 -4 4', '-4 0 -4 4']
        const op = x2 >= x1 ? 1 : -1
        mid = `v${offset + 4} q${q1}  h${x2 - x1 - op * 8} q${q2}`
        break
      }
      default:
        const [q1, q2] =
          x2 >= x1 ? ['0 -4 4 -4', '4 0 4 -4'] : ['0 -4 -4 -4', '-4 0 -4 -4']
        const op = x2 >= x1 ? 1 : -1
        mid = `v${offset + 4} q${q1}  h${x2 - x1 - op * 8} q${q2}`
    }
  }

  const d = `M${x1} ${y1} ${mid} L${x2} ${y2}`

  const lines = get_lines(
    [
      [x1, y1],
      [x2, y2],
    ],
    offset,
    rel_direction.includes('right'),
  )

  return { d, lines }
}

function get_lines([[x1, y1], [x2, y2]], offset, is_horizontal) {
  const mx = x1 + offset
  const my = y1 + offset

  const lines = is_horizontal
    ? [
        [x1, y1, mx, y1],
        [mx, y1, mx, y2],
        [mx, y2, x2, y2],
      ]
    : [
        [x1, y1, x1, my],
        [x1, my, x2, my],
        [x2, my, x2, y2],
      ]

  return lines.map((it, index) => {
    return {
      is_horizontal: it[1] === it[3],
      index,
      data: it,
    }
  })
}

function get_default_ports(source, target, connector) {
  let [x1, y1, x2, y2] = connector.map(it => Math.round(it))

  x1 -= source.x
  y1 -= source.y
  x2 -= target.x
  y2 -= target.y

  const rel_direction = get_rel_direction(source, target)

  switch (rel_direction) {
    case 'right':
      x1 = 220
      x2 = 0
      break
    case 'left':
      x1 = 0
      x2 = 220
      break
    case 'bottom':
      y1 = source.height
      y2 = 0
      break
    default:
      y1 = 0
      y2 = target.height
  }

  x1 = fix_in_range(x1, [0, 220])
  y1 = fix_in_range(y1, [0, source.height])
  x2 = fix_in_range(x2, [0, 220])
  y2 = fix_in_range(y2, [0, target.height])

  return [x1, y1, x2, y2]
}

function get_default_offset(source, target, [x1, y1, x2, y2]) {
  const [abs_x1, abs_y1] = get_abs_pos([x1, y1], source)
  const [abs_x2, abs_y2] = get_abs_pos([x2, y2], target)
  const rel_direction = get_rel_direction(source, target)

  return ['left', 'right'].includes(rel_direction)
    ? (abs_x2 - abs_x1) / 2
    : (abs_y2 - abs_y1) / 2
}
