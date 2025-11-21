import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-gray-700">
        <div className="font-semibold text-gray-900">ArcSight</div>
        <div className="flex space-x-6">
          <Link href="/" className="hover:underline text-gray-600">Home</Link>
          <Link href="/demo" className="hover:underline text-gray-600">Demo</Link>
          <Link href="/arc-drift" className="hover:underline text-gray-600">Drift Data</Link>
        </div>
      </div>
    </nav>
  );
}

