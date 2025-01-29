import { Bitcoin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Bitcoin className="w-8 h-8 text-[#3D89F5]" />
            <span className="text-xl font-bold">Blockchain</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <button className="text-gray-300 hover:text-white">Wallet</button>
            <button className="text-gray-300 hover:text-white">Exchange</button>
            <button className="text-gray-300 hover:text-white">Institutional</button>
            <button className="text-gray-300 hover:text-white">Learn</button>
          </div>
          <div className="flex space-x-4">
            <Link to="/signin" className="px-4 py-2 rounded-lg text-white hover:bg-gray-800">Sign In</Link>
            <Link to="/register" className="bg-[#3D89F5] px-4 py-2 rounded-lg hover:bg-blue-600">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}