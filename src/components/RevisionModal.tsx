import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface RevisionModalProps {
  isOpen: boolean;
  milestoneTitle: string;
  onClose: () => void;
  onSubmitRevision: (revisionText: string, priority: 'high' | 'medium' | 'low') => void;
}

export const RevisionModal: React.FC<RevisionModalProps> = ({
  isOpen,
  milestoneTitle,
  onClose,
  onSubmitRevision
}) => {
  const [revisionText, setRevisionText] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [section, setSection] = useState('Copy & Headlines');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionText.trim()) return;

    const fullText = `[${section}] ${revisionText.trim()}`;
    onSubmitRevision(fullText, priority);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRevisionText('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0f172a] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0b0f19]">
          <div className="flex items-center gap-2">
            <span className="font-display text-base font-semibold text-white">Request Revisions</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-display text-lg font-semibold text-white">Revision Request Dispatched</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your notes have been pinned to this milestone. The engineering team has been notified with estimated turnaround of 24–48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-300 font-medium">Target Milestone: </span>
              {milestoneTitle}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Section / Component
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-amber-400"
              >
                <option value="Copy & Headlines">Copy, Headlines & Text</option>
                <option value="Imagery & Media">Photos, Graphics & Branding</option>
                <option value="Booking & Reservation Flow">Online Booking & Calendar Flow</option>
                <option value="Navigation & Menu">Header, Footer & Navigation</option>
                <option value="Mobile Responsiveness">Mobile / Tablet Layout</option>
                <option value="Contact Form & Hours">Contact Info, Map & Operating Hours</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                    priority === 'low'
                      ? 'border-blue-500/60 bg-blue-500/10 text-blue-300 font-medium'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Cosmetic / Minor
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                    priority === 'medium'
                      ? 'border-amber-500/60 bg-amber-500/10 text-amber-300 font-medium'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Normal Priority
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                    priority === 'high'
                      ? 'border-rose-500/60 bg-rose-500/10 text-rose-300 font-medium'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Blocker / Urgent
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Detailed Change Instructions
              </label>
              <textarea
                value={revisionText}
                onChange={(e) => setRevisionText(e.target.value)}
                placeholder="Example: Please change the phone number in the footer to (415) 882-9014 and update the dinner menu item #3 price to $28."
                rows={4}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <div className="flex items-start gap-2 text-[11px] text-slate-500">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Standard website packages include unlimited minor copy and media adjustments within the review window.
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!revisionText.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Revisions</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
