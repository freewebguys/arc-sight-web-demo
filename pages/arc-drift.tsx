import { useState, useEffect } from 'react';

interface Insight {
  rule_id: string;
  severity: string;
  table: string;
  domains: string[];
  description: string;
  locations: Array<{ file: string; line?: number }>;
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
  summary: {
    new_count: number;
    changed_count: number;
    resolved_count: number;
  };
}

export default function ArcDrift() {
  const [scan1, setScan1] = useState<ScanData | null>(null);
  const [scan2, setScan2] = useState<ScanData | null>(null);
  const [drift, setDrift] = useState<DriftData | null>(null);
  const [scan1Raw, setScan1Raw] = useState<string>('');
  const [scan2Raw, setScan2Raw] = useState<string>('');
  const [driftRaw, setDriftRaw] = useState<string>('');

  useEffect(() => {
    // Load scan_1.json
    fetch('/demo-data/scan_1.json')
      .then((res) => res.json())
      .then((data) => {
        setScan1(data);
        setScan1Raw(JSON.stringify(data, null, 2));
      });

    // Load scan_2.json
    fetch('/demo-data/scan_2.json')
      .then((res) => res.json())
      .then((data) => {
        setScan2(data);
        setScan2Raw(JSON.stringify(data, null, 2));
      });

    // Load drift_changes.json
    fetch('/demo-data/drift_changes.json')
      .then((res) => res.json())
      .then((data) => {
        setDrift(data);
        setDriftRaw(JSON.stringify(data, null, 2));
      });
  }, []);

  const getTablesFromInsights = (insights: Insight[]): string[] => {
    return insights.map((i) => i.table).filter((t) => t);
  };

  const getDomainsFromInsights = (insights: Insight[]): string[] => {
    const domains = new Set<string>();
    insights.forEach((i) => {
      i.domains?.forEach((d) => domains.add(d));
    });
    return Array.from(domains).sort();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-8">Architecture Drift Analysis</h1>

        {/* Scan 1 – Architecture Baseline */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1️⃣ Scan 1 – Architecture Baseline</h2>
          {scan1 ? (
            <div className="space-y-4">
              {scan1.insights.map((insight, idx) => (
                <div key={idx} className="border-l-2 border-gray-300 pl-4">
                  <p className="font-medium text-gray-900 mb-1">Table: <span className="font-normal">{insight.table}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Domains involved: <span className="font-normal">{insight.domains.join(', ')}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Severity: <span className="font-normal capitalize">{insight.severity}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Change type: <span className="font-normal">persistent risk</span></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        {/* Scan 2 – Architecture After Change */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2️⃣ Scan 2 – Architecture After Change</h2>
          {scan2 ? (
            <div className="space-y-4">
              {scan2.insights.map((insight, idx) => (
                <div key={idx} className="border-l-2 border-gray-300 pl-4">
                  <p className="font-medium text-gray-900 mb-1">Table: <span className="font-normal">{insight.table}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Domains involved: <span className="font-normal">{insight.domains.join(', ')}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Severity: <span className="font-normal capitalize">{insight.severity}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Change type: <span className="font-normal">persistent risk</span></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        {/* Drift Detection Summary */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3️⃣ Drift Detection Summary</h2>
          {drift ? (
            <div className="space-y-4">
              {drift.new_insights.map((insight, idx) => (
                <div key={idx} className="border-l-2 border-red-400 pl-4">
                  <p className="font-medium text-gray-900 mb-1">Table: <span className="font-normal">{insight.table}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Domains involved: <span className="font-normal">{insight.domains.join(', ')}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Severity: <span className="font-normal capitalize">{insight.severity}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Change type: <span className="font-normal text-red-600">new risk</span></p>
                </div>
              ))}
              {drift.changed_insights.map((change, idx) => (
                <div key={idx} className="border-l-2 border-yellow-400 pl-4">
                  <p className="font-medium text-gray-900 mb-1">Table: <span className="font-normal">{change.current.table}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Domains involved: <span className="font-normal">{change.current.domains.join(', ')}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Severity: <span className="font-normal capitalize">{change.current.severity}</span></p>
                  <p className="font-medium text-gray-900 mb-1">Change type: <span className="font-normal text-yellow-600">persistent risk</span></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        {/* Collapsible JSON Blocks */}
        <div className="space-y-4 mb-12">
          <details className="border border-gray-300 rounded p-4">
            <summary className="cursor-pointer font-medium text-gray-900 mb-2">
              scan_1.json
            </summary>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {scan1Raw || 'Loading...'}
            </pre>
          </details>

          <details className="border border-gray-300 rounded p-4">
            <summary className="cursor-pointer font-medium text-gray-900 mb-2">
              scan_2.json
            </summary>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {scan2Raw || 'Loading...'}
            </pre>
          </details>

          <details className="border border-gray-300 rounded p-4">
            <summary className="cursor-pointer font-medium text-gray-900 mb-2">
              drift_changes.json
            </summary>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {driftRaw || 'Loading...'}
            </pre>
          </details>
        </div>

        {/* Footer Text */}
        <div className="border-t border-gray-300 pt-8 mb-8">
          <p className="text-gray-700 text-center">
            This drift was detected without AI, without runtime tracing, and without human review — purely through deterministic analysis of code structure and schema ownership.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="mailto:fiona@arcsight.io"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Run ArcSight on My Architecture
          </a>
        </div>
      </div>
    </div>
  );
}

