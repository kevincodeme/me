import React from 'react';
import { Invoice } from '../types';
import { X, Printer, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onPayNow?: (invoiceId: string) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose, onPayNow }) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0b0f19]">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-semibold text-white">Invoice Slip</span>
            <span className="text-xs text-slate-400 font-mono">{invoice.invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 bg-[#0f172a] text-slate-200 print:bg-white print:text-black">
          {/* Brand & Status Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="font-display text-2xl font-bold tracking-tight text-white print:text-black">
                Foundry Web Studio
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Modern Digital Infrastructure for Local Businesses
              </p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                billing@foundryweb.studio · Tax ID: 94-3829104
              </p>
            </div>

            <div className="flex flex-col items-end">
              {invoice.status === 'paid' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md text-xs font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Paid in Full</span>
                </div>
              )}
              {invoice.status === 'scheduled' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md text-xs font-semibold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Auto-Scheduled</span>
                </div>
              )}
              {invoice.status === 'pending' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-md text-xs font-semibold uppercase tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Payment Pending</span>
                </div>
              )}
              <span className="text-xs text-slate-400 font-mono mt-1">
                Issued: {invoice.issueDate}
              </span>
            </div>
          </div>

          {/* Client & Billing Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/80">
              <span className="text-slate-400 font-medium block mb-1">Billed To:</span>
              <p className="font-semibold text-white text-sm">{invoice.clientCompany}</p>
              <p className="text-slate-300 font-mono mt-0.5">{invoice.clientEmail}</p>
              <p className="text-slate-400 mt-1">Direct Client Account</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/80">
              <span className="text-slate-400 font-medium block mb-1">Payment Details:</span>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Due Date:</span>
                <span className="font-mono text-slate-200">{invoice.dueDate}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Payment Method:</span>
                <span className="text-slate-200">{invoice.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Auto-Pay Status:</span>
                <span className={invoice.autoPayEnabled ? "text-emerald-400" : "text-slate-400"}>
                  {invoice.autoPayEnabled ? "Enabled (Auto-settled)" : "Manual Invoice"}
                </span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Description</th>
                  <th className="py-2.5 px-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {invoice.lineItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 text-slate-200">{item.description}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-200 font-medium">
                      ${item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-900/90 border-t border-slate-700/80">
                <tr>
                  <td className="py-3 px-4 text-right font-semibold text-slate-300">Total Balance:</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-lg font-bold text-white">
                    ${invoice.amount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Automated Billing Terms & Note */}
          <div className="text-xs text-slate-400 bg-slate-900/40 p-4 rounded-lg border border-slate-800/60">
            <span className="font-semibold text-slate-300 block mb-1">Automated Project Billing Terms:</span>
            <p>
              Invoices for milestones are linked directly to your project tracker phases. Final launch invoices are automatically charged once staging approval is granted by the client, ensuring work is fully reviewed before settlement.
            </p>
            {invoice.notes && (
              <p className="mt-2 text-slate-300 font-medium">
                Note: {invoice.notes}
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0b0f19]">
          <span className="text-xs text-slate-500">
            Secure 256-Bit SSL Encrypted Transaction
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            {invoice.status === 'pending' && onPayNow && (
              <button
                onClick={() => onPayNow(invoice.id)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-md"
              >
                Pay ${invoice.amount.toLocaleString()} Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
