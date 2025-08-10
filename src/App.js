import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Star } from "lucide-react";
import { Routes, Route } from "react-router-dom"; //
import AskAnurag from "./pages/AskAnurag.jsx"; //
import { Link } from 'react-router-dom'


// Local Xing icon (Simple Icons SVG) — accepts `size` like lucide icons
function XingIcon({ size = 20, ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      <path d="M13.898 0c-.402 0-.576.254-.723.54 0 0-7.483 13.272-7.74 13.748-.015.025-.015.057 0 .082l4.926 8.92c.146.283.327.546.723.546h4.68c.322 0 .452-.229.327-.472l-4.867-8.843a.08.08 0 0 1 0-.082l7.738-13.75C15.017.228 14.898 0 14.574 0zm-9.843 5.333c-.31 0-.457.208-.324.48l2.374 4.189a.08.08 0 0 1 0 .082l-3.74 6.64c-.137.242-.027.476.323.476h4.604c.395 0 .587-.256.735-.54l3.78-6.73a.08.08 0 0 0 0-.082L8.228 5.873c-.15-.285-.341-.54-.736-.54z"/>
    </svg>
  );
}

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
  const items = ["About", "Projects", "Experience", "Recommendations", "Contact"];
  return (
    <div className="sticky top-4 z-50 mx-auto max-w-6xl">
      <div className="mx-4 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-2xl shadow-lg">
        <div className="flex items-center justify-between">
          {/* Brand -> always goes home */}
          <Link to="/" className="font-bold tracking-tight text-white/90">
            Anurag Chavan
          </Link>

          {/* Section links */}
          <nav className="hidden md:flex items-center gap-6">
            {items.map((id) => (
              <a
                key={id}
                href={`/#${id.toLowerCase()}`}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {id}
              </a>
            ))}
          </nav>

          {/* Replaced CTA with Ask AI button */}
          <Link
            to="/ask"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-cyan-400"
          >
            Ask AI <ArrowRight size={16} />
          </Link>
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
          Hello Curious Minds!
        </h1>
        <p className="mt-4 max-w-prose text-white/80" style={{ fontFamily: 'Sora, ui-sans-serif' }}>
          I am Anurag. A curious explorer of technology and a passionate Requirements Engineer. I blend a love for innovative solutions with a knack for turning complex ideas into reality. When I'm not shaping seamless user experiences, you'll find me exploring the latest tech trends or catching up on some anime and music. Welcome to my corner of the web. Let's dive in!  </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-cyan-400"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur hover:bg-white/20"
          >
            View Resume
          </a>
        </div>
        <div className="mt-8 flex gap-4 text-white/70">
          <a href="https://github.com/anuragchavan" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="transition hover:text-white"><Github /></a>
          <a href="https://www.linkedin.com/in/chavananurag/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="transition hover:text-white"><Linkedin /></a>
          <a href="https://www.xing.com/profile/Anurag_Chavan5/web_profiles" aria-label="Xing" target="_blank" rel="noopener noreferrer" className="transition hover:text-white"><XingIcon /></a>
          <a href="mailto:anuragchavan366@gmail.com" aria-label="Mail" className="transition hover:text-white"><Mail /></a>
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
            <p className="mt-1 text-4xl font-extrabold text-white">3+</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-white/70">Focus</p>
            <p className="mt-1 text-lg font-semibold text-white">Requirements Engineering · Digital Products · Product Ownership · Product Management</p>
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
    { role: "Working Student - Requirements Engineering", org: "Heidelberg Materials AG", time: "May 2024 - Present", points: ["Feature Documentations", "User Stories Mapping and Creation", "Refinement Support", "Release Planning"] },
    { role: "Intern - Requirements Engineering", org: "Robert Bosch GmbH", time: "Oct 2023 - Mar 2024", points: ["RE Workflows Automatization","Interviewing", "Pain Points Identification", "Process Capability Assessment"] },
    { role: "Associate - Product", org: "Purple Style Labs Pvt. Ltd.", time: "Nov 2020 - Sep 2022", points: ["ECommerce Product Management", "Product Roadmapping", "Backlog Management", "UI Testing"] },
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

// --- Recommendations ---
function Recommendations() {
  const recos = [
    {
      name: "Laura Fuchs",
      title: "Product Owner",
      text:
        "I had the chance to work closely with Anurag while he was supporting our product team as a working student in the role of Requirements Engineer—and he’s been fantastic from the start. He quickly stood out with how independently he worked and how thoughtfully he approached problems. He often spotted things early and came up with smart solutions before we even had to ask. His structured way of working, combined with a strong sense of ownership and attention to detail, made him a real asset to the team. On top of that, Anurag is just great to work with—reliable, curious, and always up for learning something new. I’m confident he’ll be a great addition to any product team out there."
    },
    {
      name: "Raj Kawale",
      title: "Product Manager",
      text:
        "Anurag is a really fun-loving person. Making people feel comfortable and accordingly achieve the task remains his best approach to any problem."
    },
    {
      name: "Arushi Rana",
      title: "Brand & Digital Marketing",
      text:
        "Anurag is extremely amiable to work with. Can manage to stay calm in a storm of workload and prioritise through logic. Always striving to learn the attributes of each function as to cater to them best. Never shy's away from teaching you hacks to make your life easier! Brings in a lot of humour to the table :)"
    },
    {
      name: "Fatimah Rahmani",
      title: "Talent Acquisition",
      text:
        "Anurag is a Champ overall. He worked in our prestigious organisation as an Intern. I found him a curious boy, a keen observer & go-getter. He did well during his internship. As a team member, Anurag earns my highest recommendation. Any employer will be lucky to have him in his organisation."
    }
  ];

  return (
    <section id="recommendations" className="mx-auto mt-16 max-w-6xl px-4">
      <GlassCard>
        <h2
          className="mb-6 text-2xl font-bold tracking-tight text-white"
          style={{ fontFamily: 'Plus Jakarta Sans, ui-sans-serif' }}
        >
          Recommendations
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {recos.map((r, idx) => (
            <div key={idx} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="mb-2 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-white text-sm leading-relaxed">“{r.text}”</p>
              <p className="mt-2 text-sm font-semibold text-white/90">{r.name}</p>
              <p className="text-xs text-white/70">{r.title}</p>
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
              <a href="https://github.com/anuragchavan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"><Github size={18}/>GitHub</a>
              <a href="https://www.linkedin.com/in/chavananurag/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"><Linkedin size={18}/>LinkedIn</a>
              <a href="https://www.xing.com/profile/Anurag_Chavan5/web_profiles" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur hover:bg-white/20"><XingIcon size={18}/>Xing</a>
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
    <Routes>
      {/* Homepage */}
      <Route
        path="/"
        element={
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
              <Recommendations />
              <Contact />
            </main>

            <footer className="mx-auto max-w-6xl px-4 pb-16">
              <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center text-sm text-white/70 backdrop-blur-2xl">
                © {new Date().getFullYear()} Your Name. Built with React & Tailwind.
              </div>
            </footer>
          </div>
        }
      />

      {/* Ask Anurag page */}
      <Route path="/ask" element={<AskAnurag />} />
    </Routes>
  );
}

// --- Dev smoke tests (non-blocking) ---
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  try {
    const el = React.createElement(XingIcon, {});
    console.assert(el && el.type === XingIcon, 'XingIcon should render a valid React element');
    console.assert(typeof GlassCard === 'function', 'GlassCard should be a function component');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Dev smoke tests failed:', err);
  }
}
