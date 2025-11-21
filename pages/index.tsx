import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Code changes daily.
            <br />
            Architecture silently decays.
          </h1>
          <p className="text-gray-700 leading-relaxed mb-8">
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
    </Layout>
  );
}

