import Document, { Html, Head, Main, NextScript } from "next/document";

class TheDocument extends Document {
  render() {
    return (
      <Html>
        <Head>{/* // global, meta... */}</Head>
        <body className="!overflow-y-hidden text-base ***text-lg leading-relaxed tracking-wide bg-slate-100 text-slate-800">
          <div id="overlays" />
          <Main />
          <div id="overlays-end" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default TheDocument;
