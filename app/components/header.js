import Link from 'next/link';
import SearchBar from './searchbar';

export default function Header() {
  return (
    <header className="bg-arsenalRed text-white px-2 sm:px-4 py-2 sm:py-3 md:py-6 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-2 sm:gap-0">
      {/* Logo - 10x bigger with fixed container */}
      <div className="flex items-center h-6 sm:h-7 overflow-visible -ml-4 sm:ml-0">
        <Link href="/">
          <img
            src="/Dlogo3.png"
            alt="Dominate Football"
            className="cursor-pointer hover:opacity-90 transition-opacity h-[110px] sm:h-[190px]"
            style={{
              width: 'auto'
            }}
          />
        </Link>
      </div>



      {/* Navigation - stack vertically on mobile, horizontal on larger screens */}
      <div className="flex-1 flex justify-center sm:justify-end">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* Navigation Links - Equal spacing */}
          <nav className="flex gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm md:text-lg font-semibold uppercase items-center">
            <a href="/home" className="hover:text-yellow-300 whitespace-nowrap">HOME</a>
            <a href="/news" className="hover:text-yellow-300 whitespace-nowrap">NEWS</a>
            <a href="/transfers" className="hover:text-yellow-300 whitespace-nowrap">TRANSFERS</a>
            <a href="/about" className="hover:text-yellow-300 whitespace-nowrap">ABOUT</a>
          </nav>

          {/* Search Bar - Pushed far right with consistent spacing */}
          <div>
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
