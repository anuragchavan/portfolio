import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, ArrowRight, Star } from "lucide-react";

// --- Load better fonts (Plus Jakarta Sans + Sora) ---
function FontLoader() {
  useEffect(() => {
    const pre1 = document.createElement("link");
    pre1.rel = "preconnect"; pre1.href = "https://fonts.googleapis.com";
    const pre2 = document.createElement("link");
    pre2.rel = "preconnect"; pre2.href = "https://fonts.gstatic.com"; pre2.crossOrigin = "";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Sora:wght@400;600;700&display=swap";
    document.head.append(pre1, pre2, link);
    return () => { pre1.remove(); pre2.remove(); link.remove(); };
  }, []);
  return null;
}

// --- Reusable ultra-glassy card ---
function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={
        "relative overflow-hidden rounded-3xl border border-white/25 bg-white/10 p-6 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)] transition-shadow " +
        "ring-1 ring-white/10 " +
        className
      }
    >
      {/* glass border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      {/* animated light sweep */}
      <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-[220%] w-1/2 rotate-12 bg-gradient-to-b from-white/40 to-transparent blur-3xl opacity-60" />
      {/* subtle inner highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 via-transparent to-white/5" />
      {children}
    </motion.div>
  );
}

// --- Sticky Navigation ---
function Nav() {
  const items = ["About", "Projects", "Experience", "Testimonials", "Contact"];
  return (
    <div className="sticky top-4 z-50 mx-auto max-w-6xl">
      <div className="mx-4 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <a href="#hero" className="font-bold tracking-tight text-white/90">MyPortfolio</a>
          <nav className="hidden gap-6 md:flex">
            {items.map((id) => (
              <a
                key={id}
                href={`#${id.toLowerCase()}`}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {id}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-gradient-to-r from-indigo-600/90 to-cyan-500/90 px-4 py-2 text-sm font-semibold text-white shadow hover:from-indigo-500 hover:to-cyan-400"
          >
            Let’s talk <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Dark, contrasty, neon-ish background with blobs + grid + noise ---
function PastelBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* deep gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,#111827_0%,#0b1326_45%,#04070f_100%)]" />
      {/* bright blobs */}
      <div className="absolute inset-0 mix-blend-screen opacity-80 bg-[radial-gradient(800px_circle_at_15%_25%,rgba(168,85,247,0.35)_0%,transparent_60%),radial-gradient(900px_circle_at_85%_20%,rgba(59,130,246,0.35)_0%,transparent_62%),radial-gradient(900px_circle_at_30%_85%,rgba(16,185,129,0.3)_0%,transparent_60%)]" />
      {/* soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)]" />
      {/* grid lines */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
      {/* noise */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.5\'/></svg>")' }} />
    </div>
  );
}

