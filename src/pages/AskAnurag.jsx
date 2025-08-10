import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal, Upload, Loader2, Settings2, X, ExternalLink } from "lucide-react";

/**
 * Ask Anurag – AI Q&A Webpage (single-file React component)
 * ---------------------------------------------------------
 * What this gives you:
 *  - A clean UI where visitors can ask free‑text questions about your profile/projects.
 *  - A small in‑browser knowledge base editor (paste your project blurbs, tools, roles, etc.).
 *  - Retrieval‑augmented generation (RAG) flow:
 *      1) rank your knowledge chunks by relevance to the user question (client TF‑IDF fallback),
 *      2) optionally call OpenAI to generate a concise, source‑aware answer.
 *  - No server required for demo mode. For production, wire the two endpoints shown below.
 *
 * PRODUCTION (Recommended):
 *  Create two serverless routes (e.g., Next.js/Vercel) and keep your API key server‑side.
 *  See the "SERVERLESS EXAMPLES" near the end of this file.
 *
 * References:
 *  - OpenAI API reference (Responses API): https://platform.openai.com/docs/api-reference/introduction
 *  - Embeddings guide: https://platform.openai.com/docs/guides/embeddings
 *  - text-embedding-3-small model: https://platform.openai.com/docs/models/text-embedding-3-small
 *  - Vercel Functions: https://vercel.com/docs/functions
 */

