// ArcSight is Build Survival Intelligence — predicting structural deterioration before it becomes catastrophic.
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from "react-markdown";
import Layout from '../../components/Layout';

const getArcPersona = (arcScore: number) => {
  if (arcScore >= 75) return { label: "🟢 Solid Foundation", desc: "Architecture is stable, safe to extend, and structurally sound." };
  if (arcScore >= 45) return { label: "🟠 Faith but Fragile", desc: "Works now, but adding features may introduce instability if unaddressed." };
  return { label: "🔴 House of Cards", desc: "System is at high risk of collapse. Further building may cause major failures." };
};

export default function ReportPage() {
  const router = useRouter();
  const { arcId } = router.query;
  const [markdown, setMarkdown] = useState<string>('');
  const [reportJson, setReportJson] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!arcId || typeof arcId !== 'string') return;

    // Load both markdown and JSON report
    Promise.all([
      fetch(`/api/reports/${arcId}/summary`).then(res => {
        if (!res.ok) throw new Error('Summary not found');
        return res.text();
      }),
      fetch(`/api/reports/${arcId}/json`).then(res => {
        if (!res.ok) throw new Error('Report JSON not found');
        return res.json();
      })
    ])
      .then(([text, json]) => {
        setMarkdown(text);
        setReportJson(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [arcId]);

  if (!arcId || typeof arcId !== 'string') {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading report...</p>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading report...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  const persona = reportJson?.scoring?.arcScore ? getArcPersona(reportJson.scoring.arcScore) : null;
  const featureCapacityLeft = reportJson?.scoring?.featureCapacityLeft || 0;

  const personaLabel =
    {
      "ARC-LOW": "🟢 Solid Foundation",
      "ARC-MEDIUM": "🟠 Faith but Fragile",
      "ARC-HIGH": "🔴 House of Cards",
    }[arcId as string] || null;

  const survivalText =
    reportJson?.scoring?.featureCapacityLeft === 0
      ? "No safe feature capacity remaining — further building is likely to cause instability."
      : `${reportJson?.scoring?.featureCapacityLeft || 0} features before high-risk instability`;

  const isDemo = ["ARC-LOW", "ARC-MEDIUM", "ARC-HIGH"].includes(arcId as string);

  const shareUrl = typeof window !== 'undefined' 
    ? `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/report/${arcId}`
    : `/report/${arcId}`;

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold mb-6 border-b pb-2">
          ArcSight Survival Report — {arcId}
        </h1>

        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-gray-800">
            ArcSight forecasts when structural collapse is likely,
            how much Survival Capacity your architecture has left,
            and when you should stop building before further damage occurs.
          </p>
        </div>

        <p className="text-gray-600 mb-4">
          This report shows how many features your system can safely survive before becoming structurally unstable.
        </p>

        {personaLabel && (
          <div className="mb-4 p-3 bg-gray-800 text-white rounded-lg inline-block">
            {personaLabel}
          </div>
        )}

        {isDemo && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            This is a sample ArcSight survival state. Want to see your real product's score?
            <a href="/survival-check" className="underline ml-1">Run Survival Check here.</a>
          </div>
        )}

        {persona && (
          <div className="mb-6 p-4 bg-gray-50 border-l-4 border-gray-400 rounded">
            <p className="text-lg font-semibold">{persona.label}</p>
            <p className="text-sm text-gray-700">{persona.desc}</p>
          </div>
        )}

        {reportJson?.scoring && (
          <div className="mb-4 p-3 bg-gray-100 border rounded">
            <p className="text-sm font-medium mb-1">⏳ Survival Capacity</p>
            <small className="text-xs text-gray-500">
              (approximate number of safe feature additions before instability)
            </small>
            <p className="mt-2"><strong>{survivalText}</strong></p>
            {reportJson.scoring.featureCapacityLeft <= 1 && (
              <p className="text-sm text-red-600 mt-2">
                ⚠ Threshold reached — next major feature may trigger structural instability.
              </p>
            )}
          </div>
        )}

        <div className="prose max-w-3xl p-6 bg-white rounded-lg shadow-sm border">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>

        <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
          <p className="text-sm text-gray-700 mb-1">📤 Share this survival report</p>
          <p className="text-xs text-gray-500 mb-2">Anyone with this link can view — no login needed.</p>
          <input
            readOnly
            value={shareUrl}
            className="w-full mt-2 p-2 border rounded text-sm bg-white"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
        </div>

        <div className="mt-8 p-6 bg-gray-100 border rounded-lg">
          <h3 className="text-lg font-semibold">🔒 ArcGraph (Pro Feature)</h3>
          <p className="text-sm text-gray-700">
            Visual drift forecasting, ownership mapping, and build survival timelines.
            <br/> 👉 Coming soon — request early access.
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-12">
          ArcSight doesn't help you build faster — it tells you when to stop building before structural instability begins.
        </p>
      </div>
    </Layout>
  );
}

