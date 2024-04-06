// import { Html, Head, Main, NextScript } from 'next/document';

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }
const inter = Inter({ subsets: ['latin'] });

import { ChildrenProps } from '@/types';

import '../styles/globals.css';
import { Inter } from 'next/font/google';

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html
      lang="en"
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <body>{children}</body>
    </html>
  );
}
