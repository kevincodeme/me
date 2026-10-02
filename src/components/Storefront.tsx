import React, { useState } from 'react';
import { ServicePackage, AddOnItem } from '../types';
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  BarChart3, 
  Layers, 
  Calendar,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import heroImage from '../assets/images/hero_studio_workspace_1790941141354.jpg';
import restaurantImage from '../assets/images/showcase_restaurant_site_1790941159837.jpg';
import craftsmanImage from '../assets/images/showcase_craftsman_site_1790941172900.jpg';
import leadAvatar from '../assets/images/avatar_agency_lead_1790941183459.jpg';

interface StorefrontProps {
  packages: ServicePackage[];
  addons: AddOnItem[];
  onSelectPackage: (packageId: string) => void;
  onOpenIntake: (packageId?: string) => void;
  onViewCaseStudyStaging: (businessName: string, businessType: string) => void;
  onViewTracker: () => void;
}

export const Storefront: React.FC<StorefrontProps> = ({
  packages,
  addons,
  onSelectPackage,
  onOpenIntake,
  onViewCaseStudyStaging,
  onViewTracker
}) => {
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['addon_booking_flow']);
  const [activePackageId, setActivePackageId] = useState<string>('growth_booking');

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const currentPkg = packages.find((p) => p.id === activePackageId) || packages[1];
  const selectedAddons = addons.filter((a) => selectedAddonIds.includes(a.id));
  const totalSetup = currentPkg.setupPrice + selectedAddons.reduce((sum, a) => sum + a.setupPrice, 0);
  const totalMonthly = currentPkg.monthlyCarePrice + selectedAddons.reduce((sum, a) => sum + a.monthlyPrice, 0);

  return (
    <div className="w-full space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide">
              <span>Bespoke Web Engineering</span>
              <span aria-hidden="true">·</span>
              <span>Automated Milestone Invoicing</span>
              <span aria-hidden="true">·</span>
              <span>100% Scope Transparency</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              High-converting websites for small business owners. Built with zero friction.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              We design, engineer, and host bespoke websites that drive inbound phone calls and self-scheduling appointments. Track every sprint deliverable in real-time with automated milestone billing and ongoing care.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenIntake(activePackageId)}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-amber-400/10"
              >
                <span>Configure & Start Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewTracker}
                className="px-5 py-3.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>Preview Live Project Tracker</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
            </div>

            {/* Social Proof adjacency */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-xs">
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-white block">
                  18 Days
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">
                  Average Intake to Live Launch
                </span>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-white block">
                  100%
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">
                  Signoff Before Final Billing
                </span>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-white block">
                  99.98%
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">
                  Cloudflare Enterprise Uptime
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src={heroImage}
                alt="Foundry Web Studio workspace and web development engineering station"
                className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent"></div>
              
              {/* Overlay reassurance card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Automated Milestone Escrow
                  </span>
                  <span className="font-mono text-[11px] text-amber-400">Phase 4 / 6</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-tight">
                  Your funds are protected: Final invoices only process when you approve staging deliverables in your client dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICE TIERS & PRICING */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs text-amber-400 font-mono uppercase tracking-wider">
            Clear Pricing · No Hidden Fees
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Website packages tailored for small businesses
          </h2>
          <p className="text-sm text-slate-400">
            Every package includes responsive UI design, lightning speed hosting, on-page SEO, and automated milestone tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg) => {
            const isSelected = activePackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col p-6 sm:p-8 transition-all ${
                  pkg.isPopular
                    ? 'bg-slate-900/90 border-2 border-amber-400/80 shadow-xl shadow-amber-400/5'
                    : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-full shadow-md">
                    Recommended for Most Businesses
                  </div>
                )}

                <div className="mb-6 space-y-2">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 min-h-[36px]">
                    {pkg.tagline}
                  </p>
                  <div className="text-[11px] text-amber-300/80 font-mono">
                    Best for: {pkg.targetAudience}
                  </div>
                </div>

                <div className="pb-6 mb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-white">
                      ${pkg.setupPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400">setup</span>
                  </div>
                  <div className="text-xs font-mono text-slate-300 mt-1 flex items-center gap-1.5">
                    <span className="text-amber-400 font-semibold">+${pkg.monthlyCarePrice}/mo</span>
                    <span className="text-slate-500">· Care, Hosting & Backups</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 flex-1 mb-8">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-medium text-white">{pkg.pagesCount}</span>
                    </li>
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setActivePackageId(pkg.id);
                      onOpenIntake(pkg.id);
                    }}
                    className={`w-full py-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      pkg.isPopular
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActivePackageId(pkg.id)}
                    className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Calculate Add-Ons for this tier ↓
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE ADD-ON & BILLING ESTIMATOR */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#0e1627] border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs text-amber-400 font-mono uppercase tracking-wider mb-1">
                Custom Scope Configurator
              </div>
              <h3 className="text-2xl font-bold text-white">
                Customize with High-Impact Add-Ons
              </h3>
            </div>
            <div className="text-xs text-slate-400">
              Active Tier: <span className="text-white font-semibold">{currentPkg.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addons.map((addon) => {
              const isChecked = selectedAddonIds.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                    isChecked
                      ? 'bg-slate-800/80 border-amber-400/80 text-white shadow-md'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                      isChecked
                        ? 'bg-amber-400 border-amber-400 text-slate-950'
                        : 'border-slate-600 bg-slate-900'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-white text-sm">{addon.name}</span>
                      <span className="font-mono text-amber-400 ml-2">
                        +${addon.setupPrice}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {addon.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calculator Output & Action */}
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800/90 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Configured Investment Total:</span>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-white">
                  ${totalSetup.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">Total Setup</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono text-lg font-bold text-amber-400">
                  ${totalMonthly}/mo
                </span>
                <span className="text-xs text-slate-400">Care Retainer</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Split into 50% kickoff deposit (${Math.round(totalSetup * 0.5).toLocaleString()}) and 50% upon final staging signoff.
              </p>
            </div>

            <button
              onClick={() => onOpenIntake(activePackageId)}
              className="w-full md:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Lock In Quote & Onboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. REAL EVIDENCE & CASE STUDIES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="text-xs text-amber-400 font-mono uppercase tracking-wider mb-1">
              Proven Outcomes · Real Clients
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Websites that pay for themselves in weeks
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Interactive Staging Sandboxes Available
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Case Study 1: Bella Sorella */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700 transition-all">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              <img
                src={restaurantImage}
                alt="Bella Sorella Trattoria website on tablet in restaurant"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/75 backdrop-blur-xs text-amber-300 font-mono text-[11px] rounded-md border border-slate-700">
                Italian Trattoria & Wine Bar
              </div>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold text-white">Bella Sorella Trattoria</h3>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">
                    +240% Direct Bookings
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Replaced an outdated PDF menu site with a custom online table reservation engine, mobile wine showcase, and automatic SMS confirmations, eliminating $1,800/mo in third-party marketplace booking commissions.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
                  <span>Growth Package ($3,800)</span>
                  <span aria-hidden="true">·</span>
                  <span>14-Day Delivery</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400">Active Care Plan</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onViewCaseStudyStaging('Bella Sorella Trattoria', 'Italian Dining & Wine Bar')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Test Live Staging Sandbox</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onViewTracker}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  View Project Milestone Tracker
                </button>
              </div>
            </div>
          </div>

          {/* Case Study 2: Highland Precision Craftsmen */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700 transition-all">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              <img
                src={craftsmanImage}
                alt="Highland Precision Craftsmen contractor website on laptop in workshop"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/75 backdrop-blur-xs text-amber-300 font-mono text-[11px] rounded-md border border-slate-700">
                Residential Builder & Cabinetry
              </div>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold text-white">Highland Precision Craftsmen</h3>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">
                    +$340K Pipeline
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Crafted an architectural portfolio with before-and-after project sliders, customer video testimonials, and an interactive quote calculator that filters for high-budget residential renovations.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
                  <span>Local Presence + Copywriting ($3,500)</span>
                  <span aria-hidden="true">·</span>
                  <span>19-Day Turnaround</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onViewCaseStudyStaging('Highland Precision Craftsmen', 'Custom Cabinetry & Renovations')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Test Live Staging Sandbox</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onViewTracker}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  View Milestone Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL PROCESS (HOW WE WORK) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 sm:p-12">
          <div className="max-w-2xl mb-10 space-y-2">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              The 4-Step Client Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How our automated milestone delivery works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              No endless email threads. No surprise invoices. Every step is tracked transparently in your client portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="space-y-2">
              <span className="font-mono text-amber-400 text-lg font-bold block">01</span>
              <h4 className="font-semibold text-white text-sm">Brief & Architecture</h4>
              <p className="text-slate-400 leading-relaxed">
                Submit your business brief and brand assets. We generate your sitemap blueprint and auto-bill the 50% kickoff deposit.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-amber-400 text-lg font-bold block">02</span>
              <h4 className="font-semibold text-white text-sm">Design & Hi-Fi Review</h4>
              <p className="text-slate-400 leading-relaxed">
                Review interactive Figma prototypes for desktop and mobile. Approve layouts with one click or submit pinpoint revisions.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-amber-400 text-lg font-bold block">03</span>
              <h4 className="font-semibold text-white text-sm">Production Staging</h4>
              <p className="text-slate-400 leading-relaxed">
                Interact with the functioning staging website on your actual smartphone. Test contact forms, booking calendar, and speed.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-amber-400 text-lg font-bold block">04</span>
              <h4 className="font-semibold text-white text-sm">Go-Live & Automated Care</h4>
              <p className="text-slate-400 leading-relaxed">
                Approve staging to automatically trigger final balance invoice and DNS launch. Ongoing care plan keeps site secure 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL & AGENCY FOUNDER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#0b101c] border border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8">
          <img
            src={leadAvatar}
            alt="Creative Director portrait"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-400/40 shrink-0"
          />
          <div className="space-y-3 flex-1 text-center md:text-left">
            <p className="text-base sm:text-lg text-slate-200 italic font-serif leading-relaxed">
              "Most web agencies either charge $20,000 for slow enterprise work, or leave small business owners stranded with broken DIY templates. We built Foundry Web Studio to give local trades, clinics, and restaurateurs high-converting websites with absolute milestone transparency and predictable care."
            </p>
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-white">Clara Sterling</span>
              <span aria-hidden="true"> · </span>
              <span>Principal Engineer & Founder, Foundry Web Studio</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="bg-gradient-to-b from-slate-900 to-[#0c121e] border border-slate-800 rounded-2xl p-8 sm:p-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to upgrade your business website?
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Choose your package, customize your automated billing terms, and start tracking your new site today.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenIntake(activePackageId)}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors inline-flex items-center gap-2 shadow-xl shadow-amber-400/10"
            >
              <span>Start Your Project Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
