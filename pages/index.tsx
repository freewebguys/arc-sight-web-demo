import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-4">
          Code changes daily.
          <br />
          Architecture silently decays.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          ArcSight tracks architecture drift — statically, deterministically, over time.
        </p>
        <Link
          href="/arc-drift"
          className="inline-block border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          See Drift Demo
        </Link>
      </div>
    </div>
  );
}

