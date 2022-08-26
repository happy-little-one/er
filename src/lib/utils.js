export function drag(e, [before, handler, after]) {
  if (before(e) !== false) {
    window.addEventListener('mousemove', handler)

    window.addEventListener('mouseup', e => {
      window.removeEventListener('mousemove', handler)
      if (after) after(e)
    })
  }
}

export function is_between(n, [r1, r2]) {
  return n >= r1 && n <= r2
}

export function fix_in_range(n, [r1, r2]) {
  if (n < r1) return r1
  if (n > r2) return r2
  return n
}

export function fix_to(n, target) {
  return Math.round(n / target) * target
}

export function tiny_id() {
  return Math.random().toString(32).slice(2)
}
