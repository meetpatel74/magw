// src/components/layout/Navbar.jsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-blue-700">MAGW</span>
            </Link>
            <nav className="ml-6 flex space-x-8">
              <Link href="/exhibitions" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Exhibitions
              </Link>
              <Link href="/collection" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Collection
              </Link>
              <Link href="/visit" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Visit
              </Link>
              <Link href="/programs" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Programs
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Log In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;