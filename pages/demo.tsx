import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Insight {
  description: string;
  domains: string[];
  locations: Array<{ file: string; line?: number }>;
  recommendation: string;
  rule_id: string;
  severity: string;
  table: string;
}

interface ScanData {
  insights: Insight[];
  metadata?: {
    total_tables?: number;
    total_domains?: number;
    total_files?: number;
  };
}

interface DriftData {
  new_insights: Insight[];
  changed_insights: Array<{
    key: string;
    previous: Insight;
    current: Insight;
  }>;
  resolved_insights: Insight[];
  summary: {
    new_count: number;
    changed_count: number;
    resolved_count: number;
  };
}

export default function Demo() {
  const [scan1, setScan1] = useState<ScanData | null>(null);
  const [scan2, setScan2] = useState<ScanData | null>(null);
  const [drift, setDrift] = useState<DriftData | null>(null);

  useEffect(() => {
    fetch('/demo-data/scan_1.json')
      .then((res) => res.json())
      .then((data) => setScan1(data));

    fetch('/demo-data/scan_2.json')
      .then((res) => res.json())
      .then((data) => setScan2(data));

    fetch('/demo-data/drift_changes.json')
      .then((res) => res.json())
      .then((data) => setDrift(data));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {/* Section 1: Scan 1 — Initial Architecture */}
        <section>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Architecture Drift Demo</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Scan 1 — Initial System Snapshot</h2>
          <p className="text-gray-700 mb-6">
            At this point in time, only Auth and Billing domains write to the `users` table. Ownership is shared, but still predictable. Risk is emerging — but contained.
          </p>
          {scan1 ? (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="font-medium text-gray-900 mb-2">Detected tables:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                {scan1.insights.map((insight, idx) => (
                  <li key={idx}>
                    <span className="font-medium">{insight.table}</span> → Domains: {insight.domains.join(', ')}
                  </li>
                ))}
              </ul>
              {scan1.metadata && (
                <p className="text-sm text-gray-600">
                  Total insights: {scan1.insights.length} | Total tables: {scan1.metadata.total_tables} | Total domains: {scan1.metadata.total_domains}
                </p>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
        </section>

        {/* Section 2: Scan 2 — Architecture Evolves */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Scan 2 — System After One Sprint</h2>
          <p className="text-gray-700 mb-6">
            A new domain (API) begins writing to `users` and introduces `sessions`. Architectural boundaries are now weakening. Ownership fragmentation begins.
          </p>
          {scan2 ? (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="font-medium text-gray-900 mb-2">Detected tables:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                {scan2.insights.map((insight, idx) => (
                  <li key={idx}>
                    <span className="font-medium">{insight.table}</span> → Domains: {insight.domains.join(', ')}
                  </li>
                ))}
              </ul>
              {scan2.metadata && (
                <p className="text-sm text-gray-600">
                  Total insights: {scan2.insights.length} | Total tables: {scan2.metadata.total_tables} | Total domains: {scan2.metadata.total_domains}
                </p>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
        </section>

        {/* Section 3: ArcSight Detects Drift */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">ArcSight Detects Structural Drift</h2>
          {drift ? (
            <div className="bg-gray-50 p-4 rounded-lg border mb-6">
              <p className="font-medium text-gray-900 mb-2">New insights:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                {drift.new_insights.map((insight, idx) => (
                  <li key={idx}>
                    {insight.table} now multi-domain ({insight.domains.join(', ')})
                  </li>
                ))}
              </ul>
              <p className="font-medium text-gray-900 mb-2">Changed insights:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                {drift.changed_insights.map((change, idx) => (
                  <li key={idx}>
                    {change.current.table} — ownership expanded ({change.current.domains.join(', ')})
                  </li>
                ))}
              </ul>
              <p className="font-medium text-gray-900 mb-2">Resolved insights:</p>
              <p className="text-gray-700 mb-4">
                {drift.resolved_insights.length === 0 ? 'None' : drift.resolved_insights.length}
              </p>
              <p className="text-sm text-gray-600">
                Summary: {drift.summary.new_count} new, {drift.summary.changed_count} changed, {drift.summary.resolved_count} resolved
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg border mb-6">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
          <p className="text-gray-700">
            ArcSight compares snapshots over time and identifies expanding ownership, hidden dependencies, and structural creep — without running code, tracing runtime, or using AI.
          </p>
        </section>

        {/* Section 4: Why It Matters */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why It Matters</h2>
          <p className="text-gray-700 mb-6">
            Architecture decay is not a single bug — it's a gradual erosion of system structure. Drift occurs when more domains begin writing to shared data layers, increasing blast radius, compliance exposure, operational complexity, and slowing delivery. ArcSight reveals this before it becomes unmanageable.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Detects drift before runtime issues occur</li>
            <li>Tracks ownership collapse across domains</li>
            <li>Creates historical architecture memory</li>
            <li>Enables Conway Law compliance & governance</li>
          </ul>
        </section>

        {/* Section 5: Call to Action */}
        <section className="text-center">
          <a
            href="mailto:fiona@arcsight.io"
            className="inline-block py-2 px-6 border rounded-lg hover:bg-gray-100 text-center"
          >
            Run ArcSight on My System
          </a>
        </section>

        {/* Footer Navigation */}
        <div className="border-t border-gray-300 pt-8 flex justify-between">
          <Link href="/" className="text-sm text-gray-500 hover:underline">
            ← Back to Overview
          </Link>
          <Link href="/arc-drift" className="text-sm text-gray-500 hover:underline">
            View Raw Results →
          </Link>
        </div>
      </div>
    </div>
  );
}

