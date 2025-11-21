// ArcSight is Build Survival Intelligence — predicting structural deterioration before it becomes catastrophic.
import Layout from '../components/Layout';

export default function SurvivalCheck() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">ArcSight Survival Check</h1>
        <p className="text-gray-600">
          Soon, you'll be able to generate a Live Architectural Survival Report for your own product —
          once we finish validating how founders respond to Survival States.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Until then, explore the sample survival states on the Demo page.
        </p>
      </div>
    </Layout>
  );
}

