import React, { useState } from 'react';
import { Invoice, Project } from '../types';
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  FileText, 
  RefreshCw, 
  Lock,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { InvoiceModal } from './InvoiceModal';

interface BillingCenterProps {
  invoices: Invoice[];
  projects: Project[];
  activeProjectId: string;
  onPayInvoice: (invoiceId: string) => void;
  onSelectProject: (projectId: string) => void;
}

export const BillingCenter: React.FC<BillingCenterProps> = ({
  invoices,
  projects,
  activeProjectId,
  onPayInvoice,
  onSelectProject
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState<string | null>(null);
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'scheduled'>('all');

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const handlePayNow = (id: string) => {
    onPayInvoice(id);
    const inv = invoices.find((i) => i.id === id);
    setPaymentSuccessToast(`Payment of $${inv?.amount.toLocaleString()} processed successfully.`);
    if (selectedInvoice && selectedInvoice.id === id) {
      setSelectedInvoice({
        ...selectedInvoice,
        status: 'paid',
        paidDate: new Date().toISOString().split('T')[0]
      });
    }
    setTimeout(() => setPaymentSuccessToast(null), 4000);
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (filter === 'all') return true;
    return inv.status === filter;
  });

  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);
  const totalOutstanding = invoices
    .filter((i) => i.status === 'pending' || i.status === 'scheduled')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast alert */}
      {paymentSuccessToast && (
        <div className="p-4 bg-emerald-950 border border-emerald-500 rounded-xl text-xs text-emerald-300 flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{paymentSuccessToast}</span>
          </div>
          <button onClick={() => setPaymentSuccessToast(null)} className="text-emerald-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0e1627] border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
            <span>Automated Invoicing & Subscriptions</span>
            <span aria-hidden="true">·</span>
            <span>Zero Manual Invoicing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Billing & Retainer Management
          </h1>
          <p className="text-xs text-slate-400">
            Automated milestone escrow release and ongoing website care subscriptions.
          </p>
        </div>

        {/* Client selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">Client Account:</span>
          <select
            value={activeProject?.id}
            onChange={(e) => onSelectProject(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-hidden focus:border-amber-400"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.clientCompany}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Total Settled to Date</span>
          <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
            ${totalPaid.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Processed via automated card escrow
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Scheduled / Pending Balance</span>
          <div className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
            ${totalOutstanding.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Linked to upcoming milestone approvals
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Monthly Care Subscription</span>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            ${activeProject ? activeProject.monthlyCarePrice : 149}/mo
          </div>
          <span className="text-[11px] text-emerald-400 block mt-1">
            ● Active Auto-Pay · Next cycle Nov 1, 2026
          </span>
        </div>
      </div>

      {/* Subscription Care Card & Auto-Pay Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Ongoing Care Plan */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#0e1628] to-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-start pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Continuous Care Contract
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Website Care & Hosting Plan
              </h3>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md text-xs font-semibold">
              Active
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Monthly Cadence:</span>
              <span className="font-mono font-semibold text-white">
                ${activeProject ? activeProject.monthlyCarePrice : 149}/month
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Primary Payment Card:</span>
              <span className="font-mono text-slate-200">Mastercard (•••• 4242)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Billing Logic:</span>
              <span className="text-slate-200">Auto-charges on the 1st</span>
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">
              Care Retainer Inclusions:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Lightning Cloudflare CDN & SSL Certificate</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Daily automated encrypted cloud backups</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>24/7 uptime monitoring & malware scanning</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Up to 2 hours of monthly content or menu edits</span>
              </li>
            </ul>
          </div>

          {/* Auto Pay Toggle */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-white font-medium">Automatic Escrow Settlement</span>
            </div>
            <button
              onClick={() => setAutoPayEnabled(!autoPayEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                autoPayEnabled ? 'bg-amber-400' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  autoPayEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Invoices Ledger Table */}
        <div className="lg:col-span-7 bg-[#0e1627] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base">Invoices & Milestone Slips</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Downloadable PDF receipts and automated transaction logs.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({invoices.length})
              </button>
              <button
                onClick={() => setFilter('paid')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filter === 'paid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Paid
              </button>
              <button
                onClick={() => setFilter('scheduled')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filter === 'scheduled' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Scheduled
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-slate-800 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="py-3 px-4 font-medium">Invoice #</th>
                  <th className="py-3 px-4 font-medium">Description</th>
                  <th className="py-3 px-4 font-medium">Due Date</th>
                  <th className="py-3 px-4 font-medium text-right">Amount</th>
                  <th className="py-3 px-4 font-medium text-center">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-white whitespace-nowrap">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <div className="font-medium text-white truncate max-w-[200px]">{inv.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{inv.clientCompany}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                      {inv.dueDate}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-white font-semibold whitespace-nowrap">
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {inv.status === 'paid' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          Paid
                        </span>
                      )}
                      {inv.status === 'scheduled' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <Clock className="w-3 h-3" />
                          Auto-Sched
                        </span>
                      )}
                      {inv.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          <AlertCircle className="w-3 h-3" />
                          Due
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded text-xs transition-colors"
                        >
                          View Slip
                        </button>
                        {inv.status === 'pending' && (
                          <button
                            onClick={() => handlePayNow(inv.id)}
                            className="px-2.5 py-1 text-slate-950 font-bold bg-amber-400 hover:bg-amber-300 rounded text-xs transition-colors shadow-xs"
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Automated Billing Flow Explanation */}
          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl text-xs space-y-2">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              How Milestone Billing Protects You
            </span>
            <p className="text-slate-400 leading-relaxed">
              Foundry Web Studio uses an automated escrow workflow. When you approve Phase 4 (Staging Signoff), the final milestone balance is authorized and settles automatically upon DNS domain propagation. You never pay for unapproved work.
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Detail Slip Modal */}
      <InvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onPayNow={handlePayNow}
      />
    </div>
  );
};
