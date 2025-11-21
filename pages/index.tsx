// ArcSight is Build Survival Intelligence — predicting structural deterioration before it becomes catastrophic.
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-center mb-6">
            ⚠️ How many features before your product breaks?
          </h1>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <Link href="/demo" className="block p-4 text-center bg-white border rounded-lg shadow-sm hover:bg-gray-50">
            🧪 View Sample Survival States
          </Link>

          <Link href="/survival-check" className="block p-4 text-center bg-black text-white rounded-lg shadow hover:bg-gray-800">
            🚀 Run Survival Check on My MVP
          </Link>
        </div>

        <p className="text-center text-xs text-gray-500 mt-12">
          ArcSight doesn't help you build faster — it tells you when to stop building before structural instability begins.
        </p>
      </div>
    </Layout>
  );
}

