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

        {/* 3-Column Comparison Table */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* Column A: Scan 1 Snapshot */}
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scan 1 Snapshot</h2>
            {scan1 ? (
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Tables:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {getTablesFromInsights(scan1.insights).map((table) => (
                      <li key={table}>{table}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Domains:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {getDomainsFromInsights(scan1.insights).map((domain) => (
                      <li key={domain}>{domain}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Insights:</p>
                  <p className="text-gray-600">{scan1.insights.length}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading...</p>
            )}
          </div>

          {/* Column B: Scan 2 Snapshot */}
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scan 2 Snapshot</h2>
            {scan2 ? (
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Tables:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {getTablesFromInsights(scan2.insights).map((table) => (
                      <li key={table}>{table}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Domains:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {getDomainsFromInsights(scan2.insights).map((domain) => (
                      <li key={domain}>{domain}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Insights:</p>
                  <p className="text-gray-600">{scan2.insights.length}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading...</p>
            )}
          </div>

          {/* Column C: Drift Detected */}
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Drift Detected</h2>
            {drift ? (
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-700 mb-1">New insights:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {drift.new_insights.map((insight, idx) => (
                      <li key={idx}>
                        {insight.table} now multi-domain
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Changed insights:</p>
                  <p className="text-gray-600">{drift.summary.changed_count}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Resolved:</p>
                  <p className="text-gray-600">{drift.summary.resolved_count}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading...</p>
            )}
          </div>
        </div>

        {/* Collapsible JSON Blocks */}
        <div className="space-y-4 mb-12">
          <details className="border border-gray-300 rounded p-4">
            <summary className="cursor-pointer font-medium text-gray-900 mb-2">
              scan_1.json
            </summary>
            <pre className="text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {scan1Raw || 'Loading...'}
            </pre>
          </details>

          <details className="border border-gray-300 rounded p-4">
            <summary className="cursor-pointer font-medium text-gray-900 mb-2">
              scan_2.json
            </summary>
            <pre className="text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {scan2Raw || 'Loading...'}
            </pre>
          </details>

          <details className="border border-gray-300 rounded p-4">
            <summary className="cursor-pointer font-medium text-gray-900 mb-2">
              drift_changes.json
            </summary>
            <pre className="text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {driftRaw || 'Loading...'}
            </pre>
          </details>
        </div>

        {/* Footer Text */}
        <div className="border-t border-gray-300 pt-8 mb-8">
          <p className="text-gray-700 text-center">
            This drift was detected without AI, without code execution, and without runtime tracing — purely through static, deterministic analysis.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="mailto:fiona@arcsight.io"
            className="inline-block border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Request ArcSight Analysis
          </a>
        </div>
      </div>
    </div>
  );
}