// ----------------------------
// Minimal glass UI primitives
// ----------------------------
const Shell = ({ children }) => (
  <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_10%_10%,#0b1220_0%,#060b17_45%,#04070f_100%)] text-white">
    <div className="pointer-events-none fixed inset-0 -z-10 mix-blend-screen opacity-80 bg-[radial-gradient(900px_circle_at_85%_15%,rgba(59,130,246,0.35)_0%,transparent_62%),radial-gradient(900px_circle_at_20%_85%,rgba(16,185,129,0.28)_0%,transparent_60%)]"/>
    <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10 bg-white/5">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="font-semibold tracking-tight">Ask Anurag</div>
        <a href="#settings" className="text-sm inline-flex items-center gap-2 opacity-80 hover:opacity-100">
          <Settings2 size={16}/> Knowledge Base
        </a>
      </div>
    </header>
    <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    <footer className="mx-auto max-w-5xl px-4 pb-10 pt-6 text-center text-xs opacity-70">
      Built with a client RAG demo. For production, connect the server routes below.
    </footer>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] ${className}`}>
    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10"/>
    <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-[220%] w-1/2 rotate-12 bg-gradient-to-b from-white/40 to-transparent blur-3xl opacity-40"/>
    {children}
  </div>
);

// ----------------------------
// Demo Knowledge Base (editable)
// ----------------------------
const DEFAULT_KB = [
  {
    id: "project-a",
    title: "Project A — Smart Logistics Dashboard",
    content:
      "Project A is a logistics analytics dashboard. Stack: React, TypeScript, Tailwind, Node.js, PostgreSQL. Tools used: Jira, Confluence, Figma, Postman, GitHub Actions. I owned requirements, UX flows, component library, API contracts, and real‑time charts.",
    tags: ["React", "RAG", "Logistics", "Dashboard", "UX"],
  },
  {
    id: "project-b",
    title: "Project B — Mobile Ordering App",
    content:
      "Project B is a mobile web app for ordering building materials. Tech: Next.js, tRPC, Prisma, MySQL. Tools used: Storybook, Playwright, Sentry, Vercel, Feature Flags. I led accessibility, slot‑booking logic, and performance improvements.",
    tags: ["Next.js", "A11y", "Performance", "Ordering"],
  },
  {
    id: "profile",
    title: "About Anurag",
    content:
      "I am a Requirements Engineer with strong UI/UX focus. Comfortable with React, TypeScript, Tailwind, design systems, test automation, API design, and analytics. Experience collaborating with PO, UX, and Dev in Scrum.",
    tags: ["Requirements", "React", "TypeScript", "UX"],
  },
];

// ----------------------------
// Utility: simple tokenizer
// ----------------------------
function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

// ----------------------------
// Client TF‑IDF scorer (fallback when no embeddings)
// ----------------------------
function scoreByTfIdf(query, docs) {
  const qTokens = tokenize(query);
  const df = new Map();
  const docTokens = docs.map((d) => tokenize(d.content + " " + (d.title || "")));
  docTokens.forEach((toks) => {
    const uniq = new Set(toks);
    uniq.forEach((t) => df.set(t, (df.get(t) || 0) + 1));
  });
  const N = docs.length || 1;
  function idf(t) {
    const n = df.get(t) || 1;
    return Math.log((N + 1) / (n + 0.5));
  }
  function tf(tokens, t) {
    let c = 0;
    for (const x of tokens) if (x === t) c++;
    return c / Math.max(1, tokens.length);
  }
  return docs
    .map((d, i) => {
      const toks = docTokens[i];
      const s = qTokens.reduce((acc, t) => acc + tf(toks, t) * idf(t), 0);
      return { doc: d, score: s };
    })
    .sort((a, b) => b.score - a.score);
}

// ----------------------------
// OpenAI helpers (OPTIONAL)
// ----------------------------
async function embedTextsOpenAI(texts, { apiKey, model = "text-embedding-3-small" }) {
  // Uses OpenAI Embeddings API. Keep the key on a server in production.
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ input: texts, model }),
  });
  if (!res.ok) throw new Error("Embedding request failed");
  const data = await res.json();
  return data.data.map((d) => d.embedding);
}

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

async function rankWithEmbeddings(query, docs, apiKey) {
  const inputs = [query, ...docs.map((d) => `${d.title}\n${d.content}`)];
  const embs = await embedTextsOpenAI(inputs, { apiKey });
  const q = embs[0];
  return docs
    .map((d, i) => ({ doc: d, score: cosine(q, embs[i + 1]) }))
    .sort((a, b) => b.score - a.score);
}

async function generateAnswerOpenAI({ apiKey, model = "gpt-5", question, topChunks }) {
  // Uses the Responses API with a retrieval‑style system prompt.
  const system = `You are Anurag's portfolio assistant. Answer the user's question using ONLY the provided knowledge. If unknown, say you don't know. Return a concise answer (100-180 words) and include a short list of sources by title.`;
  const context = topChunks
    .map((c, i) => `# Source ${i + 1}: ${c.title}\n${c.content}`)
    .join("\n\n");
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        { role: "system", content: system },
        { role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` },
      ],
    }),
  });
  if (!res.ok) throw new Error("Generation request failed");
  const data = await res.json();
  // Responses API returns output in various formats; normalize to text
  const output = data.output_text || data.output?.[0]?.content?.[0]?.text || JSON.stringify(data);
  return output;
}

// ----------------------------
// Main component
// ----------------------------
export default function AskAnurag() {
  const [kb, setKb] = useState(DEFAULT_KB);
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [useOpenAI, setUseOpenAI] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const textareaRef = useRef(null);

  const kbText = useMemo(() => JSON.stringify(kb, null, 2), [kb]);

  function updateKbFromText(text) {
    try {
      const json = JSON.parse(text);
      if (Array.isArray(json)) setKb(json);
      else alert("Knowledge must be an array of {id,title,content,tags}");
    } catch (e) {
      alert("Invalid JSON: " + e.message);
    }
  }

  async function onAsk(e) {
    e?.preventDefault();
    if (!q.trim()) return;
    setBusy(true); setAnswer("");
    try {
      let rankings;
      if (useOpenAI && apiKey) {
        rankings = await rankWithEmbeddings(q, kb, apiKey);
      } else {
        rankings = scoreByTfIdf(q, kb);
      }
      const top = rankings.slice(0, 4).map((r) => r.doc);

      // If OpenAI enabled, ask it to summarize from top chunks. Else, do a simple client summary.
      if (useOpenAI && apiKey) {
        const out = await generateAnswerOpenAI({ apiKey, question: q, topChunks: top });
        setAnswer(out);
      } else {
        const combined = top.map((d, i) => `(${i + 1}) ${d.title}: ${d.content}`).join("\n");
        const simple = `Summary from local KB (demo mode)\n\nQ: ${q}\n\nA: ${combined.slice(0, 900)}${combined.length > 900 ? "..." : ""}\n\nSources: ${top.map((t) => t.title).join(", ")}`;
        setAnswer(simple);
      }
    } catch (err) {
      console.error(err);
      setAnswer("Sorry, I couldn't generate an answer. Check console for details.");
    } finally {
      setBusy(false);
    }
  }

  function addKbItem() {
    const id = `custom-${Date.now()}`;
    setKb((p) => [
      ...p,
      { id, title: "New Entry", content: "Describe project, tools, role, outcomes…", tags: [] },
    ]);
  }

  function removeKbItem(id) {
    setKb((p) => p.filter((x) => x.id !== id));
  }

  return (
    <Shell>
      {/* Hero */}
      <Card className="mb-6">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ask about my work — and get a crisp summary</h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            Type a question about my projects, tools, or experience. The assistant searches my knowledge base and
            summarizes the relevant parts.
          </p>
          <form onSubmit={onAsk} className="mt-6 flex flex-col gap-3 md:flex-row">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. What software tools did you use on Project A?"
              className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 outline-none backdrop-blur placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/40"
            />
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 font-semibold shadow disabled:opacity-50"
            >
              {busy ? <Loader2 className="animate-spin" size={18}/> : <SendHorizonal size={18}/>} Ask
            </button>
          </form>
        </div>
      </Card>

      {/* Answer */}
      <Card>
        <div className="p-6 md:p-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Answer</h2>
            <span className="text-xs opacity-70">{useOpenAI && apiKey ? "AI mode (OpenAI)" : "Demo mode (local)"}</span>
          </div>
          <pre className="whitespace-pre-wrap text-sm leading-6 text-white/90">{answer || "Ask something to see the answer here."}</pre>
        </div>
      </Card>

      {/* Knowledge + Settings */}
      <div id="settings" className="mt-8 grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-3">
          <div className="p-6 md:p-8">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Knowledge Base (JSON)</h3>
              <div className="flex items-center gap-2 text-xs opacity-80">
                <button onClick={addKbItem} className="rounded-xl border border-white/20 px-3 py-1 hover:bg-white/10">+ Add item</button>
              </div>
            </div>
            <textarea
              ref={textareaRef}
              defaultValue={kbText}
              className="h-72 w-full rounded-2xl border border-white/20 bg-white/10 p-3 font-mono text-xs leading-5 backdrop-blur"
              onBlur={(e) => updateKbFromText(e.target.value)}
            />
            <p className="mt-2 text-xs text-white/60">
              Tip: Each item should look like <code>{`{ id, title, content, tags: [] }`}</code>. Paste your real projects here.
            </p>
          </div>
        </Card>
        <div className="grid gap-6 md:col-span-2">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold">AI Settings</h3>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={useOpenAI} onChange={(e) => setUseOpenAI(e.target.checked)} />
                Use OpenAI (serverless/unsafe in client)
              </label>
              <input
                type="password"
                placeholder="OpenAI API Key (temporary, for testing)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-3 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none"
              />
              <p className="mt-2 text-xs text-white/70">
                ⚠️ For production, DON’T put the API key in the browser. Use the server routes below.
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold">Suggested Questions</h3>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {["What software tools did you use on Project A?","What was your role in Project B?","Summarize your frontend stack.","Which testing tools have you used?"].map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="rounded-xl border border-white/20 px-3 py-1 hover:bg-white/10">{s}</button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* SERVERLESS EXAMPLES (copy into your Next.js project) */}
      <Card className="mt-8">
        <div className="p-6 text-sm leading-6 text-white/80">
          <details>
            <summary className="cursor-pointer font-semibold">How to deploy securely (Next.js + Vercel)</summary>
            <div className="mt-3 space-y-3">
              <p>
                1) Create a <code>.env.local</code> with <code>OPENAI_API_KEY=</code>…
              </p>
              <p>
                2) Add two route handlers:
              </p>
              <pre className="rounded-xl bg-black/40 p-3 text-xs">
{`// app/api/embeddings/route.ts
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { input, model = 'text-embedding-3-small' } = await req.json();
  const r = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
    body: JSON.stringify({ input, model })
  });
  const data = await r.json();
  return NextResponse.json(data);
}

// app/api/ask/route.ts
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { model = 'gpt-5', messages } = await req.json();
  const r = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
    body: JSON.stringify({ model, input: messages })
  });
  const data = await r.json();
  return NextResponse.json(data);
}`}
              </pre>
              <p>
                3) In this page, swap <code>embedTextsOpenAI</code> and <code>generateAnswerOpenAI</code> to call your own
                <code> /api/embeddings</code> and <code>/api/ask</code> routes.
              </p>
              <p className="opacity-75">Docs: OpenAI API reference; Vercel Functions quickstart.</p>
            </div>
          </details>
        </div>
      </Card>
    </Shell>
  );
}
