'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  FileText,
  ChevronDown,
  RotateCcw,
  Check,
  AlertCircle,
  Star,
  Users,
  Loader2,
  SlidersHorizontal,
  ArrowUpDown,
  Brain,
  Clock,
  Briefcase,
  Activity,
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { CandidateBreakdown, AssignmentItem } from '@/lib/types';
import { AnimatedScoreRing } from '@/components/ui/AnimatedScoreRing';
import { AnimatedProgress } from '@/components/ui/AnimatedProgress';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

// ── helpers ─────────────────────────────────────────────────────────────────
function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function ScoreBar({ label, value, icon: Icon }: { label: string; value: number; icon: React.FC<{ className?: string }> }) {
  const color = value >= 0.85 ? '#16a34a' : value >= 0.70 ? '#d97706' : '#dc2626';
  const textColor = value >= 0.85 ? 'text-green-700' : value >= 0.70 ? 'text-amber-700' : 'text-red-700';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <Icon className="w-3 h-3" />
          {label}
        </span>
        <span className={`text-xs font-bold ${textColor}`}>{pct(value)}</span>
      </div>
      <AnimatedProgress value={Math.round(value * 100)} color={color} height={6} />
    </div>
  );
}

function AssignmentRow({ item, i }: { item: AssignmentItem; i: number }) {
  const color =
    item.score >= 0.9 ? 'text-green-700' :
    item.score >= 0.7 ? 'text-amber-700' :
    'text-red-700';
  const bg =
    item.score >= 0.9 ? 'bg-green-50' :
    item.score >= 0.7 ? 'bg-amber-50' :
    'bg-red-50';
  return (
    <tr className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50/30 transition-colors`}>
      <td className="px-3 py-2 text-xs text-gray-700 border-r border-gray-200">{item.jd_item}</td>
      <td className="px-3 py-2 text-xs text-gray-700 border-r border-gray-200">{item.cv_item}</td>
      <td className="px-3 py-2 text-center">
        <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${bg} ${color}`}>
          {Math.round(item.score * 100)}%
        </span>
      </td>
    </tr>
  );
}

