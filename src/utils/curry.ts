
export const placeholder = Symbol("placeholder")

function isPlaceholder(target: any) {
  return target === placeholder
}

function _curry1(callback: Function) {
  return function curried_1(this: any, a: any) {
    if (arguments.length === 0 || isPlaceholder(a)) {
      return curried_1
    } else {
      return callback.apply(this, arguments)
    }
  }
}

function _curry2(callback: Function) {
  return function curried_2(this: any, a: any, b: any) {
    switch (arguments.length) {
      case 0: return curried_2
      case 1:
        return isPlaceholder(a)
          ? curried_2
          : _curry1(function (this: any, _b: any) { callback.apply(this, [a, _b]) })
      case 2:
        return isPlaceholder(a) && isPlaceholder(b)
          ? curried_2
          : isPlaceholder(a)
            ? _curry1(function (this: any, _b: any) { callback.apply(this, [a, _b]) })
            : isPlaceholder(b)
              ? _curry1(function (this: any, _a: any) { callback.apply(this, [_a, b]) })
              : callback.apply(this, arguments)
    }
  }
}

//为参数数量可变的函数指定确定的参数数量的辅助函数
function _arity(length: number, callback: Function) {
  switch (length) {
    case 0: return function (this: any) { return callback.apply(this, arguments) }
    case 1: return function (this: any, a0: any) { return callback.apply(this, arguments) }
    case 2: return function (this: any, a0: any, a1: any) { return callback.apply(this, arguments) }
    case 3: return function (this: any, a0: any, a1: any, a2: any) { return callback.apply(this, arguments) }
    case 4: return function (this: any, a0: any, a1: any, a2: any, a3: any) { return callback.apply(this, arguments) }
    case 5: return function (this: any, a0: any, a1: any, a2: any, a3: any, a4: any) { return callback.apply(this, arguments) }
    case 6: return function (this: any, a0: any, a1: any, a2: any, a3: any, a4: any, a5: any) { return callback.apply(this, arguments) }
    case 7: return function (this: any, a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any) { return callback.apply(this, arguments) }
    case 8: return function (this: any, a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any) { return callback.apply(this, arguments) }
    case 9: return function (this: any, a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any) { return callback.apply(this, arguments) }
    case 10: return function (this: any, a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any) { return callback.apply(this, arguments) }
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

function _curryN(length: number, received: any[], callback: Function): Function {
  return function (this: any) {
    let restLength = length
    let argLength = arguments.length
    let recLength = received.length
    let argIndex = 0
    let combined: any[] = []
    let comIndex = 0
    while (comIndex < recLength || argIndex < argLength) {
      let result
      if (
        comIndex < restLength
        && !isPlaceholder(received[comIndex])
        || argIndex >= argLength
      ) {
        result = received[comIndex]
      } else {
        result = arguments[argIndex]
        argIndex++
      }
      combined[comIndex] = result
      if (!isPlaceholder(result)) {
        restLength--
      }
      comIndex++
    }
    return restLength <= 0
      ? callback.apply(this, combined)
      : _arity(restLength, _curryN(restLength, combined, callback))
  }
}

export const curryN = _curry2(function curryN(length: number, callback: Function) {
  if (length === 1) {
    return _curry1(callback)
  }
  if (length === 2) {
    return _curry2(callback)
  }
  return _arity(length, _curryN(length, [], callback))
})

export const curry = _curry1(function curry (callback: Function) {
  return curryN(callback.length, callback)
})