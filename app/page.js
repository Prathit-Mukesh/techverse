'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { TOPICS } from '../data/topics';
import { CATEGORIES } from '../data/categories';
import { COMPARISONS } from '../data/comparisons';
import { PATHS } from '../data/paths';
import { LANGUAGES, UI_STRINGS } from '../data/i18n';

// ── UTILITY: Text-to-Speech ──
function useAudio() {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef(null);
  const speak = useCallback((text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[#*_~`]/g, '').replace(/\n+/g, '. ').slice(0, 4000);
    const u = new SpeechSynthesisUtterance(clean);
    u.rate = 0.95; u.pitch = 1; u.lang = 'en-IN';
    const voices = window.speechSynthesis.getVoices();
    const indiaVoice = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.lang.startsWith('en'));
    if (indiaVoice) u.voice = indiaVoice;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utterRef.current = u;
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }, []);
  const stop = useCallback(() => { if (typeof window !== 'undefined') { window.speechSynthesis.cancel(); setSpeaking(false); } }, []);
  return { speaking, speak, stop };
}

// ── UTILITY: PDF Download ──
function downloadPDF(title, contentId) {
  const el = document.getElementById(contentId);
  if (!el) return;
  const printWin = window.open('', '_blank');
  if (!printWin) { alert('Please allow popups to download PDF'); return; }
  printWin.document.write(`<!DOCTYPE html><html><head><title>${title} — TechVerse</title>
    <style>body{font-family:Georgia,serif;padding:40px;max-width:800px;margin:0 auto;color:#1a1a2e;line-height:1.8;font-size:15px}
    h1{font-size:28px;margin-bottom:8px}h2{font-size:20px;margin-top:24px;color:#2563eb}
    .hook{background:#f0f4ff;padding:16px;border-radius:8px;border-left:4px solid #3b82f6;margin:16px 0;font-style:italic}
    .oneliner{background:#f8fafc;padding:14px;border-radius:8px;margin:12px 0;font-weight:500}
    .comp{background:#f1f5f9;padding:12px;border-radius:6px;margin:6px 0}
    .comp b{color:#2563eb}.faq{margin:8px 0;padding:8px 0;border-bottom:1px solid #e2e8f0}
    .faq b{color:#1e40af}p{margin:8px 0}
    @media print{body{padding:20px}}</style></head><body>`);
  printWin.document.write('<div style="text-align:center;margin-bottom:20px"><b style="font-size:12px;color:#6366f1;letter-spacing:2px">TECHVERSE</b></div>');
  const clone = el.cloneNode(true);
  // Remove buttons, interactive elements
  clone.querySelectorAll('button, [data-noprint]').forEach(b => b.remove());
  printWin.document.write(clone.innerHTML);
  printWin.document.write('<div style="margin-top:40px;padding-top:16px;border-top:2px solid #e2e8f0;text-align:center;color:#94a3b8;font-size:12px">Generated from TechVerse — techverse-tan.vercel.app</div>');
  printWin.document.write('</body></html>');
  printWin.document.close();
  setTimeout(() => { printWin.print(); }, 500);
}

// ── THEME COLORS ──
const THEMES = {
  dark: { bg: '#0B1120', bgCard: 'rgba(255,255,255,0.03)', bgCardHover: 'rgba(255,255,255,0.06)', text: '#E2E8F0', textSec: '#94A3B8', textMuted: '#64748B', border: 'rgba(255,255,255,0.06)', navBg: 'rgba(11,17,32,0.94)', accent: '#3B82F6', hookBg: 'linear-gradient(135deg,rgba(59,130,246,0.07),rgba(139,92,246,0.04))' },
  light: { bg: '#F8FAFC', bgCard: '#FFFFFF', bgCardHover: '#F1F5F9', text: '#1E293B', textSec: '#475569', textMuted: '#94A3B8', border: '#E2E8F0', navBg: 'rgba(248,250,252,0.94)', accent: '#2563EB', hookBg: 'linear-gradient(135deg,rgba(59,130,246,0.06),rgba(139,92,246,0.04))' }
};