function CandidateCard({ candidate, rank, defaultOpen, index }: { candidate: CandidateBreakdown; rank: number; defaultOpen?: boolean; index: number }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [respOpen, setRespOpen] = useState(false);

  const isTop = rank === 1;
  const score = candidate.overall_score;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 1.2) }}
    >
      <SpotlightCard
        className={`rounded-xl border transition-all ${
          isTop ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white'
        }`}
        spotlightColor={isTop ? 'rgba(0,82,155,0.06)' : 'rgba(0,0,0,0.03)'}
      >
      {/* Card header */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left p-4 rounded-t-xl transition-colors ${
          isTop ? 'hover:bg-blue-50/50' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Rank + ring */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <motion.span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isTop ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: Math.min(index * 0.06, 1.2) + 0.2 }}
            >
              #{rank}
            </motion.span>
            <AnimatedScoreRing score={score} size={48} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-semibold text-gray-900 text-sm">{candidate.cv_name}</p>
              {isTop && <Star className="w-3.5 h-3.5 text-amber-500" />}
            </div>
            <p className="text-xs text-gray-500 mb-2">{candidate.cv_job_title} · {candidate.cv_years} yrs</p>
            {/* Mini bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1">
              {[
                { label: 'Skills', value: candidate.skills_score },
                { label: 'Responsibilities', value: candidate.responsibilities_score },
                { label: 'Job Title', value: candidate.job_title_score },
                { label: 'Experience', value: candidate.years_score },
              ].map(({ label, value }) => {
                const c = value >= 0.85 ? '#16a34a' : value >= 0.70 ? '#d97706' : '#dc2626';
                return (
                  <div key={label}>
                    <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                      <span>{label}</span><span className="font-medium text-gray-700">{Math.round(value * 100)}</span>
                    </div>
                    <AnimatedProgress value={Math.round(value * 100)} color={c} height={4} delay={Math.min(index * 0.06, 1.2) + 0.3} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toggle */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.div>
            <span className="text-[9px] text-gray-400">{open ? 'less' : 'more'}</span>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 divide-y divide-gray-100">
          {/* Full score bars */}
          <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <ScoreBar label="Skills Match" value={candidate.skills_score} icon={Brain} />
            <ScoreBar label="Responsibilities" value={candidate.responsibilities_score} icon={Briefcase} />
            <ScoreBar label="Job Title Fit" value={candidate.job_title_score} icon={FileText} />
            <ScoreBar label="Experience" value={candidate.years_score} icon={Clock} />
          </div>

          {/* AI Assessment */}
          {candidate.assessment && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="px-4 py-4"
            >
              <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 mb-2">
                <Activity className="w-3.5 h-3.5" style={{color:'#00529b'}} />
                AI Assessment
              </p>
              <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 rounded-lg p-3 border border-blue-100">
                {candidate.assessment}
              </p>
            </motion.div>
          )}

          {/* Skills breakdown */}
          {candidate.skills_assignments.length > 0 && (
            <div className="px-4 py-3">
              <button
                onClick={() => setSkillsOpen(!skillsOpen)}
                className="flex items-center justify-between w-full text-xs font-semibold text-gray-500 mb-2"
              >
                <span className="flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-blue-600" />
                  Skills Breakdown ({candidate.skills_assignments.length} items)
                </span>
                <motion.div animate={{ rotate: skillsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {skillsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-xs text-gray-500" style={{background:'#f8fafc'}}>
                            <th className="px-3 py-2 border-r border-gray-200">JD Requires</th>
                            <th className="px-3 py-2 border-r border-gray-200">CV Has</th>
                            <th className="px-3 py-2 text-center">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {candidate.skills_assignments.map((item, i) => (
                            <AssignmentRow key={i} item={item} i={i} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Responsibilities breakdown */}
          {candidate.responsibilities_assignments.length > 0 && (
            <div className="px-4 py-3">
              <button
                onClick={() => setRespOpen(!respOpen)}
                className="flex items-center justify-between w-full text-xs font-semibold text-gray-500 mb-2"
              >
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
                  Responsibilities Breakdown ({candidate.responsibilities_assignments.length} items)
                </span>
                <motion.div animate={{ rotate: respOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {respOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-xs text-gray-500" style={{background:'#f8fafc'}}>
                            <th className="px-3 py-2 border-r border-gray-200">JD Requires</th>
                            <th className="px-3 py-2 border-r border-gray-200">CV Has</th>
                            <th className="px-3 py-2 text-center">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {candidate.responsibilities_assignments.map((item, i) => (
                            <AssignmentRow key={i} item={item} i={i} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </SpotlightCard>
    </motion.div>
  );
}

// ── Weight Slider ─────────────────────────────────────────────────────────────
function WeightSlider({
  label,
  icon: Icon,
  value,
  onChange,
  color,
}: {
  label: string;
  icon: React.FC<{ className?: string }>;
  value: number;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <Icon className={`w-3.5 h-3.5 ${color}`} />
          {label}
        </span>
        <span className="text-xs font-bold text-gray-700 w-8 text-right">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00529b ${value}%, #e5e7eb ${value}%)`,
        }}
      />
    </div>
  );
}

// ── Progress Overlay ─────────────────────────────────────────────────────────
function ProgressOverlay() {
  const { matchingProgress } = useAppStore();
  if (!matchingProgress.isVisible) return null;

  const stageName = {
    initializing: 'Initializing engine',
    processing: 'Processing CV embeddings',
    analyzing: 'Analysing skill matches',
    scoring: 'Computing weighted scores',
    finalizing: 'Finalising results',
  }[matchingProgress.currentStage] ?? matchingProgress.currentStage;

  const pct = matchingProgress.totalCVs > 0
    ? Math.round((matchingProgress.processedCVs / matchingProgress.totalCVs) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'#eff6ff'}}>
            <Loader2 className="w-5 h-5 animate-spin" style={{color:'#00529b'}} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Matching in progress</p>
            <p className="text-xs text-gray-500">{stageName}…</p>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background:'#00529b' }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{matchingProgress.processedCVs} / {matchingProgress.totalCVs} CVs</span>
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MatchingPageNew() {
  const {
    jds,
    selectedJD,
    selectJD,
    matchWeights,
    setMatchWeights,
    runMatch,
    matchResult,
    clearMatchResult,
    loadingStates,
    matchingProgress,
  } = useAppStore();

  const [sortBy, setSortBy] = useState<'overall' | 'skills' | 'responsibilities'>('overall');
  const [weightWarning, setWeightWarning] = useState(false);

  const isRunning = loadingStates.matching.isLoading || matchingProgress.isVisible;
  const totalWeight = matchWeights.skills + matchWeights.responsibilities + matchWeights.job_title + matchWeights.experience;

  const handleWeightChange = (key: keyof typeof matchWeights, val: number) => {
    setMatchWeights({ [key]: val });
    const newTotal = Object.entries({ ...matchWeights, [key]: val }).reduce((s, [, v]) => s + v, 0);
    setWeightWarning(Math.abs(newTotal - 100) > 0.5);
  };

  const candidates = matchResult
    ? [...matchResult.candidates].sort((a, b) => {
        if (sortBy === 'skills') return b.skills_score - a.skills_score;
        if (sortBy === 'responsibilities') return b.responsibilities_score - a.responsibilities_score;
        return b.overall_score - a.overall_score;
      })
    : [];

  const topCandidate = candidates[0];

  return (
    <div className="min-h-full bg-gray-50 text-gray-800 pb-16 md:pb-0">
      <ProgressOverlay />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Match &amp; Rank</h1>
            <p className="text-sm text-gray-500 mt-0.5">Select a JD, configure weights, run the match.</p>
          </div>
          {matchResult && (
            <button
              onClick={clearMatchResult}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* ── JD Selection ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm"
        >
          <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" style={{color:'#00529b'}} />
            1. Select Job Description
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {jds.map((jd) => (
              <motion.button
                key={jd.id}
                onClick={() => { selectJD(jd.id); clearMatchResult(); }}
                className={`text-left px-3 py-3 rounded-lg border text-sm transition-all ${
                  selectedJD === jd.id
                    ? 'text-white'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-white'
                }`}
                style={selectedJD === jd.id ? {background:'#00529b', borderColor:'#00529b'} : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium leading-snug">{jd.job_title}</span>
                  {selectedJD === jd.id && <Check className="w-4 h-4 shrink-0 mt-0.5" />}
                </div>
                <p className={`text-xs mt-1 ${selectedJD === jd.id ? 'text-blue-100' : 'text-gray-400'}`}>
                  {jd.years_of_experience} yrs exp · {jd.skills_count} skills
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Weight Controls ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" style={{color:'#00529b'}} />
              2. Configure Match Weights
            </p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              Math.abs(totalWeight - 100) < 0.5
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              Total: {totalWeight.toFixed(1)}%
            </span>
          </div>

          {weightWarning && (
            <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Weights should sum to 100% for accurate scoring. Currently {totalWeight.toFixed(1)}%.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <WeightSlider
              label="Skills"
              icon={Brain}
              value={matchWeights.skills}
              onChange={(v) => handleWeightChange('skills', v)}
              color="text-blue-600"
            />
            <WeightSlider
              label="Responsibilities"
              icon={Briefcase}
              value={matchWeights.responsibilities}
              onChange={(v) => handleWeightChange('responsibilities', v)}
              color="text-blue-500"
            />
            <WeightSlider
              label="Job Title"
              icon={FileText}
              value={matchWeights.job_title}
              onChange={(v) => handleWeightChange('job_title', v)}
              color="text-cyan-600"
            />
            <WeightSlider
              label="Experience"
              icon={Clock}
              value={matchWeights.experience}
              onChange={(v) => handleWeightChange('experience', v)}
              color="text-green-600"
            />
          </div>

          <p className="text-xs text-gray-400 mt-3">
            Default: Skills 80% · Responsibilities 15% · Job Title 2.5% · Experience 2.5%
          </p>
        </motion.div>

        {/* ── Run button ───────────────────────────────────────────── */}
        <motion.button
          onClick={runMatch}
          disabled={!selectedJD || isRunning}
          className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold transition-all ${
            !selectedJD || isRunning
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              : 'text-white shadow-md hover:opacity-90'
          }`}
          style={(!selectedJD || isRunning) ? undefined : {background:'#00529b'}}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={(!selectedJD || isRunning) ? {} : { scale: 1.01 }}
          whileTap={(!selectedJD || isRunning) ? {} : { scale: 0.98 }}
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Matching…
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              3. Run Match
            </>
          )}
        </motion.button>

        {/* ── Error ────────────────────────────────────────────────── */}
        {loadingStates.matching.error && (
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {loadingStates.matching.error}
          </div>
        )}

        {/* ── Results ──────────────────────────────────────────────── */}
        <AnimatePresence>
        {matchResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Results header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-base font-bold text-gray-900">
                  {matchResult.candidates.length} Candidates Ranked
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  For: <span className="text-gray-700">{matchResult.jd_job_title}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-xs bg-white border border-gray-200 text-gray-700 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-400"
                >
                  <option value="overall">Overall</option>
                  <option value="skills">Skills</option>
                  <option value="responsibilities">Responsibilities</option>
                </select>
              </div>
            </div>

            {/* Top candidate hero */}
            {topCandidate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-xl border border-blue-200 p-4"
                style={{background:'#eff6ff'}}
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Star className="w-4 h-4 text-amber-500" />
                  </motion.div>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Top Candidate</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <AnimatedScoreRing score={topCandidate.overall_score} size={56} />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-900">{topCandidate.cv_name}</p>
                    <p className="text-sm text-gray-500">{topCandidate.cv_job_title} · {topCandidate.cv_years} yrs</p>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed max-w-xl">
                      {topCandidate.assessment?.substring(0, 160)}…
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Best Match', value: pct(candidates[0]?.overall_score ?? 0), icon: Star },
                { label: 'Avg Score', value: pct(candidates.reduce((s, c) => s + c.overall_score, 0) / candidates.length), icon: Activity },
                { label: 'Strong (≥85%)', value: candidates.filter((c) => c.overall_score >= 0.85).length, icon: Users },
                { label: 'Borderline (70–85%)', value: candidates.filter((c) => c.overall_score >= 0.7 && c.overall_score < 0.85).length, icon: Users },
              ].map(({ label, value, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="bg-white rounded-lg border border-gray-200 px-3 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5 text-gray-400" />
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{value}</p>
                </motion.div>
              ))}
            </div>

            {/* Candidate list */}
            <div className="space-y-3">
              {candidates.map((c, i) => (
                <CandidateCard key={c.cv_id} candidate={c} rank={i + 1} defaultOpen={i === 0} index={i} />
              ))}
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* ── Empty state ───────────────────────────────────────────── */}
        {!matchResult && !isRunning && (
          <div className="text-center py-16 text-gray-400">
            <Zap className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Select a job description above and click Run Match.</p>
          </div>
        )}
      </div>
    </div>
  );
}
