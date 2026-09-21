import React, { useState } from 'react';
import { Copy, Check, Terminal, Play, Server, Code2 } from 'lucide-react';

export function CodeVisualizer() {
  const [activeTab, setActiveTab] = useState('response'); // 'route' or 'response'
  const [copied, setCopied] = useState(false);

  const routeCode = `// Express.js REST API Route
import express from 'express';
const router = express.Router();

router.get('/api/v1/developer', (req, res) => {
  return res.status(200).json({
    status: 'success',
    developer: 'Mahir Arman Suvro',
    role: 'Full-Stack Web Developer',
    backend: ['Node.js', 'Express.js', 'REST APIs', 'CRUD'],
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    availability: 'Open for Freelance Projects',
    responseTime: '< 20ms'
  });
});

export default router;`;

  const responseJson = `{
  "status": "success",
  "code": 200,
  "data": {
    "name": "Mahir Arman Suvro",
    "title": "Full-Stack Web Developer",
    "primaryFocus": "Backend + REST APIs",
    "frontendCapable": true,
    "currentStatus": "Available for Freelance",
    "platforms": ["Upwork", "Fiverr", "Direct"],
    "verifiedStack": {
      "backend": ["Node.js", "Express.js", "CRUD APIs"],
      "frontend": ["Tailwind CSS", "JavaScript", "Responsive UI"],
      "tools": ["Git", "GitHub", "VS Code"]
    }
  }
}`;

  const copyToClipboard = () => {
    const textToCopy = activeTab === 'route' ? routeCode : responseJson;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg rounded-2xl overflow-hidden glass-card shadow-2xl border border-electric-400/20 text-slate-200">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-900/90 border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-electric-400" />
            api-server:3000
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-dark-800/80 p-0.5 rounded-lg border border-white/5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('response')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'response'
                ? 'bg-electric-500/20 text-electric-400 border border-electric-400/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Response (200 OK)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('route')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'route'
                ? 'bg-electric-500/20 text-electric-400 border border-electric-400/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            routes/dev.js
          </button>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={copyToClipboard}
          title="Copy snippet"
          className="p-1.5 text-slate-400 hover:text-electric-400 rounded-md hover:bg-white/5 transition"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Endpoint address header */}
      <div className="px-4 py-2 bg-dark-850/60 border-b border-white/5 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
            GET
          </span>
          <span className="text-slate-300">/api/v1/developer</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="text-emerald-400 font-medium">200 OK</span>
          <span className="text-slate-500">18ms</span>
        </div>
      </div>

      {/* Code / JSON Content */}
      <div className="p-4 font-mono text-xs overflow-x-auto max-h-64 leading-relaxed bg-dark-950/80">
        {activeTab === 'response' ? (
          <pre className="text-slate-300">
            <code>
              <span className="text-slate-500">&#123;</span>{'\n'}
              {'  '}<span className="text-electric-400">"status"</span>: <span className="text-emerald-400">"success"</span>,{'\n'}
              {'  '}<span className="text-electric-400">"code"</span>: <span className="text-amber-400">200</span>,{'\n'}
              {'  '}<span className="text-electric-400">"data"</span>: &#123;{'\n'}
              {'    '}<span className="text-indigoAcc-400">"name"</span>: <span className="text-emerald-300">"Mahir Arman Suvro"</span>,{'\n'}
              {'    '}<span className="text-indigoAcc-400">"title"</span>: <span className="text-emerald-300">"Full-Stack Web Developer"</span>,{'\n'}
              {'    '}<span className="text-indigoAcc-400">"specialization"</span>: <span className="text-emerald-300">"Backend & REST APIs"</span>,{'\n'}
              {'    '}<span className="text-indigoAcc-400">"currentStatus"</span>: <span className="text-cyan-300">"Available for Freelance"</span>,{'\n'}
              {'    '}<span className="text-indigoAcc-400">"platforms"</span>: [<span className="text-emerald-300">"Upwork"</span>, <span className="text-emerald-300">"Fiverr"</span>],{'\n'}
              {'    '}<span className="text-indigoAcc-400">"backendStack"</span>: [<span className="text-emerald-300">"Node.js"</span>, <span className="text-emerald-300">"Express.js"</span>, <span className="text-emerald-300">"CRUD APIs"</span>],{'\n'}
              {'    '}<span className="text-indigoAcc-400">"frontendStack"</span>: [<span className="text-emerald-300">"Tailwind CSS"</span>, <span className="text-emerald-300">"JavaScript"</span>]{'\n'}
              {'  '}&#125;{'\n'}
              <span className="text-slate-500">&#125;</span>
            </code>
          </pre>
        ) : (
          <pre className="text-slate-300">
            <code>
              <span className="text-slate-500">// Express.js route handler</span>{'\n'}
              <span className="text-purple-400">import</span> express <span className="text-purple-400">from</span> <span className="text-emerald-300">'express'</span>;{'\n'}
              <span className="text-purple-400">const</span> router = express.<span className="text-electric-400">Router</span>();{'\n\n'}
              router.<span className="text-electric-400">get</span>(<span className="text-emerald-300">'/api/v1/developer'</span>, (req, res) =&gt; &#123;{'\n'}
              {'  '}<span className="text-purple-400">return</span> res.<span className="text-electric-400">status</span>(<span className="text-amber-400">200</span>).<span className="text-electric-400">json</span>(&#123;{'\n'}
              {'    '}status: <span className="text-emerald-300">'success'</span>,{'\n'}
              {'    '}developer: <span className="text-emerald-300">'Mahir Arman Suvro'</span>,{'\n'}
              {'    '}specialization: <span className="text-emerald-300">'Backend + Modern Frontend'</span>{'\n'}
              {'  '}&#125;);{'\n'}
              &#125;);{'\n\n'}
              <span className="text-purple-400">export default</span> router;
            </code>
          </pre>
        )}
      </div>

      {/* Terminal footer status bar */}
      <div className="px-4 py-2 bg-dark-900 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-mono">Server listening on port 3000</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500">Node v24 • Express v4</span>
      </div>
    </div>
  );
}

export default CodeVisualizer;
