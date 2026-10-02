import React, { useState } from 'react';
import { X, Smartphone, Monitor, Tablet, ExternalLink, Check, Calendar, Phone, MapPin } from 'lucide-react';
import restaurantImage from '../assets/images/showcase_restaurant_site_1790941159837.jpg';
import craftsmanImage from '../assets/images/showcase_craftsman_site_1790941172900.jpg';

interface StagingPreviewModalProps {
  isOpen: boolean;
  projectCompany: string;
  businessType: string;
  onClose: () => void;
  onApproveFromPreview?: () => void;
}

export const StagingPreviewModal: React.FC<StagingPreviewModalProps> = ({
  isOpen,
  projectCompany,
  businessType,
  onClose,
  onApproveFromPreview
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'reservations' | 'story'>('home');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  if (!isOpen) return null;

  const isRestaurant = projectCompany.toLowerCase().includes('bella') || businessType.toLowerCase().includes('dining');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl h-[94vh] bg-[#0c121e] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Device & Toolbar Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#090d16] gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-white tracking-wide">Live Staging Sandbox</span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">· {projectCompany}</span>
          </div>

          {/* Viewport switchers */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                viewport === 'desktop' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Desktop View (1200px)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                viewport === 'tablet' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">Tablet</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                viewport === 'mobile' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">Mobile</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onApproveFromPreview && (
              <button
                onClick={onApproveFromPreview}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve Staging</span>
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

        {/* Browser URL Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0d1524] border-b border-slate-800/80 text-xs text-slate-400 font-mono">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            https://
          </span>
          <span className="text-slate-300 truncate">
            {isRestaurant ? 'staging-bellasorella.foundryweb.dev' : 'staging-highlandcraft.foundryweb.dev'}
          </span>
          <div className="ml-auto flex items-center gap-2 text-slate-500">
            <span>SSL Active</span>
            <span>·</span>
            <span>Speed: 98/100</span>
          </div>
        </div>

        {/* Viewport Frame Container */}
        <div className="flex-1 bg-slate-950 overflow-y-auto p-4 flex justify-center items-start">
          <div 
            className={`transition-all duration-300 bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden min-h-full ${
              viewport === 'desktop' ? 'w-full max-w-5xl' : viewport === 'tablet' ? 'w-[768px]' : 'w-[375px]'
            }`}
          >
            {/* Mock Client Website Nav */}
            <header className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800 sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wide">
                  {projectCompany}
                </span>
              </div>
              <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider text-stone-300 font-medium">
                <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-amber-300 underline underline-offset-4' : 'hover:text-white'}>
                  Overview
                </button>
                <button onClick={() => setActiveTab('menu')} className={activeTab === 'menu' ? 'text-amber-300 underline underline-offset-4' : 'hover:text-white'}>
                  {isRestaurant ? 'Dinner Menu' : 'Portfolio'}
                </button>
                <button onClick={() => setActiveTab('reservations')} className={activeTab === 'reservations' ? 'text-amber-300 underline underline-offset-4' : 'hover:text-white'}>
                  {isRestaurant ? 'Table Bookings' : 'Request Estimate'}
                </button>
              </nav>
              <button 
                onClick={() => setActiveTab('reservations')}
                className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-md transition-colors"
              >
                {isRestaurant ? 'Book Table' : 'Get Quote'}
              </button>
            </header>

            {/* Mock Website Body Content */}
            <div className="text-stone-900">
              {/* Hero Banner */}
              <div className="relative bg-stone-900 text-white min-h-[340px] flex items-center overflow-hidden">
                <img 
                  src={isRestaurant ? restaurantImage : craftsmanImage} 
                  alt={projectCompany} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent"></div>
                <div className="relative z-10 p-6 md:p-12 max-w-2xl space-y-3">
                  <span className="text-amber-400 font-mono text-xs tracking-wider uppercase">
                    {businessType}
                  </span>
                  <h1 className="font-serif text-2xl md:text-4xl font-bold leading-tight">
                    {isRestaurant
                      ? 'Authentic Wood-Fired Tuscan Flavors in the Heart of the City'
                      : 'Handcrafted Architectural Millwork & Bespoke Living Spaces'}
                  </h1>
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed max-w-lg">
                    {isRestaurant
                      ? 'Handmade pasta, wood-fired hearth specialties, and an organic wine list curated across small northern Italian estates.'
                      : 'From custom chef kitchens to historic restorations, our master carpenters construct timeless spaces with obsessive detail.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button 
                      onClick={() => setActiveTab('reservations')}
                      className="px-4 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-md shadow-md hover:bg-amber-400 transition-colors"
                    >
                      {isRestaurant ? 'Reserve a Table Online' : 'Schedule Discovery Consultation'}
                    </button>
                    <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5" /> (415) 882-9014
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust & Highlights Ribbon */}
              <div className="bg-stone-100 border-y border-stone-200 py-3 px-6 text-xs text-stone-600 flex flex-wrap justify-between items-center gap-4">
                <span className="font-medium text-stone-800">⭐ 4.9 Stars on Google (240+ Verified Local Reviews)</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-stone-500" /> 428 Montgomery St, Historic District</span>
                <span className="text-emerald-700 font-semibold">● Open Today: 5:00 PM – 10:30 PM</span>
              </div>

              {/* Dynamic Sub-tab views */}
              <div className="p-6 md:p-10 space-y-8">
                {activeTab === 'home' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-5 bg-stone-50 rounded-xl border border-stone-200">
                        <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                          {isRestaurant ? 'Handmade Daily' : 'Bespoke Craftsmanship'}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {isRestaurant 
                            ? 'Fresh pasta rolled every morning using organic heirloom wheat and farm eggs.'
                            : 'Every cabinet frame is hand-mortised in our local workshop using quarter-sawn white oak.'}
                        </p>
                      </div>
                      <div className="p-5 bg-stone-50 rounded-xl border border-stone-200">
                        <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                          {isRestaurant ? 'Wine Cellar Selection' : 'Turn-key Management'}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {isRestaurant
                            ? '120 low-intervention natural bottles from family vineyards across Tuscany & Piedmont.'
                            : 'From architectural permit drawings to final finish hardware installation.'}
                        </p>
                      </div>
                      <div className="p-5 bg-stone-50 rounded-xl border border-stone-200">
                        <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                          {isRestaurant ? 'Private Dining & Events' : 'Lifetime Guarantee'}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {isRestaurant
                            ? 'Host your celebration in our wine vault for up to 34 guests with customized menus.'
                            : 'Structural integrity warranty on all custom furniture and architectural built-ins.'}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Mock Booking Form */}
                    <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl border border-stone-800">
                      <div className="max-w-xl mx-auto space-y-4">
                        <div className="text-center space-y-1">
                          <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">
                            Interactive Booking Module
                          </span>
                          <h3 className="font-serif text-xl font-bold">
                            {isRestaurant ? 'Table Self-Reservation' : 'Request On-Site Project Consultation'}
                          </h3>
                        </div>

                        {bookingSubmitted ? (
                          <div className="bg-emerald-950/80 border border-emerald-600/40 p-4 rounded-xl text-center space-y-2">
                            <span className="text-emerald-400 font-semibold text-sm block">Reservation Confirmed!</span>
                            <p className="text-xs text-stone-300">
                              Automated confirmation sent to your phone. (Staging simulation working smoothly)
                            </p>
                            <button
                              onClick={() => setBookingSubmitted(false)}
                              className="text-xs text-amber-300 underline mt-2"
                            >
                              Reset Demo Booking
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <label className="block text-stone-400 mb-1">Date</label>
                              <input 
                                type="date" 
                                defaultValue="2026-10-24"
                                className="w-full bg-stone-800 border border-stone-700 rounded-md p-2 text-stone-100 text-xs" 
                              />
                            </div>
                            <div>
                              <label className="block text-stone-400 mb-1">
                                {isRestaurant ? 'Party Size' : 'Project Type'}
                              </label>
                              <select className="w-full bg-stone-800 border border-stone-700 rounded-md p-2 text-stone-100 text-xs">
                                <option>2 Guests (Dinner)</option>
                                <option>4 Guests (Booth)</option>
                                <option>6+ Guests (Wine Vault)</option>
                              </select>
                            </div>
                            <div className="sm:col-span-2">
                              <button
                                onClick={() => setBookingSubmitted(true)}
                                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors text-xs"
                              >
                                Test Live Booking API Response
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'menu' && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-bold text-stone-900 border-b pb-2">
                      {isRestaurant ? 'Autumn Trattoria Menu' : 'Signature Project Showcase'}
                    </h3>
                    <div className="divide-y divide-stone-200">
                      <div className="py-3 flex justify-between">
                        <div>
                          <h4 className="font-semibold text-sm text-stone-900">Tagliolini al Tartufo</h4>
                          <p className="text-xs text-stone-500">Hand-cut pasta, cultured butter, shaved black winter truffle</p>
                        </div>
                        <span className="font-mono font-semibold text-stone-800">$32</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <div>
                          <h4 className="font-semibold text-sm text-stone-900">Bistecca alla Fiorentina</h4>
                          <p className="text-xs text-stone-500">Dry-aged prime porterhouse, rosemary sea salt, wood-hearth charred</p>
                        </div>
                        <span className="font-mono font-semibold text-stone-800">$78</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <div>
                          <h4 className="font-semibold text-sm text-stone-900">Tiramisù Tradizionale</h4>
                          <p className="text-xs text-stone-500">Espresso-soaked savoiardi, mascarpone cream, dark cocoa</p>
                        </div>
                        <span className="font-mono font-semibold text-stone-800">$14</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reservations' && (
                  <div className="max-w-md mx-auto text-center space-y-4 py-8">
                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                      Direct Online Reservations
                    </h3>
                    <p className="text-xs text-stone-600">
                      Instant table confirmation powered by the custom reservation API integrated by Foundry Web Studio.
                    </p>
                    <button 
                      onClick={() => setBookingSubmitted(true)}
                      className="px-6 py-2.5 bg-amber-600 text-white font-semibold text-xs rounded-lg hover:bg-amber-500"
                    >
                      Confirm Staging Table Reservation
                    </button>
                  </div>
                )}
              </div>

              {/* Mock Client Website Footer */}
              <footer className="bg-stone-950 text-stone-400 p-6 text-xs border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span>© 2026 {projectCompany}. All rights reserved.</span>
                <span className="font-mono text-[11px] text-stone-500">
                  Designed & Maintained on Foundry Care Plan ($149/mo)
                </span>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
