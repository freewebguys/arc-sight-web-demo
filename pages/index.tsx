import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 my-4">
          Code changes daily.
          <br />
          Architecture silently decays.
        </h1>
        <p className="text-xl text-gray-600 mt-8 mb-8">
          ArcSight detects structural drift — before systems break.
        </p>
        <Link
          href="/arc-drift"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
        >
          See Drift Demo
        </Link>
      </div>
    </div>
  );
}