// ── COMPONENTS ──
const ab = { padding: "9px 18px", borderRadius: 10, border: "1px solid rgba(128,128,128,0.2)", background: "rgba(128,128,128,0.06)", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" };

function Flow({ steps, theme }) {
  const T = THEMES[theme];
  return (<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{steps.map((s, i) => (<div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}><div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff", fontWeight: 700, fontSize: 14 }}>{i + 1}</div>{i < steps.length - 1 && <div style={{ width: 2, height: 20, background: "linear-gradient(to bottom,#3B82F6,transparent)" }} />}</div><div style={{ paddingBottom: 10 }}><div style={{ fontWeight: 700, fontSize: 16, color: T.text, fontFamily: "Outfit", marginBottom: 2 }}>{s.title}</div><div style={{ color: T.textSec, fontSize: 15, lineHeight: 1.65 }}>{s.desc}</div></div></div>))}</div>);
}

function Comps({ comps, theme }) {
  const T = THEMES[theme];
  return (<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>{comps.map((c, i) => (<div key={i} className="comp" style={{ background: T.bgCard, borderRadius: 10, padding: 14, border: `1px solid ${T.border}` }}><div style={{ fontWeight: 700, color: "#60A5FA", fontSize: 15, marginBottom: 4, fontFamily: "Outfit" }}>{c.name}</div><div style={{ color: T.textSec, fontSize: 14, lineHeight: 1.6 }}>{c.desc}</div></div>))}</div>);
}

function StepAnim({ steps, color = "#3B82F6", theme }) {
  const T = THEMES[theme];
  const [s, setS] = useState(0);
  const [a, setA] = useState(false);
  const r = useRef(null);
  useEffect(() => { if (a && s < steps.length - 1) r.current = setTimeout(() => setS(x => x + 1), 2000); else setA(false); return () => clearTimeout(r.current); }, [a, s, steps.length]);
  return (<div><div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>{steps.map((_, i) => (<button key={i} onClick={() => setS(i)} style={{ width: 34, height: 34, borderRadius: "50%", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, background: i === s ? color : i < s ? `${color}33` : T.bgCard, color: i <= s ? "#fff" : T.textMuted }}>{i + 1}</button>))}</div>
    <div style={{ background: `${color}12`, borderRadius: 12, padding: 20, border: `1px solid ${color}25`, minHeight: 60 }}><div style={{ fontWeight: 700, color, fontSize: 17, marginBottom: 4, fontFamily: "Outfit" }}>Step {s + 1}: {steps[s].title}</div><div style={{ color: T.text, fontSize: 15, lineHeight: 1.7 }}>{steps[s].desc}</div></div>
    <div style={{ display: "flex", gap: 8, marginTop: 12 }} data-noprint><button onClick={() => { setS(0); setA(true); }} style={{...ab, color: T.text}}>▶ Play</button><button onClick={() => setS(x => Math.max(0, x - 1))} style={{...ab, color: T.text}}>←</button><button onClick={() => setS(x => Math.min(steps.length - 1, x + 1))} style={{...ab, color: T.text}}>→</button></div></div>);
}

function GetAnim({ topic, theme }) {
  const cat = CATEGORIES.find(c => c.id === topic.category);
  return <StepAnim steps={topic.steps} color={cat?.color || "#3B82F6"} theme={theme} />;
}

function Quiz({ questions, t, theme }) {
  const T = THEMES[theme];
  const [c, setC] = useState(0); const [s, setS] = useState(null); const [sc, setSc] = useState(0); const [d, setD] = useState(false); const [an, setAn] = useState(false);
  const q = questions[c];
  const pick = i => { if (an) return; setS(i); setAn(true); if (i === q.answer) setSc(x => x + 1); };
  const next = () => { if (c < questions.length - 1) { setC(x => x + 1); setS(null); setAn(false); } else setD(true); };
  const reset = () => { setC(0); setS(null); setSc(0); setD(false); setAn(false); };
  if (d) return (<div style={{ textAlign: "center", padding: 20 }}><div style={{ fontSize: 42 }}>{sc === questions.length ? "🎉" : "👏"}</div><div style={{ fontSize: 22, fontWeight: 700, color: T.text }}>{sc}/{questions.length}</div><p style={{color:T.textSec,fontSize:16,marginTop:6}}>{sc === questions.length ? t.perfect : sc >= questions.length / 2 ? t.good : t.keepLearning}</p><button onClick={reset} style={{ ...ab, marginTop: 14, color: T.text }}>{t.tryAgain}</button></div>);
  return (<div>
    <div style={{ display: "flex", justifyContent: "space-between", color: T.textMuted, fontSize: 14, marginBottom: 10 }}><span>Q{c + 1}/{questions.length}</span><span>{t.score}: {sc}</span></div>
    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 14, lineHeight: 1.6, color: T.text }}>{q.q}</div>
    {q.options.map((o, i) => { let bg = T.bgCard, bd = `1px solid ${T.border}`, cl = T.text; if (an) { if (i === q.answer) { bg = "rgba(16,185,129,0.15)"; bd = "1px solid #10B981"; cl = "#10B981"; } else if (i === s) { bg = "rgba(239,68,68,0.15)"; bd = "1px solid #EF4444"; cl = "#EF4444"; } } return <button key={i} onClick={() => pick(i)} style={{ display: "block", width: "100%", background: bg, border: bd, borderRadius: 9, padding: "11px 14px", color: cl, fontSize: 15, cursor: an ? "default" : "pointer", textAlign: "left", marginBottom: 6, fontFamily: "inherit", lineHeight: 1.5 }}>{o}</button>; })}
    {an && <button onClick={next} style={{ ...ab, marginTop: 12, width: "100%", color: T.text }}>{c < questions.length - 1 ? t.next : t.results}</button>}
  </div>);
}

function FAQSection({ faqs, theme }) {
  const T = THEMES[theme];
  const [openIdx, setOpenIdx] = useState(null);
  return (<div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {faqs.map((f, i) => (<div key={i} className="faq" style={{ background: T.bgCard, borderRadius: 10, border: `1px solid ${T.border}`, overflow: "hidden" }}>
      <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "14px 18px", border: "none", background: "transparent", color: T.text, fontSize: 16, fontWeight: 600, cursor: "pointer", textAlign: "left", fontFamily: "inherit", lineHeight: 1.5, gap: 12 }}>
        <span><b>{f.q}</b></span>
        <span style={{ fontSize: 16, flexShrink: 0, transform: openIdx === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", color: T.textMuted }}>▾</span>
      </button>
      {openIdx === i && <div style={{ padding: "4px 18px 18px", color: T.textSec, fontSize: 15, lineHeight: 1.75, borderTop: `1px solid ${T.border}` }}>{f.a}</div>}
    </div>))}
  </div>);
}

// ── TOOLBAR: Audio + PDF + Font Size + Theme ──
function Toolbar({ theme, setTheme, fontSize, setFontSize, topic, speaking, onSpeak, onStop }) {
  const T = THEMES[theme];
  const sizes = [14, 16, 18, 20, 22];
  const sizeIdx = sizes.indexOf(fontSize);
  return (
    <div data-noprint style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18, padding: "8px 12px", borderRadius: 12, background: T.bgCard, border: `1px solid ${T.border}`, alignItems: "center" }}>
      {/* Audio */}
      {topic && <button onClick={() => speaking ? onStop() : onSpeak(topic.hook + '. ' + topic.oneLiner + '. ' + topic.beginnerExplanation?.slice(0, 2000))} style={{ ...ab, color: speaking ? "#EF4444" : T.accent, background: speaking ? "rgba(239,68,68,0.1)" : "transparent", display: "flex", alignItems: "center", gap: 4 }}>
        {speaking ? "⏹ Stop" : "🔊 Listen"}
      </button>}
      {/* PDF */}
      {topic && <button onClick={() => downloadPDF(topic.title, 'topic-content')} style={{ ...ab, color: T.accent, display: "flex", alignItems: "center", gap: 4 }}>
        📄 PDF
      </button>}
      {/* Divider */}
      <div style={{ width: 1, height: 24, background: T.border, margin: "0 4px" }} />
      {/* Font Size */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <button onClick={() => setFontSize(sizes[Math.max(0, sizeIdx - 1)])} style={{ ...ab, fontSize: 12, padding: "6px 10px", color: T.text }} disabled={sizeIdx <= 0}>A-</button>
        <span style={{ fontSize: 12, color: T.textMuted, minWidth: 30, textAlign: "center" }}>{fontSize}px</span>
        <button onClick={() => setFontSize(sizes[Math.min(sizes.length - 1, sizeIdx + 1)])} style={{ ...ab, fontSize: 16, padding: "6px 10px", color: T.text }} disabled={sizeIdx >= sizes.length - 1}>A+</button>
      </div>
      {/* Divider */}
      <div style={{ width: 1, height: 24, background: T.border, margin: "0 4px" }} />
      {/* Theme */}
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ ...ab, color: T.text, display: "flex", alignItems: "center", gap: 4 }}>
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}

// ── MAIN APP ──
export default function TechVerse() {
  const [pg, setPg] = useState("home");
  const [topic, setTopic] = useState(null);
  const [cat, setCat] = useState(null);
  const [q, setQ] = useState("");
  const [mode, setMode] = useState("language");
  const [depth, setDepth] = useState(1);
  const [menu, setMenu] = useState(false);
  const [marks, setMarks] = useState([]);
  const [progress, setProgress] = useState({});
  const [hp, setHp] = useState(0);
  const [lang, setLang] = useState("en");
  const [showLang, setShowLang] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState(16);

  const { speaking, speak, stop } = useAudio();
  const t = UI_STRINGS[lang] || UI_STRINGS.en;
  const dir = LANGUAGES.find(l => l.code === lang)?.dir || "ltr";
  const T = THEMES[theme];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tv_progress');
      if (saved) setProgress(JSON.parse(saved));
      const savedMarks = localStorage.getItem('tv_marks');
      if (savedMarks) setMarks(JSON.parse(savedMarks));
      const savedLang = localStorage.getItem('tv_lang');
      if (savedLang) setLang(savedLang);
      const savedTheme = localStorage.getItem('tv_theme');
      if (savedTheme) setTheme(savedTheme);
      const savedFontSize = localStorage.getItem('tv_fontSize');
      if (savedFontSize) setFontSize(parseInt(savedFontSize));
    } catch (e) {}
  }, []);

  useEffect(() => { try { localStorage.setItem('tv_progress', JSON.stringify(progress)); } catch(e){} }, [progress]);
  useEffect(() => { try { localStorage.setItem('tv_marks', JSON.stringify(marks)); } catch(e){} }, [marks]);
  useEffect(() => { try { localStorage.setItem('tv_lang', lang); } catch(e){} }, [lang]);
  useEffect(() => { try { localStorage.setItem('tv_theme', theme); } catch(e){} }, [theme]);
  useEffect(() => { try { localStorage.setItem('tv_fontSize', String(fontSize)); } catch(e){} }, [fontSize]);
  useEffect(() => { const i = setInterval(() => setHp(p => (p + 1) % 5), 2800); return () => clearInterval(i); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [pg, topic]);
  useEffect(() => { return () => { if (typeof window !== 'undefined') window.speechSynthesis.cancel(); }; }, [topic]);

  const open = id => { const tp = TOPICS.find(x => x.id === id); if (tp) { setTopic(tp); setPg("topic"); setMode("language"); setDepth(1); setProgress(p => ({ ...p, [id]: true })); setMenu(false); stop(); } };
  const mark = id => setMarks(m => m.includes(id) ? m.filter(x => x !== id) : [...m, id]);

  const filtered = useMemo(() => {
    let a = [...TOPICS];
    if (q) { const s = q.toLowerCase(); a = a.filter(x => x.title.toLowerCase().includes(s) || x.category.includes(s) || x.summary.toLowerCase().includes(s) || (x.oneLiner && x.oneLiner.toLowerCase().includes(s)) || (x.faqs && x.faqs.some(f => f.q.toLowerCase().includes(s)))); }
    if (cat) a = a.filter(x => x.category === cat);
    return a;
  }, [q, cat]);

  const heroW = ["Electricity", "Internet", "AI", "Cameras", "Rockets"];
  const cc = Object.keys(progress).length;
  const navTo = (page) => { setPg(page); setMenu(false); setShowLang(false); if (page === "home") { setCat(null); setQ(""); } stop(); };

  return (
    <div dir={dir} style={{ fontFamily: "'Source Serif 4','DM Sans','Outfit',Georgia,system-ui,serif", background: T.bg, color: T.text, minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: T.navBg, backdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}`, padding: "0 18px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => navTo("home")}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff" }}>T</div>
          <span style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 18 }}>TechVerse</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          {cc > 0 && <span style={{ padding: "3px 9px", borderRadius: 10, background: "rgba(16,185,129,0.12)", color: "#10B981", fontSize: 12, fontWeight: 700 }}>{cc} {t.learned}</span>}
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ border: "none", background: "transparent", color: T.text, cursor: "pointer", fontSize: 15, padding: "5px 8px" }}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          <button onClick={() => { setShowLang(!showLang); setMenu(false); }} style={{ border: "none", background: "transparent", color: T.text, cursor: "pointer", fontSize: 15, padding: "5px 8px" }}>🌐</button>
          <button onClick={() => { setMenu(!menu); setShowLang(false); }} style={{ border: "none", background: "transparent", color: T.text, cursor: "pointer", fontSize: 20, padding: "5px 8px" }}>☰</button>
        </div>
      </nav>

      {/* Language selector */}
      {showLang && <div style={{ position: "fixed", top: 54, right: 0, zIndex: 99, width: 200, background: theme === 'dark' ? "#111827" : "#fff", border: `1px solid ${T.border}`, borderRadius: "0 0 0 12px", padding: 8, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
        <div style={{ color: T.textMuted, fontSize: 13, fontWeight: 700, padding: "5px 10px", marginBottom: 4 }}>{t.switchLang}</div>
        {LANGUAGES.map(l => (<button key={l.code} onClick={() => { setLang(l.code); setShowLang(false); }} style={{ display: "block", width: "100%", padding: "8px 10px", borderRadius: 6, border: "none", background: lang === l.code ? "rgba(59,130,246,0.15)" : "transparent", color: lang === l.code ? "#60A5FA" : T.text, fontSize: 15, fontWeight: lang === l.code ? 700 : 400, textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}>{l.native} ({l.name})</button>))}
      </div>}

      {/* Menu */}
      {menu && <div style={{ position: "fixed", top: 54, right: 0, zIndex: 99, width: 200, background: theme === 'dark' ? "#111827" : "#fff", border: `1px solid ${T.border}`, borderRadius: "0 0 0 12px", padding: 8, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
        {[{ l: t.home, p: "home" }, { l: t.exploreTopics, p: "explore" }, { l: t.categories, p: "categories" }, { l: t.learningPaths, p: "paths" }, { l: t.compare, p: "compare" }, { l: t.glossary, p: "glossary" }, { l: t.about, p: "about" }].map(x => (
          <button key={x.l} onClick={() => navTo(x.p)} style={{ display: "block", width: "100%", padding: "9px 10px", borderRadius: 6, border: "none", background: "transparent", color: T.text, fontSize: 15, fontWeight: 500, textAlign: dir === "rtl" ? "right" : "left", cursor: "pointer", fontFamily: "inherit" }}>{x.l}</button>
        ))}
      </div>}

      <main style={{ paddingTop: 54, fontSize }}>

        {/* ═══ HOME ═══ */}
        {pg === "home" && <div>
          <section style={{ minHeight: "75vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 18px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 20%,rgba(59,130,246,0.06) 0%,transparent 50%)" }} />
            <div style={{ position: "relative", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
              <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 14, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", color: "#60A5FA", fontSize: 13, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 16 }}>{t.tagline}</div>
              <h1 style={{ fontFamily: "Outfit", fontSize: "clamp(26px,6vw,44px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 14 }}>
                {t.heroTitle}{" "}<span style={{ background: "linear-gradient(135deg,#3B82F6,#A855F7,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{heroW[hp]}</span>{" "}{t.heroTitle2}
              </h1>
              <p style={{ fontSize: "clamp(13px,2.2vw,16px)", color: T.textSec, lineHeight: 1.6, marginBottom: 24, maxWidth: 460, margin: "0 auto 24px" }}>{t.heroSub}</p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => navTo("explore")} style={{ padding: "10px 22px", borderRadius: 9, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "inherit", boxShadow: "0 3px 12px rgba(59,130,246,0.3)" }}>{t.startLearning}</button>
                <button onClick={() => navTo("explore")} style={{ padding: "10px 22px", borderRadius: 9, border: `1px solid ${T.border}`, cursor: "pointer", background: T.bgCard, color: T.text, fontSize: 16, fontWeight: 600, fontFamily: "inherit" }}>{t.exploreTopics}</button>
              </div>
              <p style={{ marginTop: 16, color: T.textMuted, fontSize: 14 }}>{TOPICS.length} topics · ~500,000 words · Free forever</p>
            </div>
          </section>

          <section style={{ padding: "30px 18px", maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Outfit", fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 20 }}>{t.threeWays}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
              {[{ i: "📖", tt: t.simpleLanguage, d: t.simpleDesc, g: "rgba(16,185,129,0.08)", b: "rgba(16,185,129,0.15)" }, { i: "📊", tt: t.chartsDiagrams, d: t.chartsDesc, g: "rgba(59,130,246,0.08)", b: "rgba(59,130,246,0.15)" }, { i: "🎬", tt: t.animations, d: t.animDesc, g: "rgba(168,85,247,0.08)", b: "rgba(168,85,247,0.15)" }].map((m, i) => (
                <div key={i} style={{ background: m.g, borderRadius: 12, padding: 16, border: `1px solid ${m.b}` }}><div style={{ fontSize: 26, marginBottom: 6 }}>{m.i}</div><h3 style={{ fontFamily: "Outfit", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{m.tt}</h3><p style={{ color: T.textSec, fontSize: 14, lineHeight: 1.6 }}>{m.d}</p></div>
              ))}
            </div>
          </section>

          <section style={{ padding: "30px 20px 50px", maxWidth: 820, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Outfit", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>{t.allTopics}</h2>
            <p style={{ textAlign: "center", color: T.textMuted, fontSize: 16, marginBottom: 24 }}>{TOPICS.length} {t.topics}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
              {TOPICS.map(tp => { const c = CATEGORIES.find(x => x.id === tp.category); return (
                <div key={tp.id} className="hl" onClick={() => open(tp.id)} style={{ background: T.bgCard, borderRadius: 12, padding: 18, cursor: "pointer", border: `1px solid ${T.border}`, transition: "transform 0.15s, box-shadow 0.15s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>{c?.icon}</span>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      {progress[tp.id] && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />}
                      <span style={{ padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600, background: tp.difficulty === "beginner" ? "rgba(16,185,129,0.12)" : tp.difficulty === "intermediate" ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)", color: tp.difficulty === "beginner" ? "#10B981" : tp.difficulty === "intermediate" ? "#F59E0B" : "#EF4444" }}>{tp.difficulty === "beginner" ? t.beginner : tp.difficulty === "intermediate" ? t.intermediate : t.adv}</span>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{tp.title}</h3>
                  <p style={{ color: T.textSec, fontSize: 14, lineHeight: 1.55 }}>{tp.summary.slice(0, 100)}...</p>
                  <div style={{ marginTop: 8, color: T.textMuted, fontSize: 13 }}>⏱ {tp.readTime}</div>
                </div>
              ); })}
            </div>
          </section>

          <section style={{ padding: "24px 18px 40px", maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Outfit", fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 20 }}>{t.learningPaths}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
              {PATHS.map(p => (<div key={p.id} className="hl" onClick={() => navTo("paths")} style={{ background: `${p.color}08`, borderRadius: 12, padding: 16, cursor: "pointer", border: `1px solid ${p.color}18` }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{p.icon}</div>
                <h3 style={{ fontFamily: "Outfit", fontSize: 17, fontWeight: 700, color: p.color, marginBottom: 5 }}>{p.title}</h3>
                <p style={{ color: T.textSec, fontSize: 14, lineHeight: 1.55 }}>{p.desc}</p>
                <div style={{ color: T.textMuted, fontSize: 13, marginTop: 6 }}>{p.topics.length} {t.topics}</div>
              </div>))}
            </div>
          </section>
        </div>}

        {/* ═══ EXPLORE ═══ */}
        {pg === "explore" && <div style={{ padding: "20px 20px 50px", maxWidth: 820, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "Outfit", fontSize: 28, fontWeight: 800, marginBottom: 16 }}>{t.exploreTopics}</h1>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            <button onClick={() => setCat(null)} style={{ padding: "7px 16px", borderRadius: 18, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", background: !cat ? "#3B82F6" : T.bgCard, color: !cat ? "#fff" : T.textSec }}>{t.all}</button>
            {CATEGORIES.filter(c => TOPICS.some(tp => tp.category === c.id)).map(c => (<button key={c.id} onClick={() => setCat(cat === c.id ? null : c.id)} style={{ padding: "7px 16px", borderRadius: 18, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", background: cat === c.id ? c.color : T.bgCard, color: cat === c.id ? "#fff" : T.textSec }}>{c.icon} {c.name}</button>))}
          </div>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bgCard, color: T.text, fontSize: 16, outline: "none", marginBottom: 18, fontFamily: "inherit" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
            {filtered.map(tp => { const c = CATEGORIES.find(x => x.id === tp.category); return (
              <div key={tp.id} className="hl" onClick={() => open(tp.id)} style={{ background: T.bgCard, borderRadius: 12, padding: 18, cursor: "pointer", border: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 22 }}>{c?.icon}</span><span style={{ fontSize: 13, fontWeight: 600, color: tp.difficulty === "beginner" ? "#10B981" : "#F59E0B" }}>{tp.difficulty}</span></div>
                <h3 style={{ fontFamily: "Outfit", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{tp.title}</h3>
                <p style={{ color: T.textSec, fontSize: 14, lineHeight: 1.55 }}>{tp.summary.slice(0, 100)}...</p>
              </div>); })}
          </div>
        </div>}

        {/* ═══ CATEGORIES ═══ */}
        {pg === "categories" && <div style={{ padding: "14px 18px 40px", maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "Outfit", fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{t.categories}</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
            {CATEGORIES.map(c => { const cnt = TOPICS.filter(x => x.category === c.id).length; return cnt > 0 ? (
              <div key={c.id} className="hl" onClick={() => { setCat(c.id); navTo("explore"); }} style={{ background: c.gradient, borderRadius: 12, padding: 16, cursor: "pointer", color: "#fff" }}>
                <div style={{ fontSize: 26, marginBottom: 4 }}>{c.icon}</div>
                <h3 style={{ fontFamily: "Outfit", fontSize: 14, fontWeight: 700 }}>{c.name}</h3>
                <p style={{ fontSize: 14, opacity: 0.8 }}>{cnt} {t.topics}</p>
              </div>) : null; })}
          </div>
        </div>}

        {/* ═══ PATHS ═══ */}
        {pg === "paths" && <div style={{ padding: "14px 18px 40px", maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "Outfit", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{t.learningPaths}</h1>
          <p style={{ color: T.textSec, marginBottom: 20, fontSize: 13 }}>{t.structuredJourneys}</p>
          {PATHS.map(p => (<div key={p.id} style={{ background: `${p.color}06`, borderRadius: 12, padding: 18, border: `1px solid ${p.color}15`, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{p.icon}</span>
              <div><h3 style={{ fontFamily: "Outfit", fontSize: 16, fontWeight: 700, color: p.color }}>{p.title}</h3><p style={{ color: T.textSec, fontSize: 14 }}>{p.desc}</p></div>
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {p.topics.map((tid, i) => { const tp = TOPICS.find(x => x.id === tid); return tp ? (<button key={tid} onClick={() => open(tid)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 7, background: T.bgCard, border: `1px solid ${T.border}`, cursor: "pointer", fontSize: 14, color: T.text, fontFamily: "inherit" }}><span style={{ color: p.color, fontWeight: 700 }}>{i + 1}.</span>{tp.title}{progress[tid] && <span style={{ color: "#10B981" }}>✓</span>}</button>) : null; })}
            </div>
          </div>))}
        </div>}

        {/* ═══ COMPARE ═══ */}
        {pg === "compare" && <div style={{ padding: "14px 18px 40px", maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "Outfit", fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{t.compare}</h1>
          {COMPARISONS.map(comp => (<div key={comp.id} style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "Outfit", fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#60A5FA" }}>{comp.title}</h2>
            <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead><tr><th style={{ textAlign: "left", padding: "6px 8px", borderBottom: `1px solid ${T.border}`, color: T.textMuted }}></th>
                {comp.items.map(item => (<th key={item} style={{ textAlign: "left", padding: "6px 8px", borderBottom: `1px solid ${T.border}`, color: "#60A5FA", fontWeight: 700, minWidth: 90 }}>{item}</th>))}</tr></thead>
              <tbody>{comp.rows.map((row, i) => (<tr key={i}><td style={{ padding: "6px 8px", borderBottom: `1px solid ${T.border}`, fontWeight: 600 }}>{row.label}</td>
                {row.values.map((v, j) => (<td key={j} style={{ padding: "6px 8px", borderBottom: `1px solid ${T.border}`, color: T.textSec }}>{v}</td>))}</tr>))}</tbody>
            </table></div>
          </div>))}
        </div>}

        {/* ═══ GLOSSARY ═══ */}
        {pg === "glossary" && <div style={{ padding: "14px 18px 40px", maxWidth: 600, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "Outfit", fontSize: 22, fontWeight: 800, marginBottom: 16 }}>{t.glossary}</h1>
          {TOPICS.flatMap(x => (x.glossary || []).map(g => ({ ...g, topic: x.title }))).sort((a, b) => a.term.localeCompare(b.term)).map((g, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontWeight: 700, color: "#60A5FA", fontSize: 12 }}>{g.term}</span>
              <span style={{ color: T.textMuted }}> — </span>
              <span style={{ color: T.textSec, fontSize: 12 }}>{g.def}</span>
              <div style={{ color: T.textMuted, fontSize: 12, marginTop: 2 }}>{t.from}: {g.topic}</div>
            </div>))}
        </div>}

        {/* ═══ ABOUT ═══ */}
        {pg === "about" && <div style={{ padding: "14px 18px 40px", maxWidth: 600, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "Outfit", fontSize: 26, fontWeight: 800, marginBottom: 16 }}>{t.about} TechVerse</h1>
          <div style={{ color: T.textSec, lineHeight: 1.8, fontSize: 14 }}>
            <p style={{ marginBottom: 12 }}>{t.aboutText1}</p>
            <p style={{ marginBottom: 12 }}>{t.aboutText2}</p>
            <p style={{ marginBottom: 12 }}>{t.aboutText3}</p>
            <h2 style={{ fontFamily: "Outfit", fontSize: 18, fontWeight: 700, color: T.text, marginTop: 20, marginBottom: 8 }}>{t.missionTitle}</h2>
            <p>{t.missionText}</p>
          </div>
        </div>}

        {/* ═══ TOPIC DETAIL ═══ */}
        {pg === "topic" && topic && <div style={{ maxWidth: 760, margin: "0 auto", padding: "20px 20px 60px" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, fontSize: 14, color: T.textMuted, flexWrap: "wrap" }}>
            <span onClick={() => navTo("home")} style={{ cursor: "pointer", color: T.accent }}>{t.home}</span><span>›</span>
            <span onClick={() => navTo("explore")} style={{ cursor: "pointer", color: T.accent }}>{t.exploreTopics}</span><span>›</span>
            <span>{topic.title}</span>
          </div>

          {/* Toolbar: Audio, PDF, Font Size, Theme */}
          <Toolbar theme={theme} setTheme={setTheme} fontSize={fontSize} setFontSize={setFontSize} topic={topic} speaking={speaking} onSpeak={speak} onStop={stop} />

          <div id="topic-content">
          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 30 }}>{CATEGORIES.find(c => c.id === topic.category)?.icon}</span>
              <span style={{ padding: "4px 12px", borderRadius: 14, fontSize: 13, fontWeight: 600, background: topic.difficulty === "beginner" ? "rgba(16,185,129,0.12)" : topic.difficulty === "intermediate" ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)", color: topic.difficulty === "beginner" ? "#10B981" : topic.difficulty === "intermediate" ? "#F59E0B" : "#EF4444" }}>{topic.difficulty}</span>
              <span style={{ color: T.textMuted, fontSize: 14 }}>⏱ {topic.readTime}</span>
              <button data-noprint onClick={() => mark(topic.id)} style={{ ...ab, color: T.text, background: marks.includes(topic.id) ? "rgba(245,158,11,0.12)" : "transparent" }}>{marks.includes(topic.id) ? `★ ${t.saved}` : `☆ ${t.save}`}</button>
            </div>
            <h1 style={{ fontFamily: "Outfit", fontSize: "clamp(26px,5vw,38px)", fontWeight: 900, lineHeight: 1.15 }}>{topic.title}</h1>
          </div>

          {/* Hook */}
          <div className="hook" style={{ background: T.hookBg, borderRadius: 14, padding: 22, marginBottom: 20, borderLeft: `4px solid ${T.accent}`, fontSize: fontSize + 1, lineHeight: 1.8, fontStyle: "italic", color: T.text }}>{topic.hook}</div>

          {/* One-liner */}
          <div className="oneliner" style={{ background: T.bgCard, borderRadius: 12, padding: 18, marginBottom: 20, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.accent, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "Outfit" }}>{t.inOneLine}</div>
            <div style={{ fontSize, lineHeight: 1.7, fontWeight: 500 }}>{topic.oneLiner}</div>
          </div>

          {/* Mode Tabs */}
          <div data-noprint style={{ display: "flex", gap: 3, marginBottom: 18, padding: 3, borderRadius: 12, background: T.bgCard, border: `1px solid ${T.border}` }}>
            {[{ id: "language", i: "📖", l: t.language }, { id: "diagram", i: "📊", l: t.diagrams }, { id: "animation", i: "🎬", l: t.animation }].map(m => (
              <button key={m.id} onClick={() => setMode(m.id)} style={{ flex: 1, padding: "10px 6px", borderRadius: 10, border: "none", cursor: "pointer", background: mode === m.id ? "linear-gradient(135deg,#3B82F6,#2563EB)" : "transparent", color: mode === m.id ? "#fff" : T.textSec, fontSize: 14, fontWeight: 600, fontFamily: "inherit", transition: "all 0.3s" }}>{m.i} {m.l}</button>
            ))}
          </div>

          {/* Depth Tabs */}
          {mode === "language" && <div data-noprint style={{ display: "flex", gap: 3, marginBottom: 20, padding: 3, borderRadius: 10, background: T.bgCard, border: `1px solid ${T.border}` }}>
            {[{ l: 1, tt: `🌱 ${t.simple}` }, { l: 2, tt: `📘 ${t.standard}` }, { l: 3, tt: `🔬 ${t.advanced}` }].map(d => (
              <button key={d.l} onClick={() => setDepth(d.l)} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer", background: depth === d.l ? (d.l === 1 ? "#10B981" : d.l === 2 ? "#3B82F6" : "#8B5CF6") : "transparent", color: depth === d.l ? "#fff" : T.textMuted, fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>{d.tt}</button>
            ))}
          </div>}

          {/* ── LANGUAGE MODE ── */}
          {mode === "language" && <div style={{ fontSize, lineHeight: 1.85, color: T.textSec }}>
            {depth === 1 && topic.childSummary && <div style={{ background: "rgba(16,185,129,0.07)", borderRadius: 12, padding: 18, marginBottom: 22, border: "1px solid rgba(16,185,129,0.12)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981", marginBottom: 4, fontFamily: "Outfit" }}>🧒 {t.explainChild}</div>
              <div style={{ color: T.text, lineHeight: 1.8 }}>{topic.childSummary}</div>
            </div>}

            <h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, color: T.text, marginBottom: 10 }}>{depth === 1 ? t.beginnerExp : depth === 2 ? t.standardExp : t.advancedExp}</h2>
            <div style={{ whiteSpace: "pre-wrap", marginBottom: 28 }}>{depth === 1 ? topic.beginnerExplanation : depth === 2 ? topic.standardExplanation : topic.advancedExplanation}</div>

            <div style={{ background: "rgba(139,92,246,0.07)", borderRadius: 12, padding: 18, marginBottom: 28, border: "1px solid rgba(139,92,246,0.12)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#A78BFA", marginBottom: 4, fontFamily: "Outfit", textTransform: "uppercase", letterSpacing: 0.6 }}>🎯 {t.corePrinciple}</div>
              <div style={{ color: T.text, fontWeight: 500, lineHeight: 1.8 }}>{topic.corePrinciple}</div>
            </div>

            {topic.analogies && <div style={{ marginBottom: 28 }}><h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, color: T.text, marginBottom: 12 }}>💡 {t.thinkLike}</h2>
              {topic.analogies.map((a, i) => (<div key={i} style={{ background: T.bgCard, borderRadius: 10, padding: 16, marginBottom: 8, border: `1px solid ${T.border}` }}><div style={{ fontWeight: 700, color: "#F59E0B", marginBottom: 4, fontFamily: "Outfit" }}>🔶 {a.analogy}</div><div style={{ lineHeight: 1.75 }}>{a.explanation}</div></div>))}</div>}

            {topic.misconceptions && <div style={{ marginBottom: 28 }}><h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, color: T.text, marginBottom: 12 }}>⚠️ {t.misconceptions}</h2>
              {topic.misconceptions.map((m, i) => (<div key={i} style={{ background: "rgba(239,68,68,0.04)", borderRadius: 10, padding: 16, marginBottom: 8, border: "1px solid rgba(239,68,68,0.1)" }}><div style={{ fontWeight: 700, color: "#FCA5A5", marginBottom: 4, fontFamily: "Outfit" }}>❌ {m.myth}</div><div style={{ color: "#6EE7B7", lineHeight: 1.75 }}>✅ {m.reality}</div></div>))}</div>}

            {topic.applications && <div style={{ marginBottom: 28 }}><h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, color: T.text, marginBottom: 12 }}>🌍 {t.realWorld}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{topic.applications.map((a, i) => (<span key={i} style={{ padding: "6px 14px", borderRadius: 18, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.12)", color: "#60A5FA", fontSize: 14, fontWeight: 500 }}>{a}</span>))}</div></div>}

            {topic.glossary && <div style={{ marginBottom: 28 }}><h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, color: T.text, marginBottom: 12 }}>📚 {t.keyTerms}</h2>
              {topic.glossary.map((g, i) => (<div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}` }}><span style={{ fontWeight: 700, color: "#60A5FA", fontFamily: "Outfit" }}>{g.term}</span><span style={{ color: T.textMuted }}> — </span><span style={{ lineHeight: 1.6 }}>{g.def}</span></div>))}</div>}

            {topic.faqs && topic.faqs.length > 0 && <div style={{ marginBottom: 28 }}><h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, color: T.text, marginBottom: 12 }}>❓ Frequently Asked Questions ({topic.faqs.length})</h2>
              <FAQSection faqs={topic.faqs} theme={theme} /></div>}
          </div>}

          {/* ── DIAGRAM MODE ── */}
          {mode === "diagram" && <div>
            <h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, marginBottom: 14 }}>📊 {t.stepByStep}</h2>
            <Flow steps={topic.steps} theme={theme} />
            <h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, marginTop: 28, marginBottom: 14 }}>🔧 {t.keyComponents}</h2>
            <Comps comps={topic.components} theme={theme} />
          </div>}

          {/* ── ANIMATION MODE ── */}
          {mode === "animation" && <div>
            <h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, marginBottom: 14 }}>🎬 {t.interactiveAnim}</h2>
            <div style={{ background: T.bgCard, borderRadius: 14, padding: 18, border: `1px solid ${T.border}`, marginBottom: 20 }}><GetAnim topic={topic} theme={theme} /></div>
            <h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, marginBottom: 14 }}>📋 {t.processSteps}</h2>
            <Flow steps={topic.steps} theme={theme} />
          </div>}

          </div>{/* end topic-content */}

          {/* Quiz */}
          {topic.quiz && <div style={{ marginTop: 36 }} data-noprint><h2 style={{ fontFamily: "Outfit", fontSize: 24, fontWeight: 800, marginBottom: 14 }}>🧪 {t.testYourself}</h2>
            <div style={{ background: T.bgCard, borderRadius: 14, padding: 22, border: `1px solid ${T.border}` }}><Quiz questions={topic.quiz} t={t} theme={theme} /></div></div>}

          {/* Related */}
          {topic.relatedTopics && <div style={{ marginTop: 36 }}><h2 style={{ fontFamily: "Outfit", fontSize: fontSize + 4, fontWeight: 700, marginBottom: 12 }}>🔗 {t.relatedTopics}</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{topic.relatedTopics.map(id => { const tp = TOPICS.find(x => x.id === id); return tp ? (<button key={id} onClick={() => open(id)} style={{ padding: "9px 16px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bgCard, color: T.accent, cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "inherit" }}>{CATEGORIES.find(c => c.id === tp.category)?.icon} {tp.title}</button>) : null; })}</div></div>}
        </div>}

      </main>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "30px 20px", borderTop: `1px solid ${T.border}`, textAlign: "center", color: T.textMuted, fontSize: 14, lineHeight: 1.8 }}>
        <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 18, marginBottom: 6, color: T.textSec }}>⚛ TechVerse</div>
        <p>{t.footerLine}</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
          {[{ l: t.home, p: "home" }, { l: t.exploreTopics, p: "explore" }, { l: t.categories, p: "categories" }, { l: t.learningPaths, p: "paths" }, { l: t.compare, p: "compare" }, { l: t.glossary, p: "glossary" }, { l: t.about, p: "about" }].map(x => (
            <span key={x.l} onClick={() => navTo(x.p)} style={{ cursor: "pointer", color: T.accent, fontSize: 14 }}>{x.l}</span>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 12 }}>© 2026 TechVerse · {TOPICS.length} topics · ~500,000 words · Free forever</p>
      </footer>
    </div>
  );
}
