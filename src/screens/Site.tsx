'use client';
import { useState, useEffect } from 'react';
const logo = '/imports/logo-edukando-new.png';
const logoKitria = '/imports/logo-kitriq.png';
const eduIcon = '/assets/edu-icon.png';
const appScreen1 = '/imports/screen-1.png';
const appScreen2 = '/imports/screen-2.png';
const appScreen3 = '/imports/screen-3.png';
const appScreen4 = '/imports/screen-4.png';
const appScreen5 = '/imports/screen-5.png';
const appScreen6 = '/imports/screen-6.png';
const logoEco = '/imports/logo-edukando-2.png';
const eduChatIcon = '/imports/edu-chat-icon.png';

// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
  blue:     '#1677FF',
  dark:     '#0B1F3A',
  lightBlue:'#EAF3FF',
  white:    '#FFFFFF',
  gray:     '#F5F7FA',
  textSec:  '#667085',
  text:     '#101828',
};

// ── Small helpers ──────────────────────────────────────────────────────────────
function Btn({ label, primary = false, onClick }: { label: string; primary?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: primary ? '13px 28px' : '12px 26px',
      borderRadius: 12,
      border: primary ? 'none' : `1.5px solid ${C.blue}`,
      background: primary ? C.blue : 'transparent',
      color: primary ? 'white' : C.blue,
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 700,
      fontSize: 15,
      cursor: 'pointer',
      transition: 'all 0.18s',
      whiteSpace: 'nowrap',
    }}>{label}</button>
  );
}

function Tag({ label, color = C.blue }: { label: string; color?: string }) {
  return (
    <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 100, background: `${color}18`, color, fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase' }}>
      {label}
    </span>
  );
}

function SectionTitle({ tag, title, sub, center = false }: { tag?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div style={{ maxWidth: 680, margin: center ? '0 auto' : undefined, textAlign: center ? 'center' : undefined, marginBottom: 56 }}>
      {tag && <div style={{ marginBottom: 14 }}><Tag label={tag} /></div>}
      <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 44px)', color: C.dark, margin: '0 0 16px', lineHeight: 1.15 }} dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: C.textSec, margin: 0, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

// ── Mock dashboard SVG ─────────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 32px 80px rgba(22,119,255,0.18), 0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden', border: '1px solid #e8f0fe' }}>
      {/* Window bar */}
      <div style={{ background: '#f5f7fa', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #edf0f7' }}>
        {['#f87171','#fb923c','#4ade80'].map((c,i) => <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, margin: '0 12px', height: 22, background: '#e8ecf2', borderRadius: 6 }} />
      </div>
      {/* Dashboard content */}
      <div style={{ display: 'flex', height: 320 }}>
        {/* Sidebar */}
        <div style={{ width: 52, background: C.dark, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: 16 }}>
          {[C.blue,'#ffffff30','#ffffff30','#ffffff30','#ffffff30'].map((c,i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 8, background: c }} />
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: 16, background: '#f8faff', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['Alunos ativos','1.248',C.blue],['Frequência','94%','#16a34a'],['Inadimplência','4,2%','#f59e0b'],['Mensalidades','R$ 82k',C.blue]].map(([l,v,c]) => (
              <div key={l as string} style={{ flex: 1, background: 'white', borderRadius: 10, padding: '10px 12px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                <p style={{ fontFamily: 'Inter', fontSize: 9, color: '#939393', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 0.5 }}>{l}</p>
                <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 18, color: c as string, margin: 0 }}>{v}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, flex: 1 }}>
            {/* Chart */}
            <div style={{ flex: 2, background: 'white', borderRadius: 10, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 11, color: C.dark, margin: '0 0 10px' }}>Frequência mensal</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
                {[65,80,70,90,85,92,88,95,82,90,87,94].map((h,i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === 11 ? C.blue : `${C.blue}40` }} />
                ))}
              </div>
            </div>
            {/* Activity */}
            <div style={{ flex: 1, background: 'white', borderRadius: 10, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 11, color: C.dark, margin: 0 }}>Agenda hoje</p>
              {['08h — Matemática','10h — Intervalo','13h — Ciências','15h — Reunião'].map(e => (
                <div key={e} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.blue, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter', fontSize: 9, color: C.textSec }}>{e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Phone mockup ───────────────────────────────────────────────────────────────
function PhoneMockup({ children, scale = 1 }: { children: React.ReactNode; scale?: number }) {
  return (
    <div style={{ width: 220 * scale, flexShrink: 0, background: C.dark, borderRadius: 36 * scale, padding: `${10 * scale}px`, boxShadow: '0 24px 60px rgba(11,31,58,0.35)', border: `2px solid rgba(255,255,255,0.1)` }}>
      <div style={{ background: 'white', borderRadius: 28 * scale, overflow: 'hidden', height: 420 * scale }}>
        {/* Notch */}
        <div style={{ height: 28 * scale, background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 80 * scale, height: 10 * scale, borderRadius: 99, background: '#1a2332' }} />
        </div>
        {children}
      </div>
    </div>
  );
}

// ── FAQ Item ───────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #e8f0fe', padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left' }}>
        <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: C.dark }}>{q}</span>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: open ? C.blue : C.lightBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={open ? 'white' : C.blue} strokeWidth="2.5" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </button>
      {open && <p style={{ fontFamily: 'Inter', fontSize: 15, color: C.textSec, margin: '12px 0 0', lineHeight: 1.7 }}>{a}</p>}
    </div>
  );
}

// ── Feature card ───────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div style={{ background: 'white', borderRadius: 20, padding: '28px 24px', boxShadow: '0 2px 16px rgba(22,119,255,0.07)', border: '1px solid #edf2fe', transition: 'box-shadow 0.2s, transform 0.2s' }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: C.lightBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 17, color: C.dark, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontFamily: 'Inter', fontSize: 14, color: C.textSec, margin: 0, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