// --- Hero ---
function Hero() {
  return (
    <section id="hero" className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-4 md:mt-16 md:grid-cols-2">
      <GlassCard className="md:col-span-1">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans, ui-sans-serif' }}>
          Elegant Glassmorphism Portfolio
        </h1>
        <p className="mt-4 max-w-prose text-white/80" style={{ fontFamily: 'Sora, ui-sans-serif' }}>
          A sleek, modern, and professional portfolio with ultra-transparent glass panels, smooth rounded corners,
          and a subtle animated sheen. Built with React and Tailwind — fast, clean, and future‑friendly.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-cyan-400"
          >
            View Projects
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur hover:bg-white/20"
          >
            Learn more
          </a>
        </div>
        <div className="mt-8 flex gap-4 text-white/70">
          <a href="#" aria-label="GitHub" className="transition hover:text-white"><Github /></a>
          <a href="#" aria-label="LinkedIn" className="transition hover:text-white"><Linkedin /></a>
          <a href="#" aria-label="Twitter" className="transition hover:text-white"><Twitter /></a>
          <a href="#contact" aria-label="Mail" className="transition hover:text-white"><Mail /></a>
        </div>
      </GlassCard>

      <GlassCard className="md:col-span-1">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-white/70">Projects</p>
            <p className="mt-1 text-4xl font-extrabold text-white">24+</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-white/70">Years Exp.</p>
            <p className="mt-1 text-4xl font-extrabold text-white">3</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-white/70">Focus</p>
            <p className="mt-1 text-lg font-semibold text-white">UI/UX · Frontend · Product</p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}

// --- About ---
function About() {
  return (
    <section id="about" className="mx-auto mt-16 max-w-6xl px-4">
      <GlassCard>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans, ui-sans-serif' }}>About</h2>
            <p className="mt-2 text-white/80" style={{ fontFamily: 'Sora, ui-sans-serif' }}>
              I craft human-friendly interfaces with a strong eye for detail, clean architecture, and performance. I
              love building products that feel effortless and delightful.
            </p>
          </div>
          <ul className="md:col-span-2 grid grid-cols-2 gap-4 text-sm text-white/80">
            {[
              "React / Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node & APIs",
              "Design Systems",
              "Accessibility",
              "Framer Motion",
              "Testing / QA",
            ].map((skill) => (
              <li key={skill} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur">
                <span className="inline-flex h-2 w-2 rounded-full bg-white" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>
    </section>
  );
}

// --- Projects ---
function Projects() {
  const items = Array.from({ length: 6 }).map((_, i) => ({
    title: `Project ${i + 1}`,
    desc: "A short description of the project highlighting the value and tech stack.",
    link: "#",
  }));
  return (
    <section id="projects" className="mx-auto mt-16 max-w-6xl px-4">
      <div className="mb-4 px-2">
        <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans, ui-sans-serif' }}>Projects</h2>
        <p className="text-white/80">Selected work presented as floating glass cards.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <GlassCard key={p.title}>
            <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-white/20 to-white/5" />
            <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
            <p className="mt-1 text-sm text-white/80">{p.desc}</p>
            <a href={p.link} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/90 hover:underline">
              Open <ExternalLink size={16} />
            </a>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

// --- Experience ---
function Experience() {
  const timeline = [
    { role: "Senior Frontend Engineer", org: "Acme Inc.", time: "2024 — Present", points: ["Lead UI system", "Performance improvements", "Design reviews"] },
    { role: "Product Engineer", org: "Pixel Labs", time: "2022 — 2024", points: ["Built Dashboards", "Animations", "A/B testing"] },
    { role: "Frontend Dev", org: "Freelance", time: "2020 — 2022", points: ["Landing pages", "SPAs", "Design-to-code"] },
  ];

  return (
    <section id="experience" className="mx-auto mt-16 max-w-6xl px-4">
      <GlassCard>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans, ui-sans-serif' }}>Experience</h2>
        <div className="space-y-6">
          {timeline.map((item, idx) => (
            <div key={idx} className="grid gap-2 rounded-2xl bg-white/10 p-4 backdrop-blur md:grid-cols-6">
              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-white">{item.role}</p>
                <p className="text-sm text-white/80">{item.org}</p>
              </div>
              <div className="md:col-span-2 text-sm text-white/80">{item.time}</div>
              <ul className="md:col-span-2 list-disc pl-5 text-sm text-white/80">
                {item.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

// --- Testimonials ---
function Testimonials() {
  const quotes = [
    { name: "Sara L.", text: "Delivered a beautiful, performant app ahead of schedule." },
    { name: "Jon P.", text: "Attention to detail is outstanding. Great communication." },
    { name: "Mina K.", text: "Design sense + engineering skills — rare combo!" },
  ];
  return (
    <section id="testimonials" className="mx-auto mt-16 max-w-6xl px-4">
      <GlassCard>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans, ui-sans-serif' }}>Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <div key={q.name} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="mb-2 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-white">“{q.text}”</p>
              <p className="mt-2 text-sm font-medium text-white/90">{q.name}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

// --- Contact ---
function Contact() {
  return (
    <section id="contact" className="mx-auto mt-16 max-w-6xl px-4">
      <GlassCard>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans, ui-sans-serif' }}>Contact</h2>
            <p className="mt-2 text-white/80">Let’s build something great together. I’m open to freelance and full-time roles.</p>
            <div className="mt-4 flex gap-3 text-white/80">
              <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"><Github size={18}/>GitHub</a>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"><Linkedin size={18}/>LinkedIn</a>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"><Twitter size={18}/>Twitter</a>
            </div>
          </div>
          <form className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/90">Name</label>
              <input className="w-full rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-white outline-none backdrop-blur placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/40" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/90">Email</label>
              <input type="email" className="w-full rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-white outline-none backdrop-blur placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/40" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/90">Message</label>
              <textarea rows={4} className="w-full rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-white outline-none backdrop-blur placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/40" placeholder="Tell me a bit about your project" />
            </div>
            <button type="button" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-cyan-400">
              Send message
            </button>
          </form>
        </div>
      </GlassCard>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen text-white selection:bg-white/20" style={{ fontFamily: 'Plus Jakarta Sans, ui-sans-serif' }}>
      <FontLoader />
      <PastelBackground />
      <header className="pt-6 md:pt-8">
        <Nav />
      </header>

      <main className="pb-24">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center text-sm text-white/70 backdrop-blur-2xl">
          © {new Date().getFullYear()} Your Name. Built with React & Tailwind.
        </div>
      </footer>
    </div>
  );
}
