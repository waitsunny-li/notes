/*
 * @Author: liweilong
 * @Date: 2020-12-24 14:08:50
 */

// fn.call(this, ...args, callback)
const thunk = function (fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback)
    }
  }
}
function* gen() {
  let r = yield 123
  console.log('r:', r);
  let d = yield 234
  console.log('d:', d);
  let m = yield 345
  console.log('m:', m);
  // return [r, d, m]
}

const g = gen()

                                                      

console.log(g.next());

function run(fn) {
  const f = fn()
  function next(data) {
    let r = f.next(data)
    if (r.done) return r.value
    r.value.then(data => {
      next(data)
    })

  }

  next()
}




