import { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'BloomCart',
  description:
    'BloomCart is your one-stop online grocery destination, delivering farm-fresh produce, pantry staples, and daily essentials straight to your door. We make grocery shopping easier, healthier, and more affordable with a wide selection of organic, fresh, and trusted products.',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <script
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"
          async
        ></script>
      </head>
      <body className={`${poppins.variable}`}>
        <Nav />
        <main className="relative pt-[129px] font-[family-name:var(--font-poppins)]">
          {props.children}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </main>
        <Footer />
      </body>
    </html>
  );
}
