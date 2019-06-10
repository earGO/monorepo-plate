function debounce(fn, interval = 400) {
  let timer
  return function debounced() {
    clearTimeout(timer)
    let args = arguments
    let that = this
    timer = setTimeout(function callOriginalFn() {
      fn.apply(that, args)
    }, interval)
  }
}

export default debounce
