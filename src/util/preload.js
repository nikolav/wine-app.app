//
module.exports = (...images) =>
  Promise.all(
    images.map(
      (src) =>
        new Promise((resolve, _reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onabort = resolve;
          img.onerror = resolve;
          img.src = src;
        })
    )
  );
