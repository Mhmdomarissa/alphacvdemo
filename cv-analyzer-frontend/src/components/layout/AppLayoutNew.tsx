'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Database,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  Server,
  Cpu,
  HardDrive,
  Users,
  FileText,
  Menu,
  X,
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

interface AppLayoutNewProps {
  children: ReactNode;
}

type Tab = 'dashboard' | 'database' | 'match';

const NAV_ITEMS: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'database', label: 'CV / JD Database', icon: Database },
  { id: 'match', label: 'Match & Rank', icon: Zap },
];

function StatusDot({ status }: { status: string }) {
  if (status === 'ok' || status === 'healthy') {
    return <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />;
  }
  return <span className="inline-block w-2 h-2 rounded-full bg-red-400" />;
}

// ── Sidebar content (shared between desktop & mobile drawer) ────────────────
function SidebarContent({
  currentTab,
  setCurrentTab,
  totalCVs,
  totalJDs,
  stats,
  services,
  systemHealth,
  onNavClick,
}: {
  currentTab: Tab;
  setCurrentTab: (t: Tab) => void;
  totalCVs: number;
  totalJDs: number;
  stats: ReturnType<typeof useAppStore>['systemStats'] extends { stats: infer S } ? S : undefined;
  services: Record<string, { status: string; response_time_ms?: number }>;
  systemHealth: ReturnType<typeof useAppStore>['systemHealth'];
  onNavClick?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5 mb-2">
          <motion.div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: '#00529b' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Zap className="w-4 h-4 text-white" />
          </motion.div>
          <div>
            <span className="font-bold text-base tracking-tight text-gray-900 leading-none">Alpha CV</span>
            <p className="text-[10px] text-gray-400 mt-0.5">AI Recruitment Platform</p>
          </div>
        </div>
        <motion.span
          className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ color: '#00529b', background: '#eff6ff' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Activity className="w-3 h-3" />
          Interactive Demo
        </motion.span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }, i) => (
          <motion.button
            key={id}
            onClick={() => {
              setCurrentTab(id);
              onNavClick?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
              currentTab === id
                ? 'text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
            }`}
            style={currentTab === id ? { background: '#00529b' } : undefined}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            whileHover={{ x: currentTab === id ? 0 : 3 }}
            whileTap={{ scale: 0.97 }}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
            {currentTab === id && (
              <motion.span
                layoutId="navIndicator"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Quick stats */}
      <div className="mx-3 mb-3 p-3 rounded-lg border border-blue-100" style={{ background: '#f0f7ff' }}>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Users className="w-3.5 h-3.5" style={{ color: '#00529b' }} />
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#00529b' }}>Database</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-gray-500">
              <Users className="w-3.5 h-3.5" /> CVs
            </span>
            <span className="font-bold text-gray-900">{totalCVs}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-gray-500">
              <FileText className="w-3.5 h-3.5" /> JDs
            </span>
            <span className="font-bold text-gray-900">{totalJDs}</span>
          </div>
          {stats && (
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Activity className="w-3.5 h-3.5" /> Cache Hit
              </span>
              <span className="font-bold text-green-600">
                {Math.round(((stats as Record<string, unknown>)?.cache_stats as { hit_rate?: number })?.hit_rate
                  ? (((stats as Record<string, unknown>)?.cache_stats as { hit_rate: number }).hit_rate * 100)
                  : 0)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* System Health Panel */}
      <div className="mx-3 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-gray-400" />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">System Health</p>
          </div>
          {systemHealth && (
            systemHealth.status === 'healthy'
              ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              : <AlertCircle className="w-3.5 h-3.5 text-red-500" />
          )}
        </div>
        <div className="space-y-2">
          {Object.entries(services).map(([name, svc]) => (
            <div key={name} className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 capitalize">
                {name === 'qdrant' ? <HardDrive className="w-3 h-3" /> :
                 name === 'embedding' ? <Cpu className="w-3 h-3" /> :
                 <Server className="w-3 h-3" />}
                {name}
              </span>
              <div className="flex items-center gap-1.5">
                {svc.response_time_ms && (
                  <span className="text-xs text-gray-400">{svc.response_time_ms}ms</span>
                )}
                <StatusDot status={svc.status} />
              </div>
            </div>
          ))}
        </div>
        {(stats as Record<string, unknown>)?.system_info && (
          <div className="mt-2.5 pt-2.5 border-t border-gray-200">
            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />
                <span className="truncate">{((stats as Record<string, unknown>).system_info as { embedding_model?: string })?.embedding_model}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 shrink-0 text-amber-500" />
                <span>{((stats as Record<string, unknown>).system_info as { llm_model?: string })?.llm_model}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function AppLayoutNew({ children }: AppLayoutNewProps) {
  const { currentTab, setCurrentTab, systemHealth, systemStats, totalCVs, totalJDs } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = systemHealth?.services ?? {};
  const stats = systemStats?.stats;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* ── Mobile top bar ──────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex md:hidden items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#00529b' }}>
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-gray-900">Alpha CV</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile drawer overlay ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col bg-white shadow-2xl md:hidden overflow-y-auto"
            >
              <SidebarContent
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                totalCVs={totalCVs}
                totalJDs={totalJDs}
                stats={stats}
                services={services}
                systemHealth={systemHealth}
                onNavClick={() => setMobileMenuOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar ────────────────────────────────────────── */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 shrink-0 overflow-y-auto">
        <SidebarContent
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          totalCVs={totalCVs}
          totalJDs={totalJDs}
          stats={stats}
          services={services}
          systemHealth={systemHealth}
        />
      </aside>

      {/* ── Main ───────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto bg-gray-50 pt-14 md:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Mobile bottom nav ──────────────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden items-center justify-around bg-white border-t border-gray-200 px-2 py-1 pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentTab(id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors min-w-0 ${
              currentTab === id ? 'font-bold' : 'text-gray-400'
            }`}
            style={currentTab === id ? { color: '#00529b' } : undefined}
          >
            <Icon className="w-5 h-5" />
            <span className="truncate">{label.split(' ')[0]}</span>
            {currentTab === id && (
              <motion.div
                layoutId="mobileNavDot"
                className="w-1 h-1 rounded-full mt-0.5"
                style={{ background: '#00529b' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
