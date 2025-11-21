import Link from 'next/link';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Code changes daily.
                <br />
                Architecture silently decays.
              </h1>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                ArcSight detects structural drift — before systems break.
              </p>
              <Link
                href="/arc-drift"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                See Drift Demo
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

