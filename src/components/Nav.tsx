'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { ShoppingBasket } from 'lucide-react';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const categories = [
  {
    name: 'Shop',
    subcategories: [
      { id: 1, title: 'Meat & Fish', src: '/categories/meatandfish.png' },
      { id: 2, title: 'Vegetables', src: '/categories/fresh.png' },
      { id: 3, title: 'Beverages', src: '/categories/beverage.png' },
    ],
  },
];

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // SSR 시 렌더링 방지

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) toast.error('Please enter a keyword');
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="w-full fixed bg-white z-[999]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="BloomCart Logo"
            width={160}
            height={40}
            className="cursor-pointer"
          />
        </Link>

        {/* Search Bar */}
        <form
          className="flex items-center gap-2 flex-1 mx-8 max-w-xl"
          onSubmit={handleSearch}
        >
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for groceries, e.g., apple, tomato"
            className="flex-1"
          />
          <Button>Search</Button>
        </form>

        {/* Icons */}
        <Link href="/products/cart" className=" hover:text-green-400">
          <div className="flex items-center gap-4">
            <div className="relative rounded-full bg-green-500 p-2">
              <ShoppingBasket className="text-white" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="bg-neutral-800 text-white px-6 py-3">
        <div className="flex items-center justify-center">
          {/* 네비게이션 메뉴 */}
          <NavigationMenu className="w-[80px]">
            <NavigationMenuList className="gap-6">
              {categories.map((cat) => (
                <NavigationMenuItem key={cat.name}>
                  <NavigationMenuTrigger className="text-white hover:text-green-400 bg-transparent hover:bg-black text-base">
                    {cat.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="text-gray-800 p-3 rounded shadow-lg ">
                    <ul className="flex flex-col gap-2 w-[300px]">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.title}>
                          <Link
                            href={`/category/${sub.id}`}
                            className="flex items-center px-2 py-1 rounded hover:bg-gray-50 hover:text-green-600 hover:font-semibold"
                          >
                            <Image
                              src={sub.src}
                              alt={cat.name}
                              width={100}
                              height={100}
                            />
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              {/* Contact Link */}
              <NavigationMenuItem>
                <Link
                  href="/contact"
                  className="text-white hover:text-green-400 px-3 py-2"
                >
                  Contact Us
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
}
