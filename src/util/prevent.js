export function prevent(callback = noop, ...rest) {
  return function (evt) {
    evt.preventDefault();
    return callback.apply(this, rest);
  };
}

function noop() {}
