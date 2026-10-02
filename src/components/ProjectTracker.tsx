import React, { useState } from 'react';
import { Project, ProjectMilestone, MilestoneStatus } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Check, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  Globe,
  FileText,
  Smartphone,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { StagingPreviewModal } from './StagingPreviewModal';
import { RevisionModal } from './RevisionModal';

interface ProjectTrackerProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (projectId: string) => void;
  onApproveMilestone: (projectId: string, milestoneId: string) => void;
  onRequestRevisions: (projectId: string, milestoneId: string, revisionText: string, priority: 'high' | 'medium' | 'low') => void;
  onNavigateToBilling: () => void;
}

export const ProjectTracker: React.FC<ProjectTrackerProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onApproveMilestone,
  onRequestRevisions,
  onNavigateToBilling
}) => {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null);
  const [isStagingOpen, setIsStagingOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [approvalCelebration, setApprovalCelebration] = useState(false);

  const project = projects.find((p) => p.id === activeProjectId) || projects[0];
  if (!project) return null;

  // Active milestone is either the selected one or the current in-progress/review phase
  const activeMilestoneIndex = selectedPhaseIndex !== null 
    ? selectedPhaseIndex 
    : project.currentPhaseIndex;
  const currentMilestone = project.milestones[activeMilestoneIndex] || project.milestones[0];

  const completedCount = project.milestones.filter((m) => m.status === 'completed').length;
  const progressPercentage = Math.round((completedCount / project.milestones.length) * 100);

  const handleApprove = () => {
    onApproveMilestone(project.id, currentMilestone.id);
    setApprovalCelebration(true);
    setTimeout(() => setApprovalCelebration(false), 3000);
  };

  const handleRevisionSubmit = (text: string, priority: 'high' | 'medium' | 'low') => {
    onRequestRevisions(project.id, currentMilestone.id, text, priority);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Project Selector & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0e1627] border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
            <span>Client Workspace</span>
            <span aria-hidden="true">·</span>
            <span>Target: {project.domainTarget}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
            {project.clientCompany}
          </h1>
          <p className="text-xs text-slate-400">
            {project.businessType} · Lead Contact: {project.clientName} ({project.contactEmail})
          </p>
        </div>

        {/* Project Switcher Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs text-slate-400 shrink-0 hidden sm:inline">Active Project:</span>
          <select
            value={project.id}
            onChange={(e) => {
              onSelectProject(e.target.value);
              setSelectedPhaseIndex(null);
            }}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-medium focus:outline-hidden focus:border-amber-400 w-full md:w-auto"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.clientCompany} (Phase {p.currentPhaseIndex + 1}/6)
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsStagingOpen(true)}
            className="px-3 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspect Staging</span>
          </button>
        </div>
      </div>

      {/* Progress Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 text-xs block mb-1">Sprint Completion</span>
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-2xl font-bold text-white tabular-nums">
              {progressPercentage}%
            </span>
            <span className="text-xs font-mono text-amber-400">
              Phase {project.currentPhaseIndex + 1} of 6
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 text-xs block mb-1">Estimated Go-Live Date</span>
          <span className="font-mono text-xl font-bold text-white">
            {project.targetLaunchDate}
          </span>
          <span className="text-[11px] text-emerald-400 block mt-1">
            ● Sprint On Schedule (No Delays)
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 text-xs block mb-1">Staging Sandbox</span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300 truncate max-w-[140px]">
              {project.stagingUrl.replace('https://', '')}
            </span>
            <button
              onClick={() => setIsStagingOpen(true)}
              className="text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1"
            >
              <span>Test</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            SSL & Fast CDN active
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 text-xs block mb-1">Automated Milestone Billing</span>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-white">
              {project.billingSchedule === 'milestone_50_50' ? '50% / 50% Milestone' : '3-Stage Progress'}
            </span>
            <button
              onClick={onNavigateToBilling}
              className="text-amber-400 hover:text-amber-300 text-xs underline"
            >
              Ledger
            </button>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            ${project.totalSetupPrice.toLocaleString()} Total · ${project.monthlyCarePrice}/mo Care
          </span>
        </div>
      </div>

      {/* Main Stepper & Deliverable Review Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 6-Phase Pipeline Stepper */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">Delivery Pipeline Phases</h3>
            <span className="text-[11px] text-slate-400 font-mono">Click phase to inspect</span>
          </div>

          <div className="space-y-3">
            {project.milestones.map((m, index) => {
              const isSelected = activeMilestoneIndex === index;
              const isCompleted = m.status === 'completed';
              const isCurrent = project.currentPhaseIndex === index;
              const isActionNeeded = m.status === 'review_required';

              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedPhaseIndex(index)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-400 text-white shadow-md'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {/* Status Indicator Icon */}
                  <div className="shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isActionNeeded ? (
                      <AlertCircle className="w-5 h-5 text-amber-400 animate-pulse" />
                    ) : isCurrent ? (
                      <Clock className="w-5 h-5 text-amber-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-500">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold truncate text-white">
                        {index + 1}. {m.title}
                      </span>
                      {isActionNeeded && (
                        <span className="px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider rounded-md shrink-0">
                          Signoff Needed
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] text-emerald-400 font-mono shrink-0">
                          Passed
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {m.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500 font-mono">
                      <span>Est: {m.estimatedDate}</span>
                      {m.completedDate && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-400">Done: {m.completedDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Phase Deliverable & Client Action Card */}
        <div className="lg:col-span-7 space-y-6">
          {/* Deliverable Review Board */}
          <div className="bg-[#0e1627] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                  Phase {currentMilestone.phaseNumber} of 6 Review
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentMilestone.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {currentMilestone.status === 'completed' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-md font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    Milestone Completed & Approved
                  </span>
                ) : currentMilestone.status === 'review_required' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-md font-semibold animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Client Signoff Requested
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-mono">
                    Phase Status: {currentMilestone.status.replace('_', ' ')}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentMilestone.description}
            </p>

            {/* Deliverable File / Staging Link Card */}
            {currentMilestone.deliverable && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Deliverable: {currentMilestone.deliverable.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded">
                    {currentMilestone.deliverable.type.replace('_', ' ')}
                  </span>
                </div>

                {currentMilestone.deliverable.previewSnippet && (
                  <p className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 font-mono">
                    "{currentMilestone.deliverable.previewSnippet}"
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => setIsStagingOpen(true)}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Launch Interactive Staging Sandbox</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setIsRevisionModalOpen(true)}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Request Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Automated Billing Impact Note */}
            {currentMilestone.billingTriggerNotice && (
              <div className="bg-slate-900/40 border border-amber-500/30 p-4 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Automated Billing Logic:</span>
                </div>
                <p className="text-slate-300">
                  {currentMilestone.billingTriggerNotice}
                </p>
              </div>
            )}

            {/* Client Approval / Action Section */}
            {currentMilestone.status === 'review_required' && (
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  Satisfied with this deliverable? Click approve to automatically advance to Phase {currentMilestone.phaseNumber + 1}.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsRevisionModalOpen(true)}
                    className="w-1/2 sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Request Edits
                  </button>
                  <button
                    onClick={handleApprove}
                    className="w-1/2 sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Approve Deliverable</span>
                  </button>
                </div>
              </div>
            )}

            {/* Approval celebration banner */}
            {approvalCelebration && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-center space-y-1 text-xs animate-in zoom-in-95 duration-200">
                <span className="font-bold text-emerald-300 block">
                  🎉 Milestone Successfully Approved!
                </span>
                <span className="text-slate-300">
                  Stage completed. Team has been unlocked for the next deployment phase.
                </span>
              </div>
            )}

            {/* Client Notes / Pinned Revisions */}
            {currentMilestone.clientNotes && (
              <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-white font-medium block mb-0.5">Approved Client Notes:</span>
                "{currentMilestone.clientNotes}"
              </div>
            )}
          </div>

          {/* Activity Log Feed */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm">Sprint Activity & Automated Log</h3>
            <div className="space-y-3">
              {project.activityLog.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800/80 text-xs"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{log.title}</span>
                      <span className="text-[10px] font-mono text-slate-500">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-400 mt-0.5">{log.description}</p>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 block uppercase">
                      Triggered by: {log.actor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staging Sandbox Modal */}
      <StagingPreviewModal
        isOpen={isStagingOpen}
        projectCompany={project.clientCompany}
        businessType={project.businessType}
        onClose={() => setIsStagingOpen(false)}
        onApproveFromPreview={
          currentMilestone.status === 'review_required'
            ? () => {
                handleApprove();
                setIsStagingOpen(false);
              }
            : undefined
        }
      />

      {/* Revision Modal */}
      <RevisionModal
        isOpen={isRevisionModalOpen}
        milestoneTitle={currentMilestone.title}
        onClose={() => setIsRevisionModalOpen(false)}
        onSubmitRevision={handleRevisionSubmit}
      />
    </div>
  );
};
