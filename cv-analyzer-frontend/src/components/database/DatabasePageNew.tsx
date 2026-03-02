'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  FileText,
  Search,
  X,
  ChevronDown,
  ExternalLink,
  Eye,
  Calendar,
  Code2,
  Briefcase,
  Clock,
  LayoutGrid,
  List,
  Tag,
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { CVListItem, JDListItem } from '@/lib/types';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

// ── helpers ────────────────────────────────────────────────────────────────
function scoreColor(n: number) {
  if (n >= 0.85) return 'bg-green-50 text-green-700 border-green-200';
  if (n >= 0.70) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── PDF Viewer ──────────────────────────────────────────────────────────────
function PdfPanel({ filename, onClose }: { filename: string; onClose: () => void }) {
  const src = `/sample_cvs/${filename}`;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center md:justify-end" onClick={onClose}>
      <div
        className="w-full h-full sm:max-w-2xl bg-white sm:border-l border-gray-200 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0 bg-brand-600">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-white/80 shrink-0" />
            <span className="text-sm text-white truncate font-medium">{filename}</span>
          </div>
          <div className="flex items-center gap-2 ml-2 shrink-0">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open
            </a>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <iframe
          src={src}
          className="flex-1 w-full border-0"
          title={filename}
        />
      </div>
    </div>
  );
}

// ── CV Card ─────────────────────────────────────────────────────────────────
function CVCard({ cv, onPreview, index }: { cv: CVListItem; onPreview: (f: string) => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.6) }}
    >
      <SpotlightCard className="bg-white rounded-xl border border-gray-200 p-4 h-full group">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 text-sm truncate">{cv.full_name ?? cv.filename}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{cv.job_title ?? '—'}</p>
          </div>
          <motion.button
            onClick={() => onPreview(cv.filename)}
            className="ml-2 p-1.5 text-gray-400 hover:text-white hover:bg-brand-600 rounded-lg transition-all shrink-0 opacity-0 group-hover:opacity-100"
            whileTap={{ scale: 0.9 }}
            title="Preview PDF"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {cv.years_of_experience ?? '—'} yrs
          </span>
          <span className="flex items-center gap-1">
            <Code2 className="w-3 h-3" />
            {cv.skills_count} skills
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {fmtDate(cv.upload_date)}
          </span>
        </div>
        {cv.skills && cv.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {cv.skills.slice(0, 6).map((s) => (
              <span key={s} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                {s}
              </span>
            ))}
            {cv.skills.length > 6 && (
              <span className="text-[10px] px-1.5 py-0.5 text-gray-400">
                +{cv.skills.length - 6} more
              </span>
            )}
          </div>
        )}
      </SpotlightCard>
    </motion.div>
  );
}

