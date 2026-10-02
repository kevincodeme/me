import React, { useState } from 'react';
import { Project, Invoice } from '../types';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Settings, 
  BellRing,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface AgencyOperationsProps {
  projects: Project[];
  invoices: Invoice[];
  onSelectProjectForClientView: (projectId: string) => void;
  onAdvanceProjectPhase: (projectId: string) => void;
  onGenerateAddonInvoice: (projectId: string, amount: number, description: string) => void;
  onSendInvoiceReminder: (invoiceId: string) => void;
}

export const AgencyOperations: React.FC<AgencyOperationsProps> = ({
  projects,
  invoices,
  onSelectProjectForClientView,
  onAdvanceProjectPhase,
  onGenerateAddonInvoice,
  onSendInvoiceReminder
}) => {
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [selectedProjForInvoice, setSelectedProjForInvoice] = useState(projects[0]?.id || '');
  const [invoiceAmount, setInvoiceAmount] = useState(450);
  const [invoiceDesc, setInvoiceDesc] = useState('Additional Geotargeted Landing Page');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const totalMRR = projects.reduce((sum, p) => sum + p.monthlyCarePrice, 0);
  const activeBuildsCount = projects.filter((p) => p.currentPhaseIndex < 5).length;
  const pendingRevenue = invoices
    .filter((i) => i.status === 'pending' || i.status === 'scheduled')
    .reduce((sum, i) => sum + i.amount, 0);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateAddonInvoice(selectedProjForInvoice, invoiceAmount, invoiceDesc);
    setShowAddInvoiceModal(false);
    setNotificationToast(`Invoice of $${invoiceAmount} generated & emailed to client.`);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const handleReminder = (invId: string) => {
    onSendInvoiceReminder(invId);
    setNotificationToast(`Automated payment reminder dispatched for invoice.`);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Alert */}
      {notificationToast && (
        <div className="p-4 bg-amber-950/80 border border-amber-500 rounded-xl text-xs text-amber-200 flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-400" />
            <span>{notificationToast}</span>
          </div>
          <button onClick={() => setNotificationToast(null)} className="text-amber-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0e1627] border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
            <span>Operations & Revenue Engine</span>
            <span aria-hidden="true">·</span>
            <span>Agency Operator View</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Agency Management Cockpit
          </h1>
          <p className="text-xs text-slate-400">
            Monitor all active small business client pipelines, automated billing triggers, and retainer health.
          </p>
        </div>

        <button
          onClick={() => setShowAddInvoiceModal(true)}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create Add-On Invoice</span>
        </button>
      </div>

      {/* Operator Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Active Client Care MRR</span>
          <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
            ${totalMRR.toLocaleString()}/mo
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Predictable recurring care revenue
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Active Website Builds</span>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {activeBuildsCount} Clients
          </div>
          <span className="text-[11px] text-emerald-400 block mt-1">
            ● Average 18-day completion cycle
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Unbilled / In-Flight Revenue</span>
          <div className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
            ${pendingRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Auto-triggered on milestone sign-offs
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Automated Auto-Pay Rate</span>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            100%
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Zero overdue manual chasing
          </span>
        </div>
      </div>

      {/* Client Pipeline Management */}
      <div className="bg-[#0e1627] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Active Client Delivery Pipeline</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Control project progression and review live staging links.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map((proj) => {
            const currentMilestone = proj.milestones[proj.currentPhaseIndex] || proj.milestones[0];
            const hasActionNeeded = currentMilestone.status === 'review_required';

            return (
              <div
                key={proj.id}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-white text-base font-display">
                      {proj.clientCompany}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">
                      · {proj.businessType}
                    </span>
                    {hasActionNeeded && (
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded text-[10px] font-semibold uppercase">
                        Awaiting Client Signoff
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span>Current Phase: <strong className="text-white">Phase {proj.currentPhaseIndex + 1} ({currentMilestone.title})</strong></span>
                    <span>Target Launch: <strong className="text-white font-mono">{proj.targetLaunchDate}</strong></span>
                    <span>Care Plan: <strong className="text-amber-400 font-mono">${proj.monthlyCarePrice}/mo</strong></span>
                  </div>

                  <p className="text-xs text-slate-400">
                    Lead: {proj.clientName} ({proj.contactEmail}) · Domain: <code className="text-slate-300">{proj.domainTarget}</code>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                  <button
                    onClick={() => onSelectProjectForClientView(proj.id)}
                    className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>View as Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onAdvanceProjectPhase(proj.id)}
                    disabled={proj.currentPhaseIndex >= 5}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Advance Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Automated Invoicing Triggers & Reminders */}
      <div className="bg-[#0e1627] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Upcoming & Scheduled Invoices</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated milestone webhooks trigger credit card charges upon phase approvals.
            </p>
          </div>
        </div>

        <div className="border border-slate-800 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-medium">Invoice #</th>
                <th className="py-3 px-4 font-medium">Client</th>
                <th className="py-3 px-4 font-medium">Milestone Trigger</th>
                <th className="py-3 px-4 font-medium text-right">Amount</th>
                <th className="py-3 px-4 font-medium text-center">Status</th>
                <th className="py-3 px-4 font-medium text-right">Operator Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 font-mono font-medium text-white">{inv.invoiceNumber}</td>
                  <td className="py-3 px-4 text-white font-medium">{inv.clientCompany}</td>
                  <td className="py-3 px-4 text-slate-400">{inv.title}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-white font-semibold">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {inv.status !== 'paid' && (
                      <button
                        onClick={() => handleReminder(inv.id)}
                        className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <BellRing className="w-3 h-3 text-amber-400" />
                        <span>Ping Client</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Addon Invoice Modal */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-bold text-white text-base">Generate Custom Add-On Invoice</h3>
            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Target Client Project</label>
                <select
                  value={selectedProjForInvoice}
                  onChange={(e) => setSelectedProjForInvoice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.clientCompany}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Invoice Amount ($ USD)</label>
                <input
                  type="number"
                  required
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Scope Description</label>
                <input
                  type="text"
                  required
                  value={invoiceDesc}
                  onChange={(e) => setInvoiceDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddInvoiceModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg"
                >
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
