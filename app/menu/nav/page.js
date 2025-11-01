import Link from "next/link";
export default function MenuBar() {
  return (
    <nav className="bg-white w-full rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left side links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="font-bold text-green-700 text-lg">
            Coaching Connect
          </Link>
          <Link href="/" className="hover:text-green-700">
            Home
          </Link>
          <Link href="/about" className="hover:text-green-700">
            About
          </Link>
          <Link href="/contact" className="hover:text-green-700">
            Contact
          </Link>
        </div>
        {/* Right side links */}
        <div className="flex items-center space-x-4">
          <Link href="/schedule"  className="px-6 py-2 bg-green-700 text-white font-bold rounded-md hover:bg-green-800">
            Schedule A Demo
          </Link>
          <Link href="/login" className="hover:text-green-700 font-semibold">
            Login/signUp
          </Link>
        </div>
      </div>
    </nav>
  );
}