// ── JD Card ─────────────────────────────────────────────────────────────────
function JDCard({ jd, expanded, onToggle, index }: { jd: JDListItem; expanded: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
    >
      <SpotlightCard className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <button className="w-full text-left p-4 hover:bg-gray-50 transition-colors" onClick={onToggle}>
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 text-sm">{jd.job_title ?? jd.filename}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {jd.years_of_experience} yrs exp
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {jd.skills_count} skills
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {jd.responsibilities_count} responsibilities
                </span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
            </motion.div>
          </div>
        </button>
        <AnimatePresence>
          {expanded && jd.skills && jd.skills.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 mt-3 mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {jd.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="text-xs px-2 py-0.5 rounded border bg-brand-50 text-brand-600 border-brand-200"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SpotlightCard>
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function DatabasePageNew() {
  const { cvs, jds, databaseActiveTab, setDatabaseActiveTab, loadCVs, loadJDs } = useAppStore();

  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedJD, setExpandedJD] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    loadCVs();
    loadJDs();
  }, [loadCVs, loadJDs]);

  // All unique skills across CVs
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    cvs.forEach((cv) => cv.skills?.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [cvs]);

  const filteredCVs = useMemo(() => {
    const q = search.toLowerCase();
    return cvs.filter((cv) => {
      const matchSearch =
        !q ||
        cv.full_name?.toLowerCase().includes(q) ||
        cv.job_title?.toLowerCase().includes(q) ||
        cv.skills?.some((s) => s.toLowerCase().includes(q));
      const matchSkill =
        !skillFilter || cv.skills?.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()));
      return matchSearch && matchSkill;
    });
  }, [cvs, search, skillFilter]);

  const filteredJDs = useMemo(() => {
    const q = search.toLowerCase();
    return jds.filter(
      (jd) =>
        !q ||
        jd.job_title?.toLowerCase().includes(q) ||
        jd.skills?.some((s) => s.toLowerCase().includes(q)),
    );
  }, [jds, search]);

  const popularSkills = allSkills.filter((s) =>
    ['React', 'TypeScript', 'Python', 'AWS', 'Kubernetes', 'Docker', 'Node.js', 'SQL', 'Salesforce', 'Penetration Testing'].includes(s)
  );

  return (
    <div className="min-h-full bg-gray-50 text-gray-800 pb-16 md:pb-0">
      {previewFile && <PdfPanel filename={previewFile} onClose={() => setPreviewFile(null)} />}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-200 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 sm:gap-3 mb-3">
          {/* Tab switcher */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-1 max-w-xs">
            <button
              onClick={() => setDatabaseActiveTab('cvs')}
              aria-label="Show CVs tab"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                databaseActiveTab === 'cvs' ? 'text-white bg-brand-600' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              CVs
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                databaseActiveTab === 'cvs' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
              }`}>{cvs.length}</span>
            </button>
            <button
              onClick={() => setDatabaseActiveTab('jds')}
              aria-label="Show JDs tab"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                databaseActiveTab === 'jds' ? 'text-white bg-brand-600' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              JDs
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                databaseActiveTab === 'jds' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
              }`}>{jds.length}</span>
            </button>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${ viewMode === 'grid' ? 'text-white bg-brand-600' : 'text-gray-400 hover:text-gray-700'}`}
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${ viewMode === 'list' ? 'text-white bg-brand-600' : 'text-gray-400 hover:text-gray-700'}`}
              title="List view"
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={databaseActiveTab === 'cvs' ? 'Search by name, title or skill…' : 'Search by title or skill…'}
            aria-label="Search database"
            className="w-full pl-9 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-600 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Clear search">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-6 py-5">
        <AnimatePresence mode="wait">
        {/* ── CVs tab ─────────────────────────────────────────────── */}
        {databaseActiveTab === 'cvs' && (
          <motion.div
            key="cvs"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Skill quick-filters */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs text-gray-500 mr-1">Filter by skill:</span>
                {popularSkills.map((skill) => (
                  <motion.button
                    key={skill}
                    onClick={() => setSkillFilter(skillFilter === skill ? '' : skill)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      skillFilter === skill
                        ? 'text-white border-transparent bg-brand-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.button>
                ))}
                {skillFilter && (
                  <button
                    onClick={() => setSkillFilter('')}
                    className="text-xs px-2.5 py-1 rounded-full border border-dashed border-gray-300 text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-3">
              Showing <span className="font-semibold text-gray-700">{filteredCVs.length}</span> of {cvs.length} CVs
              {skillFilter && <span> &middot; filtered by <span className="font-medium text-blue-700">&ldquo;{skillFilter}&rdquo;</span></span>}
            </p>

            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'flex flex-col gap-3'
            }>
              {filteredCVs.map((cv, i) => (
                <CVCard key={cv.id} cv={cv} onPreview={setPreviewFile} index={i} />
              ))}
            </div>
            {filteredCVs.length === 0 && (
              <EmptyState
                icon={Users}
                title="No CVs match your filter"
                description="Try adjusting your search or clearing filters."
              />
            )}
          </motion.div>
        )}

        {/* ── JDs tab ─────────────────────────────────────────────── */}
        {databaseActiveTab === 'jds' && (
          <motion.div
            key="jds"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs text-gray-500 mb-3">
              {filteredJDs.length} job description{filteredJDs.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-3">
              {filteredJDs.map((jd, i) => (
                <JDCard
                  key={jd.id}
                  jd={jd}
                  expanded={expandedJD === jd.id}
                  onToggle={() => setExpandedJD(expandedJD === jd.id ? null : jd.id)}
                  index={i}
                />
              ))}
            </div>
            {filteredJDs.length === 0 && (
              <EmptyState
                icon={FileText}
                title="No job descriptions match your search"
                description="Try a different search term."
              />
            )}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
