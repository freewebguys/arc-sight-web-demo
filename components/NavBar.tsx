import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full border-b mb-10 bg-white">
      <div className="max-w-4xl mx-auto flex items-center justify-between py-4 px-4 text-sm text-gray-700">
        <div className="font-semibold">ArcSight</div>
        <div className="flex space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/demo" className="hover:underline">Demo</Link>
          <Link href="/arc-drift" className="hover:underline">Drift Data</Link>
        </div>
      </div>
    </nav>
  );
}

