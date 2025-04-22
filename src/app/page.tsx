import CategoryGrid from '@/components/CategoryGrid';
import ProductList from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Banner */}
        <section className="px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white mx-auto">
          <div className="col-span-2 bg-[url('/home/banner.png')] bg-cover bg-center text-white p-8 rounded-xl relative overflow-hidden">
            <h2 className="text-4xl font-bold mb-2">
              Fresh & Healthy Organic Food
            </h2>
            <p className="mb-4">
              Sale up to{' '}
              <span className="bg-orange-400 text-white px-2 py-1 rounded ml-2">
                30% OFF
              </span>
              <br />
              Free shipping on all your order.
            </p>
            <Button className="bg-white text-green-600 font-semibold">
              Shop now
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-[url('/home/sale.png')] bg-cover bg-center border rounded-xl p-6 flex flex-col justify-between h-full shadow-sm">
              <p className="text-sm font-medium text-gray-600">SUMMER SALE</p>
              <h3 className="text-2xl font-bold text-gray-900">75% OFF</h3>
              <p className="text-sm text-gray-600 mb-2">
                Only Fruit & Vegetable
              </p>
              <Button variant="link" className="p-0 text-green-600">
                Shop Now
              </Button>
            </div>
            <div className="bg-green-900 text-white p-6 rounded-xl flex flex-col justify-between h-full">
              <p className="text-sm">BEST DEAL</p>
              <h3 className="text-xl font-bold">
                Special Products Deal of the Month
              </h3>
              <Button variant="link" className="p-0 text-white underline">
                Shop Now
              </Button>
            </div>
          </div>
        </section>

        {/* Service Info Section */}
        <section className="px-6 py-8 bg-white grid grid-cols-1 md:grid-cols-4 gap-6 text-center mx-auto">
          <div>
            <Image
              src="/icons/delivery-truck.svg"
              alt="Free Shipping"
              width={48}
              height={48}
              className="mx-auto mb-2"
            />
            <p className="font-semibold">Free Shipping</p>
            <p className="text-sm text-gray-500">
              Free shipping on all your order
            </p>
          </div>
          <div>
            <Image
              src="/icons/cs.svg"
              alt="Customer Support"
              width={48}
              height={48}
              className="mx-auto mb-2"
            />
            <p className="font-semibold">Customer Support 24/7</p>
            <p className="text-sm text-gray-500">Instant access to Support</p>
          </div>
          <div>
            <Image
              src="/icons/secure.svg"
              alt="Secure Payment"
              width={48}
              height={48}
              className="mx-auto mb-2"
            />
            <p className="font-semibold">100% Secure Payment</p>
            <p className="text-sm text-gray-500">
              We ensure your money is safe
            </p>
          </div>
          <div>
            <Image
              src="/icons/guarantee.svg"
              alt="Money-Back Guarantee"
              width={48}
              height={48}
              className="mx-auto mb-2"
            />
            <p className="font-semibold">Money-Back Guarantee</p>
            <p className="text-sm text-gray-500">
              30 Days Money-Back Guarantee
            </p>
          </div>
        </section>

        <CategoryGrid />
        <ProductList />
      </main>
    </div>
  );
}
