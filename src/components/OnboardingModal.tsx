import React, { useState } from 'react';
import { ServicePackage, AddOnItem, BillingSchedule, BusinessIntakeSubmission } from '../types';
import { X, Check, CreditCard, Shield, ArrowRight, Sparkles, Building2, Globe, Clock } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  packages: ServicePackage[];
  addons: AddOnItem[];
  initialPackageId?: string;
  onClose: () => void;
  onSubmit: (submission: BusinessIntakeSubmission) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  packages,
  addons,
  initialPackageId = 'growth_booking',
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPkgId, setSelectedPkgId] = useState(initialPackageId);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['addon_booking_flow']);
  const [billingSchedule, setBillingSchedule] = useState<BillingSchedule>('milestone_50_50');

  // Client Details Form
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Home Services & Contractor');
  const [existingWebsite, setExistingWebsite] = useState('');
  const [domainPreference, setDomainPreference] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState<'leads' | 'bookings' | 'sales' | 'brand'>('leads');
  const [notes, setNotes] = useState('');

  // Payment mock
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentPkg = packages.find((p) => p.id === selectedPkgId) || packages[1];
  const selectedAddons = addons.filter((a) => selectedAddonIds.includes(a.id));

  const totalSetupPrice = currentPkg.setupPrice + selectedAddons.reduce((sum, a) => sum + a.setupPrice, 0);
  const totalMonthlyCare = currentPkg.monthlyCarePrice + selectedAddons.reduce((sum, a) => sum + a.monthlyPrice, 0);

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFillDemoData = () => {
    setBusinessName('Northstar Physical Therapy');
    setContactName('Dr. Gregory Vance');
    setEmail('gregory@northstarpt.com');
    setPhone('(617) 555-0199');
    setBusinessCategory('Medical Clinic & Physical Therapy');
    setDomainPreference('northstarpt-boston.com');
    setPrimaryGoal('bookings');
    setNotes('We need patient intake forms and online appointment requests linked to our staff calendar.');
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onSubmit({
        businessName: businessName || 'Northstar Physical Therapy',
        contactName: contactName || 'Dr. Gregory Vance',
        email: email || 'gregory@northstarpt.com',
        phone: phone || '(617) 555-0199',
        businessCategory,
        existingWebsite,
        targetAudience: 'Local community & referral patients',
        primaryGoal,
        packageId: selectedPkgId,
        selectedAddonIds,
        billingSchedule,
        domainPreference: domainPreference || `${(businessName || 'mybusiness').toLowerCase().replace(/\s+/g, '')}.com`,
        notes
      });
    }, 1200);
  };

  // Deposit calculation
  const depositAmount = billingSchedule === 'milestone_50_50' 
    ? Math.round(totalSetupPrice * 0.5) 
    : billingSchedule === 'milestone_33_33_34' 
    ? Math.round(totalSetupPrice * 0.33) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#0e1626] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d16]">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-semibold text-white">
              Launch Your Business Website
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Step {step} of 3
            </span>
          </div>
          <div className="flex items-center gap-3">
            {step === 2 && !businessName && (
              <button
                type="button"
                onClick={handleFillDemoData}
                className="text-[11px] text-amber-400 hover:text-amber-300 underline font-medium"
              >
                Auto-Fill Sample Business
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 border-b border-slate-800 text-xs font-medium text-center">
          <div className={`py-2.5 transition-colors ${step === 1 ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 bg-slate-900/40'}`}>
            1. Package & Add-Ons
          </div>
          <div className={`py-2.5 transition-colors ${step === 2 ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 bg-slate-900/40'}`}>
            2. Business Brief
          </div>
          <div className={`py-2.5 transition-colors ${step === 3 ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 bg-slate-900/40'}`}>
            3. Automated Billing & Kickoff
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-200 space-y-6">
          {/* STEP 1: Package & Add-ons */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Select Your Base Website Tier</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {packages.map((pkg) => {
                    const isSelected = selectedPkgId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-400/80 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-sm">{pkg.name}</span>
                          {pkg.isPopular && (
                            <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-lg font-bold text-white mb-1">
                          ${pkg.setupPrice.toLocaleString()}
                          <span className="text-xs font-normal text-slate-400 font-sans"> setup</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                          {pkg.tagline}
                        </p>
                        <div className="text-[11px] font-mono text-amber-300/90 pt-2 border-t border-slate-800/80">
                          +${pkg.monthlyCarePrice}/mo Care & Hosting
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons Picker */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Configure Optional Add-Ons</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addons.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-lg border cursor-pointer flex items-start gap-3 transition-all ${
                          isChecked
                            ? 'bg-slate-800/90 border-amber-400/60 text-white'
                            : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-600'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center text-xs font-medium">
                            <span className="truncate">{addon.name}</span>
                            <span className="font-mono text-amber-300 ml-2 shrink-0">
                              +${addon.setupPrice}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real-Time Total Estimate */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-xs text-slate-400 block">Estimated Investment</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xl font-bold text-white">
                      ${totalSetupPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400">one-time build</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs font-mono text-amber-400">
                      ${totalMonthlyCare}/mo
                    </span>
                    <span className="text-xs text-slate-400">Care Plan</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Business Brief Form */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Northstar Physical Therapy"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Owner / Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Dr. Gregory Vance"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="gregory@northstarpt.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Direct Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(617) 555-0199"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Business Category / Trade
                  </label>
                  <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-amber-400"
                  >
                    <option>Home Services & Contractor</option>
                    <option>Restaurant, Cafe & Wine Bar</option>
                    <option>Medical Clinic & Physical Therapy</option>
                    <option>Salon, Spa & Wellness Studio</option>
                    <option>Law Firm & Legal Advisory</option>
                    <option>Boutique Retail & Specialty Shop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Website Domain
                  </label>
                  <input
                    type="text"
                    value={domainPreference}
                    onChange={(e) => setDomainPreference(e.target.value)}
                    placeholder="e.g. northstarpt-boston.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Primary Website Objective
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPrimaryGoal('leads')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                      primaryGoal === 'leads'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-medium'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    Direct Phone Calls
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrimaryGoal('bookings')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                      primaryGoal === 'bookings'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-medium'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    Online Bookings
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrimaryGoal('sales')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                      primaryGoal === 'sales'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-medium'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    E-Commerce Sales
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrimaryGoal('brand')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                      primaryGoal === 'brand'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-medium'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    High-End Portfolio
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project Notes & Key Features Needed
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your current bottleneck, competitors you admire, or specific third-party tools you need integrated..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Back to Packages
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Select Billing Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Automated Billing Cadence & Checkout */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* Billing Schedule Options */}
              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Select Automated Billing Structure
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div
                    onClick={() => setBillingSchedule('milestone_50_50')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      billingSchedule === 'milestone_50_50'
                        ? 'border-amber-400 bg-amber-500/10 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">50/50 Milestone Split</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      50% deposit (${Math.round(totalSetupPrice * 0.5).toLocaleString()}) to begin sprint. Remaining 50% automatically charged upon your live staging signoff.
                    </p>
                  </div>

                  <div
                    onClick={() => setBillingSchedule('milestone_33_33_34')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      billingSchedule === 'milestone_33_33_34'
                        ? 'border-amber-400 bg-amber-500/10 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">3-Stage Progress Milestones</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      33% Kickoff, 33% Visual Design Signoff, and 34% Final Launch. Balanced cash flow for growing businesses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary & Automated Rule */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-300 font-medium">Selected Package:</span>
                  <span className="text-white font-semibold">{currentPkg.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-300 font-medium">Included Add-Ons:</span>
                  <span className="text-slate-300">
                    {selectedAddons.length > 0 ? selectedAddons.map((a) => a.name).join(', ') : 'None'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-300 font-medium">Total Project Setup:</span>
                  <span className="font-mono text-white font-bold">${totalSetupPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-amber-300 font-medium">Due Today (Kickoff Deposit):</span>
                  <span className="font-mono text-base font-bold text-amber-400">
                    ${depositAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Ongoing Monthly Care (Starts Post-Launch):</span>
                  <span className="font-mono text-slate-300">${totalMonthlyCare}/mo</span>
                </div>
              </div>

              {/* Simulated Card Payment Form */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    Payment Method for Deposit & Automated Care
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">256-bit Encrypted</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white focus:outline-hidden"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white text-center focus:outline-hidden"
                    />
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white text-center focus:outline-hidden"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  By clicking Launch Project, your card will be charged the ${depositAmount.toLocaleString()} deposit. Milestone billing will only trigger automatically when you review and approve project deliverables in your portal.
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Back to Details
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                      <span>Provisioning Project & Setting Up Billing...</span>
                    </>
                  ) : (
                    <>
                      <span>Authorize ${depositAmount.toLocaleString()} & Launch Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
