import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link href='https://fonts.googleapis.com/css2?family=Arima:wght@100;400;700&family=Playball&family=Rubik+Mono+One&family=Russo+One&display=swap' rel='stylesheet' />

          <link rel='shortcut icon' href='/favicon.ico' type='image/ico' />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
