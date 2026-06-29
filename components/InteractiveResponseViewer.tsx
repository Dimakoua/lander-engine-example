import React, { useState } from 'react';

interface InteractiveResponseViewerProps {
  title?: string;
  data: Record<string, any>;
}

function JsonTreeNode({ data, name, depth = 0 }: { data: any; name?: string; depth?: number }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (data === null) {
    return (
      <div className="font-mono text-sm leading-6" style={{ paddingLeft: `${depth * 1.25}rem` }}>
        {name && <span className="text-purple-400 font-semibold">{name}: </span>}
        <span className="text-gray-400 italic">null</span>
      </div>
    );
  }

  if (typeof data !== 'object') {
    let valueColor = 'text-emerald-400';
    if (typeof data === 'number') valueColor = 'text-sky-400';
    if (typeof data === 'boolean') valueColor = 'text-amber-400';

    return (
      <div className="font-mono text-sm leading-6" style={{ paddingLeft: `${depth * 1.25}rem` }}>
        {name && <span className="text-purple-300 font-semibold">{name}: </span>}
        <span className={`${valueColor} font-medium`}>{JSON.stringify(data)}</span>
      </div>
    );
  }

  const isArray = Array.isArray(data);
  const keys = Object.keys(data);
  const isEmpty = keys.length === 0;

  return (
    <div className="font-mono text-sm leading-6" style={{ paddingLeft: `${depth * 1.25}rem` }}>
      <div className="inline-flex items-center space-x-1 cursor-pointer select-none" onClick={() => !isEmpty && setIsExpanded(!isExpanded)}>
        {!isEmpty && (
          <span className="text-gray-400 hover:text-gray-200 text-xs w-4 text-center">
            {isExpanded ? '▼' : '▶'}
          </span>
        )}
        {name && <span className="text-purple-300 font-semibold">{name}: </span>}
        <span className="text-slate-300 font-semibold">
          {isArray ? `Array(${keys.length})` : `Object`}
        </span>
        {isEmpty && <span className="text-gray-400"> {isArray ? '[]' : '{}'}</span>}
      </div>

      {isExpanded && !isEmpty && (
        <div className="border-l border-slate-700 ml-2 pl-1">
          {keys.map((key) => (
            <JsonTreeNode key={key} name={isArray ? undefined : key} data={data[key]} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function InteractiveResponseViewer({ title = "Raw Response / State Output", data }: InteractiveResponseViewerProps) {
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree');
  const [copied, setCopied] = useState(false);

  if (!data || Object.keys(data).length === 0) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 w-full text-left bg-slate-900 text-slate-100 rounded-xl shadow-xl border border-slate-800 overflow-hidden animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h4 className="font-semibold text-sm text-slate-200 tracking-wide">{title}</h4>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-700 flex text-xs">
            <button
              onClick={() => setViewMode('tree')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${viewMode === 'tree' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Interactive Tree
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${viewMode === 'raw' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Raw JSON
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 rounded-lg transition-colors flex items-center space-x-1"
          >
            <span>{copied ? '✓ Copied' : '📋 Copy'}</span>
          </button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto max-h-96 text-slate-200">
        {viewMode === 'tree' ? (
          <div className="space-y-3">
            {Object.entries(data).map(([key, val]) => (
              <div key={key} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1 flex justify-between items-center">
                  <span>State Key: <span className="text-amber-300">{key}</span></span>
                </div>
                <JsonTreeNode data={val} />
              </div>
            ))}
          </div>
        ) : (
          <pre className="font-mono text-xs leading-relaxed text-emerald-400 bg-slate-950 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
