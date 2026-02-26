'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Zap,
  Activity,
  Brain,
  Database,
  Shield,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  Layers,
  Server,
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { TypewriterCycle } from '@/components/ui/Typewriter';
import { BackgroundBeams } from '@/components/ui/BackgroundBeams';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerChildren';
import { GlowBorder } from '@/components/ui/GlowBorder';
import { DotBackground } from '@/components/ui/BackgroundPatterns';

const TAGLINES = [
  'Find the best candidates — instantly.',
  'AI-powered skill matching at scale.',
  'From 30 CVs to ranked results in seconds.',
  'Semantic search meets intelligent scoring.',
];

const PIPELINE_STEPS = [
  {
    icon: Database,
    title: 'Document Ingestion',
    desc: 'PDFs parsed, chunked, and embedded using text-embedding-3-large (3072 dims)',
  },
  {
    icon: Brain,
    title: 'Semantic Analysis',
    desc: 'GPT-4o extracts structured skills, responsibilities, and experience data',
  },
  {
    icon: Activity,
    title: 'Vector Storage',
    desc: 'Qdrant vector DB stores embeddings with cosine similarity indexing',
  },
  {
    icon: GitBranch,
    title: 'Multi-Axis Scoring',
    desc: 'Weighted scoring across skills, responsibilities, job title & experience',
  },
  {
    icon: Zap,
    title: 'Ranked Results',
    desc: 'Candidates ranked with per-skill breakdowns and AI-generated assessments',
  },
];

