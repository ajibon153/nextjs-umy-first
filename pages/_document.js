// _document.js allow to costumize all entire HTML document
// semua komponen merender yang dimiliki dokumen default jika Anda tidak menimpanya.

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html
        lang='en'
        // lang='en'
      >
        <Head />
        <body>
          <div id='overlays'>{/* seperti react-portals */}</div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
