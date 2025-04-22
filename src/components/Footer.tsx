// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-gray-300 pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Info */}
        <div className="space-y-4 col-span-2">
          <Link href="/">
            <Image
              src="/logo_white.svg"
              alt="BloomCart Logo"
              width={160}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          <p className="text-sm font-light text-gray-400">
            Fresh groceries delivered to your door. Discover organic, everyday
            essentials at BloomCart.
          </p>
          <p className="text-sm">
            <span className="font-medium text-white">(219) 555–0114</span> or{' '}
            <span className="text-green-400 font-medium">Proxy@gmail.com</span>
          </p>
        </div>

        {/* Helps */}
        <div>
          <h4 className="text-white font-semibold mb-3">Helps</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Contact</Link>
            </li>
            <li>
              <Link href="#">FAQs</Link>
            </li>
            <li>
              <Link href="#">Terms & Condition</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Fruit & Vegetables</Link>
            </li>
            <li>
              <Link href="#">Meat & Fish</Link>
            </li>
            <li>
              <Link href="#">Bread & Bakery</Link>
            </li>
            <li>
              <Link href="#">Beauty & Health</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>Jiyoung Yoon(25162862) © 2025. All Rights Reserved</p>
      </div>
    </footer>
  );
}