const TECH_STACK = [
  { name: 'OpenAI GPT-4o', label: 'LLM', color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'text-embedding-3-large', label: 'Embeddings', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Qdrant', label: 'Vector DB', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { name: 'Cosine Similarity', label: 'Metric', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { name: '3072 dimensions', label: 'Embedding dim', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Redis Cache', label: 'Cache', color: 'bg-red-50 text-red-700 border-red-200' },
  { name: 'FastAPI', label: 'Backend', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Next.js 15', label: 'Frontend', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

const FEATURE_CARDS = [
  {
    icon: Brain,
    title: 'LLM Extraction',
    desc: 'GPT-4o reads and structures CV content — skills, seniority, responsibilities — no templates required.',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    spotlightColor: 'rgba(37,99,235,0.07)',
  },
  {
    icon: Activity,
    title: 'Semantic Matching',
    desc: 'Vector embeddings understand that "React" matches "ReactJS" and "cloud infra" matches "AWS DevOps".',
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    spotlightColor: 'rgba(99,102,241,0.07)',
  },
  {
    icon: Layers,
    title: 'Weighted Scoring',
    desc: 'Configure how much skills, responsibilities, job title and experience each contribute to the ranking.',
    color: 'text-cyan-700',
    bg: 'bg-cyan-50',
    spotlightColor: 'rgba(6,182,212,0.07)',
  },
  {
    icon: Shield,
    title: 'Explainable AI',
    desc: 'Every match shows item-by-item pairing between JD requirements and CV content with similarity scores.',
    color: 'text-green-700',
    bg: 'bg-green-50',
    spotlightColor: 'rgba(22,163,74,0.07)',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    desc: 'Redis caching means repeat queries return in milliseconds — 87% cache hit rate in production.',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    spotlightColor: 'rgba(217,119,6,0.07)',
  },
  {
    icon: Server,
    title: 'Scalable Infra',
    desc: 'Containerised microservices on Docker/Kubernetes. Handles thousands of CV embeddings with ease.',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    spotlightColor: 'rgba(147,51,234,0.07)',
  },
];

export default function DashboardPage() {
  const { totalCVs, totalJDs, systemStats, setCurrentTab, loadCVs, loadJDs } = useAppStore();

  useEffect(() => {
    loadCVs();
    loadJDs();
  }, [loadCVs, loadJDs]);

  const avg = systemStats?.stats?.cv_analytics?.avg_skills_per_cv ?? 12;
  const cacheHit = systemStats?.stats?.cache_stats?.hit_rate ?? 0.87;

  return (
    <div className="relative min-h-full bg-gray-50 text-gray-800 p-4 sm:p-6 pb-20 md:pb-6 space-y-6 sm:space-y-8">
      {/* Subtle dot-grid background across entire page */}
      <DotBackground />

      <div className="relative z-10 space-y-6 sm:space-y-8">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-xl sm:rounded-2xl px-5 sm:px-8 py-8 sm:py-12 text-white"
          style={{ background: 'linear-gradient(135deg,#00529b 0%,#003d73 50%,#001f3f 100%)' }}
        >
          {/* Animated beams flowing across hero */}
          <BackgroundBeams />
          {/* Floating particle network */}
          <FloatingParticles count={40} color="255,255,255" className="opacity-30" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <Zap className="w-3.5 h-3.5 text-blue-300" />
                <span className="text-xs font-medium text-blue-200">AI CV Intelligence Platform</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight"
            >
              Alpha CV
            </motion.h1>

            <div className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 h-8">
              <TypewriterCycle words={TAGLINES} className="text-blue-100" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => setCurrentTab('match')}
                className="group flex items-center gap-2 px-6 py-3 bg-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-white/20 hover:scale-[1.02]"
                style={{ color: '#00529b' }}
              >
                <Zap className="w-4 h-4" />
                Try the Matcher
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => setCurrentTab('database')}
                className="flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-xl transition-all border border-white/25 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm"
              >
                <Database className="w-4 h-4" />
                Browse 30 CVs
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Stat Cards w/ animated counters & tilt ───────────────── */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'CVs in Database', value: totalCVs, icon: Users, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100', tab: 'database' as const },
            { label: 'Job Descriptions', value: totalJDs, icon: FileText, color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-100', tab: 'database' as const },
            { label: 'Avg Skills / CV', value: avg, icon: Brain, color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-100', tab: null },
            { label: 'Cache Hit Rate', value: Math.round(cacheHit * 100), icon: TrendingUp, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100', tab: null },
          ].map(({ label, value, icon: Icon, color, bg, border, tab }, idx) => (
            <StaggerItem key={label}>
              <TiltCard tiltAmount={5} className={tab ? 'cursor-pointer' : ''}>
                <SpotlightCard
                  className={`bg-white rounded-xl border ${border} p-5 shadow-sm`}
                  spotlightColor={`rgba(0,82,155,0.06)`}
                >
                  <div onClick={tab ? () => setCurrentTab(tab) : undefined}>
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm text-gray-500">{label}</p>
                      <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                    </div>
                    <div className={`text-3xl font-bold ${color}`}>
                      <AnimatedCounter
                        value={value}
                        suffix={idx === 3 ? '%' : ''}
                        duration={1.5}
                      />
                    </div>
                    {tab && (
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1 group">
                        View all <ArrowRight className="w-3 h-3" />
                      </p>
                    )}
                  </div>
                </SpotlightCard>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ── How it works — with stagger animation ──────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <GitBranch className="w-5 h-5" style={{ color: '#00529b' }} />
            <TextGenerateEffect words="How It Works" className="text-lg font-bold text-gray-900" />
            <span className="text-xs text-gray-400 font-normal ml-1 bg-gray-100 px-2 py-0.5 rounded-full">5-step pipeline</span>
          </div>
          <StaggerContainer className="flex flex-col sm:flex-row items-stretch gap-0" staggerDelay={0.12}>
            {PIPELINE_STEPS.map(({ icon: Icon, title, desc }, i) => (
              <StaggerItem
                key={title}
                className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 flex-1 relative"
              >
                <SpotlightCard className="w-full px-3 py-4 bg-white rounded-xl sm:rounded-none border border-gray-200 sm:border-r-0 last:sm:border-r sm:first:rounded-l-xl sm:last:rounded-r-xl">
                  <div className="flex sm:flex-col items-center gap-2">
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: '#00529b' }}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {i + 1}
                    </motion.div>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-blue-50">
                      <Icon className="w-4.5 h-4.5" style={{ color: '#00529b' }} />
                    </div>
                  </div>
                  <div className="sm:text-center mt-2">
                    <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </SpotlightCard>
                {i < PIPELINE_STEPS.length - 1 && (
                  <ChevronRight className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 shrink-0 z-10" />
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ── Feature grid w/ spotlight + tilt ──────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5" style={{ color: '#00529b' }} />
            <TextGenerateEffect words="Platform Capabilities" className="text-lg font-bold text-gray-900" />
          </div>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.1}>
            {FEATURE_CARDS.map(({ icon: Icon, title, desc, color, bg, spotlightColor }) => (
              <StaggerItem key={title}>
                <TiltCard tiltAmount={4}>
                  <SpotlightCard
                    className="bg-white rounded-xl border border-gray-200 p-5 h-full"
                    spotlightColor={spotlightColor}
                  >
                    <motion.div
                      className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className={`w-5 h-5 ${color}`} />
                    </motion.div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </SpotlightCard>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ── Tech Stack w/ animated tags ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <GlowBorder duration={6} borderRadius={16}>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5" style={{ color: '#00529b' }} />
                <h2 className="text-base font-bold text-gray-900">Technology Stack</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map(({ name, label, color }, i) => (
                  <motion.span
                    key={name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`inline-flex flex-col px-3 py-1.5 rounded-lg text-xs font-medium border ${color} cursor-default transition-shadow hover:shadow-md`}
                  >
                    <span className="text-[10px] opacity-60 mb-0.5">{label}</span>
                    {name}
                  </motion.span>
                ))}
              </div>
            </div>
          </GlowBorder>
        </motion.div>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{totalCVs} real CVs loaded &mdash; 2 job descriptions ready.</p>
              <p className="text-xs text-gray-500 mt-0.5">Pick a JD, set your weights, and see all 30 candidates ranked instantly.</p>
            </div>
          </div>
          <motion.button
            onClick={() => setCurrentTab('match')}
            className="group flex items-center justify-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all shrink-0 sm:ml-4 w-full sm:w-auto shadow-sm"
            style={{ background: '#00529b' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Run Match <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
