import Link from 'next/link';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-10">
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
      </main>
    </div>
  );
}

