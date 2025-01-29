import { 
  Bitcoin, 
  TrendingUp, 
  Shield, 
  Globe2, 
  ArrowRightLeft,
  Wallet,
  ChevronRight,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                The World's Most Popular Way to Buy, Sell, and Trade Crypto
              </h1>
              <p className="text-gray-400 text-xl mb-8">
                Trusted by millions since 2011 with over $1 Trillion in crypto transactions.
              </p>
              <Link to="/register" className="bg-[#3D89F5] px-6 py-3 rounded-lg text-lg hover:bg-blue-600 flex items-center inline-flex">
                Get Started Free <ChevronRight className="ml-2" />
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=600"
                alt="Cryptocurrency visualization"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-[#151820] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#1E2128] p-8 rounded-xl">
                <Wallet className="w-12 h-12 text-[#3D89F5] mb-4" />
                <h3 className="text-xl font-bold mb-3">Secure Wallet</h3>
                <p className="text-gray-400">
                  Store your crypto safely with industry-leading security features.
                </p>
              </div>
              <div className="bg-[#1E2128] p-8 rounded-xl">
                <ArrowRightLeft className="w-12 h-12 text-[#3D89F5] mb-4" />
                <h3 className="text-xl font-bold mb-3">Lightning Fast Trading</h3>
                <p className="text-gray-400">
                  Execute trades instantly with our advanced trading engine.
                </p>
              </div>
              <div className="bg-[#1E2128] p-8 rounded-xl">
                <Globe2 className="w-12 h-12 text-[#3D89F5] mb-4" />
                <h3 className="text-xl font-bold mb-3">Global Access</h3>
                <p className="text-gray-400">
                  Trade crypto anywhere in the world, 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold text-[#3D89F5] mb-2">$1T+</div>
              <div className="text-gray-400">Trading Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#3D89F5] mb-2">100M+</div>
              <div className="text-gray-400">Verified Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#3D89F5] mb-2">100+</div>
              <div className="text-gray-400">Countries Supported</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#151820] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Bitcoin className="w-8 h-8 text-[#3D89F5]" />
                <span className="text-xl font-bold">Blockchain</span>
              </div>
              <p className="text-gray-400">
                © 2024 Blockchain.com
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Wallet</li>
                <li>Exchange</li>
                <li>Explorer</li>
                <li>Institutional</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Learn</li>
                <li>Prices</li>
                <li>API</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}