// ── Carousel photos ────────────────────────────────────────────────────────────
const CAROUSEL_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1786282820056-6a073a261a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
    label: 'Escola',
  },
  {
    url: 'https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
    label: 'Alunos',
  },
  {
    url: 'https://images.unsplash.com/photo-1649029622817-7d2d7acfe7f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
    label: 'Famílias',
  },
  {
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
    label: 'Professores',
  },
];

// ── Main component ─────────────────────────────────────────────────────────────
export default function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeAppScreen, setActiveAppScreen] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<{ from: 'user' | 'edu'; text: string }[]>([
    { from: 'edu', text: 'Olá! Eu sou o Edu 👋 Posso te ajudar com informações sobre o Edukando. Como posso ajudar?' },
  ]);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % CAROUSEL_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const audienceTabs = [
    {
      label: 'Direção', icon: '🏫', color: C.blue, bg: C.lightBlue,
      headline: 'Visão estratégica da sua escola.',
      desc: 'Acompanhe em tempo real os indicadores mais importantes da instituição. Frequência, financeiro, comunicados e desempenho — tudo em um painel intuitivo.',
      features: ['Painel de indicadores (KPIs)','Relatórios financeiros','Gestão de turmas e professores','Comunicados e notificações'],
    },
    {
      label: 'Professores', icon: '👨‍🏫', color: '#16a34a', bg: '#dcfce7',
      headline: 'Organize sua rotina com facilidade.',
      desc: 'Registre presenças, atividades e observações diretamente pelo app. Comunique-se com as famílias e acompanhe o progresso de cada aluno.',
      features: ['Registro de frequência','Diário de aula digital','Comunicação com famílias','Agenda de aulas e eventos'],
    },
    {
      label: 'Famílias', icon: '👨‍👩‍👧', color: '#8b5cf6', bg: '#f3e8ff',
      headline: 'Fique perto mesmo de longe.',
      desc: 'Acesse notas, frequência, agenda escolar e financeiro de forma simples e transparente. Receba comunicados e acompanhe o desenvolvimento do seu filho.',
      features: ['Acompanhamento de notas e frequência','Segunda via e pagamentos','Agenda e calendário escolar','Comunicados em tempo real'],
    },
    {
      label: 'Alunos', icon: '🎒', color: '#f59e0b', bg: '#fef9c3',
      headline: 'Uma escola mais próxima de você.',
      desc: 'Acesse sua agenda, materiais, notas e comunicados de forma rápida e organizada. Uma experiência digital pensada para o dia a dia.',
      features: ['Agenda de aulas e provas','Notas e boletim digital','Eventos e atividades','Comunicação com a escola'],
    },
  ];

  const features = [
    { icon: '📅', title: 'Agenda Digital',       desc: 'Organize aulas, eventos, compromissos e atividades em um só lugar.' },
    { icon: '👥', title: 'Gestão de Alunos',      desc: 'Notas, frequência, professores, boletins e informações acadêmicas.' },
    { icon: '💳', title: 'Financeiro',            desc: 'Cobranças recorrentes, pagamentos, segunda via e acompanhamento.' },
    { icon: '🤝', title: 'CRM Escolar',           desc: 'Centralize relacionamento, comunicação, atendimento e histórico.' },
    { icon: '🤖', title: 'Inteligência Artificial',desc: 'Uma IA personalizada para apoiar a escola e automatizar atendimentos.' },
    { icon: '💬', title: 'Comunicação',           desc: 'Conecte escola, professores e famílias em uma experiência integrada.' },
    { icon: '✅', title: 'Frequência',            desc: 'Acompanhe entrada, saída e frequência dos alunos com precisão.' },
    { icon: '📆', title: 'Calendário Escolar',    desc: 'Eventos, aulas, provas e reuniões em um calendário inteligente.' },
  ];

  const faqItems = [
    { q: 'O que é o Edukando?', a: 'O Edukando é uma plataforma digital completa para gestão e comunicação escolar, conectando direção, professores, alunos e famílias em um único ecossistema.' },
    { q: 'Para quais tipos de escola o Edukando é indicado?', a: 'O Edukando atende escolas particulares, redes de ensino e instituições de diferentes tamanhos, desde pequenas escolas até grandes redes com múltiplas unidades.' },
    { q: 'O Edukando possui aplicativo para famílias?', a: 'Sim! O Edukando oferece um aplicativo completo para famílias, com acesso a notas, frequência, agenda, financeiro, comunicados e muito mais.' },
    { q: 'A escola pode personalizar a plataforma?', a: 'Sim. O Edukando é white label. A escola pode utilizar sua própria logo, cores institucionais, nome e personalizar a comunicação.' },
    { q: 'Como funciona a inteligência artificial Edu?', a: 'O Edu é um assistente de IA personalizado para cada escola. Ele responde dúvidas de famílias, professores e equipe escolar sobre agenda, financeiro, frequência e muito mais.' },
    { q: 'O Edukando possui módulo financeiro?', a: 'Sim. O módulo financeiro inclui cobranças recorrentes e avulsas, controle de pagamentos, segunda via, parcelamentos, notas fiscais e declaração para imposto de renda.' },
    { q: 'É possível integrar o Edukando ao WhatsApp da escola?', a: 'Sim. O Edukando oferece integração com WhatsApp para comunicação, alertas e atendimento automatizado via IA.' },
    { q: 'O Edukando atende redes de ensino com várias unidades?', a: 'Sim. O Edukando oferece uma visão centralizada para gestão de múltiplas unidades, com relatórios consolidados e personalização por escola.' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: C.text, background: 'white', overflowX: 'hidden' }}>

      {/* ── HEADER ───────────────────────────────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #edf0f7', padding: '0 max(24px, 4vw)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', height: 70, gap: 32 }}>
          <img src={logo} alt="Edukando" style={{ height: 48, objectFit: 'contain' }} />
          <nav style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center' }} className="site-nav">
            {['Plataforma','Soluções','Recursos','Para escolas','Para famílias','FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s/g,'-')}`} style={{ fontFamily: 'Outfit', fontWeight: 500, fontSize: 15, color: C.textSec, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.blue)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textSec)}>
                {item}
              </a>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button style={{ padding: '9px 20px', borderRadius: 10, border: `1.5px solid #e8ecf2`, background: 'white', fontFamily: 'Outfit', fontWeight: 600, fontSize: 14, color: C.dark, cursor: 'pointer' }}>Entrar</button>
            <button style={{ padding: '9px 20px', borderRadius: 10, border: 'none', background: C.blue, fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: 'white', cursor: 'pointer', boxShadow: '0 4px 14px rgba(22,119,255,0.3)' }}>Falar com especialista</button>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)', position: 'relative', overflow: 'hidden' }}>
        {/* Carousel background photos */}
        {CAROUSEL_SLIDES.map((slide, i) => (
          <div key={slide.label} style={{ position: 'absolute', inset: 0, backgroundImage: `url(${slide.url})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: i === heroSlide ? 1 : 0, transition: 'opacity 1.2s ease-in-out', zIndex: 0 }} />
        ))}
        {/* Gradient overlay — keeps text readable + brand feel */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(255,255,255,0.97) 0%, rgba(234,243,255,0.92) 45%, rgba(11,31,58,0.55) 100%)', zIndex: 1 }} />
        {/* Slide dots bottom-left */}
        <div style={{ position: 'absolute', bottom: 20, left: 'max(24px,4vw)', display: 'flex', gap: 6, zIndex: 10 }}>
          {CAROUSEL_SLIDES.map((s, i) => (
            <button key={i} onClick={() => setHeroSlide(i)}
              title={s.label}
              style={{ width: i === heroSlide ? 22 : 8, height: 8, borderRadius: 99, border: 'none', background: i === heroSlide ? C.blue : `${C.blue}50`, cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div>
            <div style={{ marginBottom: 20 }}><Tag label="Plataforma escolar completa" /></div>
            <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(36px,4vw,58px)', color: C.dark, margin: '0 0 20px', lineHeight: 1.1 }}>
              Tudo o que a sua escola precisa.<br /><span style={{ color: C.blue }}>Em um só lugar.</span>
            </h1>
            <p style={{ fontFamily: 'Inter', fontSize: 18, color: C.textSec, margin: '0 0 36px', lineHeight: 1.7, maxWidth: 500 }}>
              O Edukando conecta gestão, comunicação, financeiro, aprendizagem e inteligência artificial para tornar a experiência escolar mais simples, eficiente e humana.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Btn label="Conhecer o Edukando" primary />
              <Btn label="Falar com especialista" />
            </div>
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 32, marginTop: 44, paddingTop: 32, borderTop: '1px solid #e8f0fe' }}>
              {[['500+','Escolas'],['120k+','Alunos'],['4.9★','App Store']].map(([v,l]) => (
                <div key={l}>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 24, color: C.dark, margin: 0 }}>{v}</p>
                  <p style={{ fontFamily: 'Inter', fontSize: 13, color: C.textSec, margin: '2px 0 0' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Dashboard mockup */}
          <div style={{ position: 'relative' }}>
            <DashboardMockup />
            {/* Floating badges */}
            {[
              { label: '👨‍🏫 Professor', top: '8%', left: '-18%' },
              { label: '🏫 Diretor', top: '-6%', right: '10%' },
              { label: '👨‍👩‍👧 Família', bottom: '10%', left: '-16%' },
              { label: '🤖 Edu IA', bottom: '4%', right: '-8%' },
            ].map(({ label, ...pos }) => (
              <div key={label} style={{ position: 'absolute', ...pos, background: 'white', borderRadius: 12, padding: '8px 14px', boxShadow: '0 6px 24px rgba(22,119,255,0.14)', fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: C.dark, whiteSpace: 'nowrap', border: `1px solid ${C.lightBlue}` }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGOS BAND ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '28px max(24px,4vw)', background: C.gray, borderTop: '1px solid #edf0f7', borderBottom: '1px solid #edf0f7' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: C.textSec, margin: 0, flexShrink: 0 }}>Confiado por escolas em todo o Brasil</p>
          {['Colégio São Paulo','Escola Nova Era','Instituto Educar','Rede Saber','Colégio Futuro'].map(name => (
            <span key={name} style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: '#b0b8c8' }}>{name}</span>
          ))}
        </div>
      </section>

      {/* ── POSITIONING ──────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle center tag="Ecossistema" title="Uma plataforma. Toda a comunidade escolar <span style='color:#1677FF'>conectada.</span>"
            sub="O Edukando reúne em um único ecossistema as principais ferramentas utilizadas diariamente pela escola, reduzindo a complexidade operacional e aproximando gestão, professores, famílias e alunos." />
          {/* Connection diagram */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              {['Escola','Direção','Professores','Alunos','Famílias'].map((n, i) => (
                <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  {i > 0 && <div style={{ width: 2, height: 20, background: `${C.blue}40` }} />}
                  <div style={{ background: i === 0 ? C.blue : 'white', color: i === 0 ? 'white' : C.dark, borderRadius: 14, padding: '10px 24px', fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, border: `1.5px solid ${i === 0 ? C.blue : '#edf0f7'}`, boxShadow: '0 2px 12px rgba(22,119,255,0.1)' }}>{n}</div>
                </div>
              ))}
            </div>
            <div style={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={`${C.blue}60`} strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.blue})`, borderRadius: 24, padding: '32px 36px', textAlign: 'center', boxShadow: '0 16px 48px rgba(22,119,255,0.28)' }}>
              <img src={logo} alt="Edukando" style={{ height: 40, filter: 'brightness(0) invert(1)', marginBottom: 8 }} />
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Conectando todos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUDIENCE ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)', background: C.gray }} id="soluções">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle center tag="Feito para toda a escola" title="Uma plataforma para <span style='color:#1677FF'>cada perfil.</span>"
            sub="Do diretor ao aluno, cada pessoa tem exatamente o que precisa para o seu dia a dia." />

          {/* Tab selector */}
          <div style={{ display: 'flex', gap: 4, background: 'white', borderRadius: 16, padding: 6, maxWidth: 520, margin: '0 auto 52px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            {audienceTabs.map((t, i) => (
              <button key={t.label} onClick={() => setActiveTab(i)}
                style={{ flex: 1, padding: '10px 8px', borderRadius: 11, border: 'none', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, transition: 'all 0.22s',
                  background: activeTab === i ? t.color : 'transparent',
                  color: activeTab === i ? 'white' : C.textSec,
                  boxShadow: activeTab === i ? `0 4px 14px ${t.color}40` : 'none' }}>
                <span style={{ display: 'block', fontSize: 18, marginBottom: 2 }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Active card — full width split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: 'white', borderRadius: 28, overflow: 'hidden', boxShadow: '0 12px 60px rgba(22,119,255,0.1)', border: '1px solid #edf0f7' }}>
            {/* Left — content */}
            <div style={{ padding: 'clamp(32px,4vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: audienceTabs[activeTab].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 24 }}>
                {audienceTabs[activeTab].icon}
              </div>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(22px,2.5vw,32px)', color: C.dark, margin: '0 0 14px', lineHeight: 1.2 }}>
                {audienceTabs[activeTab].headline}
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: C.textSec, margin: '0 0 28px', lineHeight: 1.75 }}>
                {audienceTabs[activeTab].desc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {audienceTabs[activeTab].features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: audienceTabs[activeTab].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={audienceTabs[activeTab].color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: 14, color: C.text }}>{f}</span>
                  </div>
                ))}
              </div>
              <button style={{ marginTop: 32, alignSelf: 'flex-start', padding: '12px 24px', borderRadius: 12, border: 'none', background: audienceTabs[activeTab].color, color: 'white', fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: `0 4px 16px ${audienceTabs[activeTab].color}40` }}>
                Saiba mais →
              </button>
            </div>
            {/* Right — visual */}
            <div style={{ background: audienceTabs[activeTab].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative', overflow: 'hidden', minHeight: 400 }}>
              {/* Decorative rings */}
              <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', border: `2px solid ${audienceTabs[activeTab].color}20` }} />
              <div style={{ position: 'absolute', bottom: -80, left: -40, width: 220, height: 220, borderRadius: '50%', border: `2px solid ${audienceTabs[activeTab].color}15` }} />
              {/* Central icon */}
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ width: 120, height: 120, borderRadius: 36, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, margin: '0 auto 20px', boxShadow: `0 16px 48px ${audienceTabs[activeTab].color}25` }}>
                  {audienceTabs[activeTab].icon}
                </div>
                <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, color: audienceTabs[activeTab].color, margin: 0 }}>{audienceTabs[activeTab].label}</p>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: C.textSec, margin: '6px 0 0' }}>Edukando</p>
                {/* Feature pills floating */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 24, maxWidth: 260 }}>
                  {audienceTabs[activeTab].features.map(f => (
                    <span key={f} style={{ padding: '5px 12px', borderRadius: 100, background: 'white', fontFamily: 'Outfit', fontWeight: 600, fontSize: 11, color: audienceTabs[activeTab].color, boxShadow: `0 2px 8px ${audienceTabs[activeTab].color}20`, border: `1px solid ${audienceTabs[activeTab].color}20` }}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)' }} id="plataforma">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle center tag="Funcionalidades" title="Tudo conectado. <span style='color:#1677FF'>Tudo mais simples.</span>" sub="Cada módulo foi projetado para simplificar a rotina de quem trabalha na escola e de quem ama alguém nela." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── EDU AI SECTION ────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)', background: C.dark, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${C.blue}30 0%, transparent 70%)` }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ marginBottom: 16 }}><Tag label="Inteligência Artificial" color="#818cf8" /></div>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(28px,3vw,44px)', color: 'white', margin: '0 0 16px', lineHeight: 1.15 }}>Conheça o <span style={{ color: C.blue }}>Edu.</span></h2>
            <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'rgba(255,255,255,0.7)', margin: '0 0 24px', lineHeight: 1.7 }}>
              A inteligência artificial que entende a rotina da sua escola. O Edu é um assistente inteligente personalizado para cada instituição.
            </p>
            <div style={{ background: 'white', borderRadius: 16, padding: '14px 20px', marginBottom: 20, display: 'inline-block' }}>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: C.dark, margin: 0 }}>"Mais respostas. Menos burocracia."</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {['Financeiro','Agenda','Frequência','Eventos','Comunicados','Acadêmico'].map(t => (
                <span key={t} style={{ padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.1)', fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{t}</span>
              ))}
            </div>
          </div>
          {/* Chat mockup */}
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 24, padding: 24, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={eduIcon} alt="Edu" style={{ width: 40, height: 40, objectFit: 'contain' }} />
              <div>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: 'white', margin: 0 }}>Edu</p>
                <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#4ade80', margin: 0 }}>● Online</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ alignSelf: 'flex-end', background: C.blue, borderRadius: '16px 16px 4px 16px', padding: '12px 16px', maxWidth: '80%' }}>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'white', margin: 0 }}>Qual é a data da próxima reunião de pais?</p>
              </div>
              <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.12)', borderRadius: '16px 16px 16px 4px', padding: '12px 16px', maxWidth: '85%' }}>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'white', margin: '0 0 6px' }}>A próxima reunião de pais está marcada para <strong>quinta-feira, às 18h30</strong>. Deseja adicionar um lembrete?</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  {['Sim, adicionar','Ver agenda'].map(b => (
                    <button key={b} style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${C.blue}`, background: 'transparent', color: C.blue, fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>{b}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINANCIAL SECTION ────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Financial dashboard mockup */}
          <div style={{ background: C.gray, borderRadius: 24, padding: 24 }}>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: C.textSec, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.8 }}>Painel Financeiro</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              {[['Receita mensal','R$ 82.400','#16a34a'],['Inadimplência','R$ 3.600','#dc2626'],['Pendentes','12','#f59e0b'],['NF emitidas','47','#2a68b4']].map(([l,v,c]) => (
                <div key={l as string} style={{ background: 'white', borderRadius: 14, padding: '14px 16px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
                  <p style={{ fontFamily: 'Inter', fontSize: 11, color: C.textSec, margin: '0 0 4px' }}>{l}</p>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: c as string, margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>
            {/* Family app card */}
            <div style={{ background: `linear-gradient(135deg,#1a4a8a,${C.blue})`, borderRadius: 16, padding: '16px', color: 'white' }}>
              <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: '0 0 2px' }}>Mensalidade Outubro/2026</p>
              <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, margin: '0 0 12px' }}>R$ 1.250,00</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Pagar agora','Baixar boleto','Nota fiscal'].map(b => (
                  <button key={b} style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.12)', fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, color: 'white', cursor: 'pointer' }}>{b}</button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <SectionTitle tag="Financeiro" title="Um financeiro mais simples para a escola <span style='color:#1677FF'>e para as famílias.</span>" sub="Do controle de mensalidades às notas fiscais e declaração de imposto de renda, tudo em um só lugar." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Cobranças recorrentes e avulsas','Controle de pagamentos em tempo real','Segunda via automática','Parcelamentos e negociações','Notas fiscais integradas','Declaração para Imposto de Renda'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: C.lightBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 15, color: C.text }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AGENDA / TIMELINE ─────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)', background: C.lightBlue }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <SectionTitle tag="Agenda & Rotina" title="Da entrada à saída, <span style='color:#1677FF'>tudo acompanhado.</span>" sub="Informação registrada no momento certo. Família informada com mais clareza." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative', paddingLeft: 20 }}>
              <div style={{ position: 'absolute', left: 7, top: 12, bottom: 12, width: 2, background: `${C.blue}30` }} />
              {[['07:32','Entrada do aluno','#16a34a'],['08:10','Aula de Matemática','#2a68b4'],['10:00','Lanche','#f59e0b'],['12:00','Almoço','#f59e0b'],['13:30','Educação Física','#22c55e'],['16:45','Saída',C.blue]].map(([t,l,c]) => (
                <div key={t as string} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', position: 'relative' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: c as string, border: '2px solid white', boxShadow: `0 0 0 2px ${(c as string)}40`, flexShrink: 0, marginLeft: -7 }} />
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: C.textSec, width: 36, flexShrink: 0 }}>{t}</span>
                  <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, color: C.dark }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 24, padding: 24, boxShadow: '0 8px 40px rgba(22,119,255,0.1)' }}>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: C.dark, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.8 }}>Registros do professor</p>
            {[['🍽️','Alimentação','Comeu bem, sem recusas'],['⭐','Participação','Excelente — 5 estrelas'],['🧠','Atenção','Muito concentrado'],['📝','Atividade','Completou todos exercícios'],['💬','Observação','Demonstrou liderança no grupo']].map(([icon,l,v]) => (
              <div key={l as string} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #f0f4fa' }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <div>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: C.dark, margin: 0 }}>{l}</p>
                  <p style={{ fontFamily: 'Inter', fontSize: 12, color: C.textSec, margin: '1px 0 0' }}>{v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP FAMÍLIA ───────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)', overflow: 'hidden', position: 'relative' }} id="para-famílias">
        {/* Carousel background */}
        {CAROUSEL_SLIDES.map((slide, i) => (
          <div key={slide.label} style={{ position: 'absolute', inset: 0, backgroundImage: `url(${slide.url})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: i === heroSlide ? 1 : 0, transition: 'opacity 1.4s ease-in-out', zIndex: 0 }} />
        ))}
        {/* Dark overlay — ensures content legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,31,58,0.93) 0%, rgba(11,31,58,0.82) 50%, rgba(22,119,255,0.28) 100%)', zIndex: 1, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ marginBottom: 14 }}><Tag label="Aplicativo" color="#818cf8" /></div>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(28px,3.5vw,48px)', color: 'white', margin: '0 0 16px', lineHeight: 1.1 }}>
              A escola na palma <span style={{ color: C.blue }}>da mão.</span>
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'rgba(255,255,255,0.62)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              Um app completo para famílias acompanharem tudo em tempo real — notas, frequência, financeiro, agenda e comunicados.
            </p>
          </div>

          {/* Main layout: features left | phone center | thumbnails right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 48, alignItems: 'center' }}>

            {/* Left — interactive feature list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: '🏠', label: 'Home', desc: 'Resumo completo da vida escolar do seu filho.', screen: appScreen1 },
                { icon: '📅', label: 'Agenda', desc: 'Aulas, eventos e atividades organizados por dia.', screen: appScreen2 },
                { icon: '💳', label: 'Financeiro', desc: 'Mensalidades, boletos e pagamentos online.', screen: appScreen3 },
                { icon: '✅', label: 'Frequência', desc: 'Entrada, saída e presença em tempo real.', screen: appScreen4 },
                { icon: '📊', label: 'Notas', desc: 'Boletim digital sempre atualizado.', screen: appScreen5 },
                { icon: '💬', label: 'Comunicação', desc: 'Comunicados e mensagens da escola.', screen: appScreen6 },
              ].map((item, i) => {
                const isActive = activeAppScreen === i;
                return (
                  <button key={item.label} onClick={() => setActiveAppScreen(i)}
                    style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px', borderRadius: 16, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                      background: isActive ? `${C.blue}22` : 'rgba(255,255,255,0.04)',
                      boxShadow: isActive ? `inset 0 0 0 1px ${C.blue}60` : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                    }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: isActive ? C.blue : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, transition: 'background 0.2s' }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: isActive ? 'white' : 'rgba(255,255,255,0.7)', margin: 0, transition: 'color 0.2s' }}>{item.label}</p>
                      <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', lineHeight: 1.4 }}>{item.desc}</p>
                    </div>
                    {isActive && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Center — phone with live screenshot */}
            <div style={{ flexShrink: 0, position: 'relative' }}>
              {/* Glow behind phone */}
              <div style={{ position: 'absolute', inset: -24, borderRadius: '50%', background: `radial-gradient(circle, ${C.blue}35 0%, transparent 70%)`, filter: 'blur(24px)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', background: C.dark, borderRadius: 48, padding: 10, boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)', width: 260 }}>
                {/* Side buttons */}
                <div style={{ position: 'absolute', left: -3, top: 80, width: 3, height: 32, background: 'rgba(255,255,255,0.15)', borderRadius: '3px 0 0 3px' }} />
                <div style={{ position: 'absolute', left: -3, top: 124, width: 3, height: 52, background: 'rgba(255,255,255,0.15)', borderRadius: '3px 0 0 3px' }} />
                <div style={{ position: 'absolute', left: -3, top: 184, width: 3, height: 52, background: 'rgba(255,255,255,0.15)', borderRadius: '3px 0 0 3px' }} />
                <div style={{ position: 'absolute', right: -3, top: 140, width: 3, height: 68, background: 'rgba(255,255,255,0.15)', borderRadius: '0 3px 3px 0' }} />
                {/* Screen */}
                <div style={{ borderRadius: 40, overflow: 'hidden', background: '#f5f7fb' }}>
                  {/* Dynamic island */}
                  <div style={{ height: 30, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 90, height: 16, borderRadius: 99, background: '#111' }} />
                  </div>
                  {/* Screenshot with crossfade */}
                  <div style={{ position: 'relative', height: 460, overflow: 'hidden' }}>
                    {[appScreen1, appScreen2, appScreen3, appScreen4, appScreen5, appScreen6].map((src, i) => (
                      <img key={i} src={src} alt={`Tela ${i + 1}`}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: activeAppScreen === i ? 1 : 0, transition: 'opacity 0.4s ease' }} />
                    ))}
                  </div>
                  {/* Home bar */}
                  <div style={{ height: 20, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 80, height: 4, borderRadius: 99, background: '#1a2332' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right — thumbnail strip */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
              {[appScreen1, appScreen2, appScreen3, appScreen4, appScreen5, appScreen6].map((src, i) => {
                const isActive = activeAppScreen === i;
                return (
                  <button key={i} onClick={() => setActiveAppScreen(i)}
                    style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s', opacity: isActive ? 1 : 0.45 }}>
                    <div style={{ width: isActive ? 3 : 2, height: 52, borderRadius: 99, background: isActive ? C.blue : 'rgba(255,255,255,0.2)', transition: 'all 0.2s', flexShrink: 0 }} />
                    <div style={{ width: 52, height: 52, borderRadius: 14, overflow: 'hidden', border: isActive ? `2px solid ${C.blue}` : '2px solid rgba(255,255,255,0.1)', transition: 'all 0.2s', flexShrink: 0, boxShadow: isActive ? `0 4px 16px ${C.blue}50` : 'none' }}>
                      <img src={src} alt={`Thumb ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', marginTop: 56, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ padding: '14px 28px', borderRadius: 12, border: 'none', background: C.blue, fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: 'white', cursor: 'pointer', boxShadow: '0 8px 28px rgba(22,119,255,0.5)' }}>
              Baixar o app
            </button>
            <button style={{ padding: '14px 28px', borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.2)', background: 'transparent', fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.8)', cursor: 'pointer' }}>
              Ver todas as funcionalidades
            </button>
          </div>
        </div>

      </section>

      {/* ── MÓDULOS ECOSYSTEM ────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,120px) max(24px,4vw)', background: C.dark, overflow: 'hidden', position: 'relative' }}>
        {/* Background glow blobs */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.blue}18 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, #6366f120 0%, transparent 65%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <SectionTitle center tag="Ecossistema" title="<span style='color:white'>Uma plataforma,</span> <span style='color:#1677FF'>diferentes possibilidades.</span>"
            sub="Todos os módulos conectados em torno de um único núcleo inteligente." />

          {/* Orbit diagram */}
          <div style={{ position: 'relative', width: 560, height: 560, margin: '0 auto' }}>

            {/* Outer orbit ring (rotating) */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px dashed rgba(22,119,255,0.18)`, animation: 'orbit-slow 40s linear infinite' }} />
            {/* Inner orbit ring (counter-rotating) */}
            <div style={{ position: 'absolute', inset: 60, borderRadius: '50%', border: `1px dashed rgba(255,255,255,0.08)`, animation: 'orbit-counter 28s linear infinite' }} />

            {/* Connector lines SVG */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 560 560">
              {[
                ['Gestão','Financeiro','CRM','Agenda','Comunicação','IA','Frequência','Acadêmico','APP','Relacionamento'],
              ][0].map((_, i) => {
                const total = 10;
                const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
                const r = 220;
                const x = Math.cos(angle) * r + 280;
                const y = Math.sin(angle) * r + 280;
                return (
                  <line key={i} x1="280" y1="280" x2={x} y2={y}
                    stroke={C.blue} strokeWidth="1" strokeDasharray="300" strokeDashoffset="0"
                    style={{ opacity: 0.2, animation: `line-draw 0.6s ease ${i * 0.08}s both` }} />
                );
              })}
            </svg>

            {/* Center logo node */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 140, height: 140, borderRadius: '50%', background: `linear-gradient(135deg, #0d2a5e, ${C.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, animation: 'eco-pulse 3s ease-in-out infinite', border: '2px solid rgba(255,255,255,0.15)' }}>
              <img src={logoEco} alt="Edukando" style={{ width: 124, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>

            {/* Module nodes orbiting */}
            {[
              { label: 'Gestão',       icon: '🏫' },
              { label: 'Financeiro',   icon: '💳' },
              { label: 'CRM',          icon: '🤝' },
              { label: 'Agenda',       icon: '📅' },
              { label: 'Comunicação',  icon: '💬' },
              { label: 'IA Edu',       icon: '🤖' },
              { label: 'Frequência',   icon: '✅' },
              { label: 'Acadêmico',    icon: '📊' },
              { label: 'APP',          icon: '📱' },
              { label: 'Relacionamento', icon: '👥' },
            ].map((mod, i) => {
              const total = 10;
              const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
              const r = 220;
              const cx = Math.cos(angle) * r + 280;
              const cy = Math.sin(angle) * r + 280;
              const delay = `${i * 0.07}s`;
              return (
                <div key={mod.label} style={{ position: 'absolute', left: cx - 44, top: cy - 24, zIndex: 5, animation: `eco-node-in 0.5s ease ${delay} both, eco-float ${3 + (i % 3) * 0.8}s ease-in-out ${i * 0.3}s infinite` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 14, padding: '7px 12px', backdropFilter: 'blur(8px)', cursor: 'default', transition: 'background 0.2s, transform 0.2s', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${C.blue}40`; (e.currentTarget as HTMLElement).style.border = `1px solid ${C.blue}80`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.14)'; }}>
                    <span style={{ fontSize: 14 }}>{mod.icon}</span>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, color: 'white' }}>{mod.label}</span>
                  </div>
                  {/* Dot at orbit point */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 6, height: 6, borderRadius: '50%', background: C.blue, boxShadow: `0 0 8px ${C.blue}`, zIndex: -1 }} />
                </div>
              );
            })}
          </div>

          {/* Bottom stats */}
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
            {[['10+','Módulos integrados'],['1 plataforma','Tudo em um só lugar'],['100%','Conectado']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: '20px 32px', background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 28, color: C.blue, margin: 0 }}>{v}</p>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHITE LABEL ───────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <SectionTitle tag="White Label" title="A tecnologia do Edukando com a <span style='color:#1677FF'>identidade da sua escola.</span>"
              sub="Uma experiência digital que parece feita para a sua escola. Porque é." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['Logo da escola','Cores institucionais','Nome da instituição','Comunicação personalizada','Aplicativo próprio','Portal personalizado'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: C.lightBlue, borderRadius: 12 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontFamily: 'Inter', fontSize: 13, color: C.dark, fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            {[['#1677FF','Edukando'],['#16a34a','Colégio Verde'],['#8b5cf6','Escola Élite']].map(([color, name]) => (
              <div key={name as string} style={{ flex: 1, background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', border: '1px solid #edf0f7' }}>
                <div style={{ background: `linear-gradient(135deg, ${color}cc, ${color})`, padding: '16px 14px' }}>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 13, color: 'white', margin: 0 }}>{name}</p>
                </div>
                <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[1,2,3].map(i => <div key={i} style={{ height: 8, background: '#f0f4fa', borderRadius: 4, width: `${80 - i * 15}%` }} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)', background: C.gray }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionTitle center tag="Benefícios" title="Por que escolher o <span style='color:#1677FF'>Edukando?</span>" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[['01','Mais organização','Processos centralizados e sem papel.'],['02','Mais comunicação','Escola e família sempre conectadas.'],['03','Mais eficiência','Automação que libera tempo.'],['04','Mais transparência','Informação clara para todos os perfis.'],['05','Mais inteligência','Dados e IA a favor da escola.'],['06','Mais conexão','Uma comunidade escolar unida.']].map(([n,t,d]) => (
              <div key={n as string} style={{ background: 'white', borderRadius: 20, padding: '24px 20px', boxShadow: '0 2px 12px rgba(22,119,255,0.06)', border: '1px solid #edf2fe' }}>
                <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 32, color: `${C.blue}20` }}>{n}</span>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: C.dark, margin: '8px 0 6px' }}>{t}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: C.textSec, margin: 0, lineHeight: 1.5 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)', background: `linear-gradient(135deg, ${C.dark} 0%, #0d3070 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${C.blue}35 0%, transparent 70%)` }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <img src={eduIcon} alt="Edu" style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 20 }} />
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(28px,4vw,48px)', color: 'white', margin: '0 0 16px', lineHeight: 1.15 }}>
            Pronto para transformar a experiência da sua escola?
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'rgba(255,255,255,0.72)', margin: '0 0 36px', lineHeight: 1.7 }}>
            Descubra como o Edukando pode conectar sua escola, simplificar sua gestão e aproximar toda a comunidade escolar.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ padding: '16px 36px', borderRadius: 14, border: 'none', background: C.blue, fontFamily: 'Outfit', fontWeight: 800, fontSize: 16, color: 'white', cursor: 'pointer', boxShadow: '0 8px 28px rgba(22,119,255,0.5)' }}>Falar com especialista</button>
            <button style={{ padding: '16px 36px', borderRadius: 14, border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)', fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: 'white', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>Conhecer a plataforma</button>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) max(24px,4vw)' }} id="faq">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionTitle center tag="FAQ" title="Perguntas <span style='color:#1677FF'>frequentes.</span>" />
          {faqItems.map(item => <FaqItem key={item.q} {...item} />)}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ background: C.dark, padding: 'clamp(48px,6vw,72px) max(24px,4vw) 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
            <div>
              <img src={logo} alt="Edukando" style={{ height: 36, filter: 'brightness(0) invert(1)', marginBottom: 16, objectFit: 'contain' }} />
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: '0 0 20px', lineHeight: 1.7, maxWidth: 260 }}>Tecnologia que conecta toda a escola.</p>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Instagram','LinkedIn'].map(s => (
                  <a key={s} href="#" style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{s}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Plataforma', links: ['Gestão escolar','Agenda','Financeiro','CRM','IA Edu','Comunicação','Frequência'] },
              { title: 'Soluções', links: ['Escolas','Redes de ensino','Famílias','Professores'] },
              { title: 'Empresa', links: ['Sobre o Edukando','Kitria','Contato'] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.9)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.8 }}>{col.title}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(l => <a key={l} href="#" style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>{l}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: 0 }}>© 2026 Edukando. Todos os direitos reservados.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Powered by</span>
              <img src={logoKitria} alt="Kitria" style={{ height: 18, opacity: 0.4, filter: 'brightness(10)' }} />
            </div>
          </div>
        </div>
      </footer>

      {/* ── EDU CHAT WIDGET ──────────────────────────────────────────────────── */}
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>

        {/* Chat panel */}
        {chatOpen && (
          <div style={{ width: 340, background: 'white', borderRadius: 24, boxShadow: '0 24px 80px rgba(11,31,58,0.22), 0 4px 24px rgba(22,119,255,0.12)', border: '1px solid #e8f0fe', overflow: 'hidden', animation: 'eco-node-in 0.25s ease both' }}>
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, #0d2a5e, ${C.blue})`, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }}>
                <img src={eduChatIcon} alt="Edu" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 15, color: 'white', margin: 0 }}>Edu</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', animation: 'dot-pulse 2s ease-in-out infinite' }} />
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Online agora</span>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Messages */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 280, overflowY: 'auto', background: '#f8faff' }}>
              {chatHistory.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
                  {msg.from === 'edu' && (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `1.5px solid ${C.lightBlue}` }}>
                      <img src={eduChatIcon} alt="Edu" style={{ width: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  )}
                  <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.from === 'user' ? C.blue : 'white', color: msg.from === 'user' ? 'white' : C.text, fontFamily: 'Inter', fontSize: 13, lineHeight: 1.55, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', border: msg.from === 'edu' ? '1px solid #edf0f7' : 'none' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div style={{ padding: '0 14px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['O que é o Edukando?','Quero uma demo','Como funciona o Edu?'].map(q => (
                <button key={q} onClick={() => {
                  setChatHistory(h => [...h, { from: 'user', text: q }, { from: 'edu', text: 'Obrigado pela pergunta! Um de nossos especialistas vai entrar em contato em breve. 😊' }]);
                }} style={{ padding: '5px 12px', borderRadius: 100, border: `1px solid ${C.blue}30`, background: C.lightBlue, fontFamily: 'Outfit', fontWeight: 600, fontSize: 11, color: C.blue, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 8, borderTop: '1px solid #edf0f7' }}>
              <input value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && chatMsg.trim()) {
                    setChatHistory(h => [...h, { from: 'user', text: chatMsg }, { from: 'edu', text: 'Entendido! Vou passar sua mensagem para nossa equipe. Em breve alguém entrará em contato. 👍' }]);
                    setChatMsg('');
                  }
                }}
                placeholder="Escreva uma mensagem..."
                style={{ flex: 1, padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e8ecf2', fontFamily: 'Inter', fontSize: 13, outline: 'none', background: '#f8faff' }} />
              <button onClick={() => {
                if (!chatMsg.trim()) return;
                setChatHistory(h => [...h, { from: 'user', text: chatMsg }, { from: 'edu', text: 'Entendido! Vou passar sua mensagem para nossa equipe. Em breve alguém entrará em contato. 👍' }]);
                setChatMsg('');
              }} style={{ width: 40, height: 40, borderRadius: 12, border: 'none', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 12px rgba(22,119,255,0.35)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* Bubble teaser (visible when closed) */}
        {!chatOpen && (
          <div style={{ background: 'white', borderRadius: '16px 16px 4px 16px', padding: '10px 16px', boxShadow: '0 8px 32px rgba(11,31,58,0.14)', border: `1.5px solid ${C.lightBlue}`, animation: 'eco-float 3s ease-in-out infinite', maxWidth: 200 }}>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: C.dark, margin: 0 }}>Posso te ajudar? 👋</p>
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: C.textSec, margin: '2px 0 0' }}>Fala com o Edu agora!</p>
          </div>
        )}

        {/* FAB button */}
        <button onClick={() => setChatOpen(o => !o)}
          style={{ width: 64, height: 64, borderRadius: '50%', border: 'none', background: `linear-gradient(135deg, #0d2a5e, ${C.blue})`, cursor: 'pointer', padding: 0, overflow: 'hidden', boxShadow: '0 8px 32px rgba(22,119,255,0.45), 0 2px 8px rgba(0,0,0,0.15)', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}>
          <img src={eduChatIcon} alt="Edu" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
          {/* Online dot */}
          <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: '#4ade80', border: '2.5px solid white', animation: 'dot-pulse 2s ease-in-out infinite' }} />
        </button>
      </div>
    </div>
  );
}
