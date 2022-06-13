const has_ = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
export const has = (node, key) => has_(Object(node), key);
