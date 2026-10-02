import React, { useState, useEffect } from 'react';
import { 
  Project, 
  Invoice, 
  ServicePackage, 
  AddOnItem, 
  BusinessIntakeSubmission, 
  ProjectMilestone,
  MilestoneStatus 
} from './types';
import { 
  SERVICE_PACKAGES, 
  ADDONS_CATALOG, 
  INITIAL_PROJECTS, 
  INITIAL_INVOICES 
} from './data/initialData';
import { Navbar, ActiveView } from './components/Navbar';
import { Storefront } from './components/Storefront';
import { ProjectTracker } from './components/ProjectTracker';
import { BillingCenter } from './components/BillingCenter';
import { AgencyOperations } from './components/AgencyOperations';
import { OnboardingModal } from './components/OnboardingModal';
import { StagingPreviewModal } from './components/StagingPreviewModal';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<ActiveView>('storefront');
  const [activeProjectId, setActiveProjectId] = useState<string>(INITIAL_PROJECTS[0].id);

  // Core Data State (with safe localStorage persistence)
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('foundry_projects');
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or restricted:', e);
    }
    return INITIAL_PROJECTS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('foundry_invoices');
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or restricted:', e);
    }
    return INITIAL_INVOICES;
  });

  // Modals state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingTargetPackageId, setOnboardingTargetPackageId] = useState<string>('growth_booking');
  const [caseStudyStagingModal, setCaseStudyStagingModal] = useState<{
    isOpen: boolean;
    company: string;
    businessType: string;
  }>({
    isOpen: false,
    company: '',
    businessType: ''
  });

  // Sync to local storage safely
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('foundry_projects', JSON.stringify(projects));
      }
    } catch (e) {
      console.warn('Failed to save projects to localStorage:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('foundry_invoices', JSON.stringify(invoices));
      }
    } catch (e) {
      console.warn('Failed to save invoices to localStorage:', e);
    }
  }, [invoices]);

  // Handle new small business onboarding
  const handleCompleteOnboarding = (submission: BusinessIntakeSubmission) => {
    const pkg = SERVICE_PACKAGES.find((p) => p.id === submission.packageId) || SERVICE_PACKAGES[1];
    const selectedAddons = ADDONS_CATALOG.filter((a) => submission.selectedAddonIds.includes(a.id));
    const totalSetup = pkg.setupPrice + selectedAddons.reduce((sum, a) => sum + a.setupPrice, 0);
    const totalCare = pkg.monthlyCarePrice + selectedAddons.reduce((sum, a) => sum + a.monthlyPrice, 0);

    const deposit = submission.billingSchedule === 'milestone_50_50' 
      ? Math.round(totalSetup * 0.5) 
      : Math.round(totalSetup * 0.33);

    const newProjectId = `proj_${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    const newProject: Project = {
      id: newProjectId,
      clientName: submission.contactName,
      clientCompany: submission.businessName,
      businessType: submission.businessCategory,
      contactEmail: submission.email,
      contactPhone: submission.phone,
      domainTarget: submission.domainPreference,
      packageId: submission.packageId,
      selectedAddonIds: submission.selectedAddonIds,
      billingSchedule: submission.billingSchedule,
      totalSetupPrice: totalSetup,
      monthlyCarePrice: totalCare,
      currentPhaseIndex: 0,
      startDate: today,
      targetLaunchDate: '2026-11-04',
      stagingUrl: `https://staging-${submission.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.foundryweb.dev`,
      milestones: [
        {
          id: `m_${Date.now()}_1`,
          phaseNumber: 1,
          title: 'Brand Intake, Sitemap & Architecture',
          description: 'Review brand questionnaire, sitemap structure, and copy assets.',
          status: 'in_progress',
          estimatedDate: '2026-10-09',
          approvalStatus: 'pending_review',
          deliverable: {
            name: 'Information Architecture Blueprint',
            type: 'pdf',
            url: '#',
            previewSnippet: `Structural wireframe for ${submission.businessName} focusing on ${submission.primaryGoal}.`
          },
          billingTriggerNotice: `Deposit of $${deposit.toLocaleString()} charged upon kickoff.`
        },
        {
          id: `m_${Date.now()}_2`,
          phaseNumber: 2,
          title: 'Visual Design & Mobile Wireframes',
          description: 'High-fidelity Figma mockups tailored to your brand identity.',
          status: 'pending',
          estimatedDate: '2026-10-18',
          approvalStatus: 'pending_review'
        },
        {
          id: `m_${Date.now()}_3`,
          phaseNumber: 3,
          title: 'Production Frontend Engineering',
          description: 'Fast, responsive development with form routing and SEO schema.',
          status: 'pending',
          estimatedDate: '2026-10-25',
          approvalStatus: 'pending_review'
        },
        {
          id: `m_${Date.now()}_4`,
          phaseNumber: 4,
          title: 'Client Walkthrough & Staging Review',
          description: 'Interactive test sandbox on desktop, tablet, and mobile devices.',
          status: 'pending',
          estimatedDate: '2026-10-29',
          approvalStatus: 'pending_review'
        },
        {
          id: `m_${Date.now()}_5`,
          phaseNumber: 5,
          title: 'Quality Assurance, Speed & Security Audit',
          description: 'Google PageSpeed 95+ optimization and cross-browser testing.',
          status: 'pending',
          estimatedDate: '2026-11-01',
          approvalStatus: 'pending_review'
        },
        {
          id: `m_${Date.now()}_6`,
          phaseNumber: 6,
          title: 'DNS Transfer & Live Go-Live Launch',
          description: 'Point domain, enable Cloudflare SSL, and activate monthly care.',
          status: 'pending',
          estimatedDate: '2026-11-04',
          approvalStatus: 'pending_review'
        }
      ],
      activityLog: [
        {
          id: `act_${Date.now()}`,
          timestamp: `${today} 09:30`,
          title: 'Project Initialized & Deposit Auto-Paid',
          description: `Kickoff deposit invoice #FW-2026-${Math.floor(100 + Math.random() * 900)} for $${deposit.toLocaleString()} processed via automated escrow.`,
          actor: 'system',
          type: 'billing'
        }
      ]
    };

    // Auto-generate kickoff deposit invoice (Paid)
    const depositInvoice: Invoice = {
      id: `inv_${Date.now()}_dep`,
      invoiceNumber: `FW-2026-${Math.floor(200 + Math.random() * 800)}`,
      projectId: newProjectId,
      clientCompany: submission.businessName,
      clientEmail: submission.email,
      issueDate: today,
      dueDate: today,
      paidDate: today,
      amount: deposit,
      status: 'paid',
      title: 'Project Kickoff Deposit',
      category: 'deposit',
      lineItems: [
        {
          id: `li_${Date.now()}_1`,
          description: `${pkg.name} Kickoff Initial Deposit`,
          amount: deposit
        }
      ],
      paymentMethod: 'Credit Card ending in 4242',
      autoPayEnabled: true,
      notes: 'Paid immediately during project onboarding.'
    };

    // Auto-generate final balance invoice (Scheduled)
    const finalInvoice: Invoice = {
      id: `inv_${Date.now()}_final`,
      invoiceNumber: `FW-2026-${Math.floor(200 + Math.random() * 800)}`,
      projectId: newProjectId,
      clientCompany: submission.businessName,
      clientEmail: submission.email,
      issueDate: today,
      dueDate: '2026-11-04',
      amount: totalSetup - deposit,
      status: 'scheduled',
      title: 'Final Launch Delivery Balance',
      category: 'launch_final',
      lineItems: [
        {
          id: `li_${Date.now()}_2`,
          description: `${pkg.name} Final Live Sign-Off Balance`,
          amount: totalSetup - deposit
        }
      ],
      paymentMethod: 'Credit Card ending in 4242',
      autoPayEnabled: true,
      notes: 'Scheduled for automatic release upon client staging signoff.'
    };

    setProjects((prev) => [newProject, ...prev]);
    setInvoices((prev) => [depositInvoice, finalInvoice, ...prev]);
    setActiveProjectId(newProjectId);
    setIsOnboardingOpen(false);
    setCurrentView('tracker');
  };

  // Milestone Approval Handler
  const handleApproveMilestone = (projectId: string, milestoneId: string) => {
    const today = new Date().toISOString().split('T')[0];

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;

        const currentMilestoneIndex = proj.milestones.findIndex((m) => m.id === milestoneId);
        if (currentMilestoneIndex === -1) return proj;

        const updatedMilestones = proj.milestones.map((m, idx) => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'completed' as const,
              approvalStatus: 'approved' as const,
              completedDate: today
            };
          }
          // Advance next milestone to review or in_progress
          if (idx === currentMilestoneIndex + 1) {
            return {
              ...m,
              status: (idx === 3 ? 'review_required' : 'in_progress') as MilestoneStatus
            };
          }
          return m;
        });

        const nextPhaseIndex = Math.min(proj.currentPhaseIndex + 1, proj.milestones.length - 1);

        const newLog = {
          id: `act_${Date.now()}`,
          timestamp: `${today} 15:45`,
          title: `Phase ${currentMilestoneIndex + 1} Approved`,
          description: `${proj.clientCompany} authorized completion of "${proj.milestones[currentMilestoneIndex].title}".`,
          actor: 'client' as const,
          type: 'milestone' as const
        };

        return {
          ...proj,
          currentPhaseIndex: nextPhaseIndex,
          milestones: updatedMilestones,
          activityLog: [newLog, ...proj.activityLog]
        };
      })
    );
  };

  // Client Revision Request Handler
  const handleRequestRevisions = (
    projectId: string,
    milestoneId: string,
    revisionText: string,
    priority: 'high' | 'medium' | 'low'
  ) => {
    const today = new Date().toISOString().split('T')[0];

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;

        const updatedMilestones = proj.milestones.map((m) => {
          if (m.id !== milestoneId) return m;
          const existingRevs = m.revisionsRequested || [];
          return {
            ...m,
            approvalStatus: 'changes_requested' as const,
            revisionsRequested: [
              ...existingRevs,
              {
                date: today,
                requestText: revisionText,
                priority,
                resolved: false
              }
            ]
          };
        });

        const newLog = {
          id: `act_${Date.now()}`,
          timestamp: `${today} 16:10`,
          title: 'Client Revisions Requested',
          description: revisionText,
          actor: 'client' as const,
          type: 'revision' as const
        };

        return {
          ...proj,
          milestones: updatedMilestones,
          activityLog: [newLog, ...proj.activityLog]
        };
      })
    );
  };

  // Invoice Payment Handler
  const handlePayInvoice = (invoiceId: string) => {
    const today = new Date().toISOString().split('T')[0];

    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'paid',
            paidDate: today
          };
        }
        return inv;
      })
    );

    // Also add to project log
    const targetInvoice = invoices.find((i) => i.id === invoiceId);
    if (targetInvoice) {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === targetInvoice.projectId) {
            return {
              ...p,
              activityLog: [
                {
                  id: `act_${Date.now()}`,
                  timestamp: `${today} 11:20`,
                  title: `Invoice ${targetInvoice.invoiceNumber} Settled`,
                  description: `$${targetInvoice.amount.toLocaleString()} paid via automated credit card transaction.`,
                  actor: 'system',
                  type: 'billing'
                },
                ...p.activityLog
              ]
            };
          }
          return p;
        })
      );
    }
  };

  // Agency Operations Handlers
  const handleAdvanceProjectPhase = (projectId: string) => {
    const targetProj = projects.find((p) => p.id === projectId);
    if (!targetProj) return;
    const currentM = targetProj.milestones[targetProj.currentPhaseIndex];
    if (currentM) {
      handleApproveMilestone(projectId, currentM.id);
    }
  };

  const handleGenerateAddonInvoice = (projectId: string, amount: number, description: string) => {
    const targetProj = projects.find((p) => p.id === projectId);
    if (!targetProj) return;

    const today = new Date().toISOString().split('T')[0];
    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `FW-2026-${Math.floor(300 + Math.random() * 600)}`,
      projectId,
      clientCompany: targetProj.clientCompany,
      clientEmail: targetProj.contactEmail,
      issueDate: today,
      dueDate: today,
      amount,
      status: 'pending',
      title: description,
      category: 'addon',
      lineItems: [
        {
          id: `li_${Date.now()}`,
          description,
          amount
        }
      ],
      paymentMethod: 'Mastercard ending in 4242',
      autoPayEnabled: true,
      notes: 'Custom scope item added by agency operations.'
    };

    setInvoices((prev) => [newInvoice, ...prev]);
  };

  const handleSendInvoiceReminder = (invoiceId: string) => {
    console.log(`Dispatched automated billing reminder for invoice: ${invoiceId}`);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Bar Contract (3 zones) */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onStartProject={() => {
          setOnboardingTargetPackageId('growth_booking');
          setIsOnboardingOpen(true);
        }}
        activeClientCount={projects.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'storefront' && (
          <Storefront
            packages={SERVICE_PACKAGES}
            addons={ADDONS_CATALOG}
            onSelectPackage={(pkgId) => {
              setOnboardingTargetPackageId(pkgId);
              setIsOnboardingOpen(true);
            }}
            onOpenIntake={(pkgId) => {
              if (pkgId) setOnboardingTargetPackageId(pkgId);
              setIsOnboardingOpen(true);
            }}
            onViewCaseStudyStaging={(company, bType) => {
              setCaseStudyStagingModal({
                isOpen: true,
                company,
                businessType: bType
              });
            }}
            onViewTracker={() => setCurrentView('tracker')}
          />
        )}

        {currentView === 'tracker' && (
          <ProjectTracker
            projects={projects}
            activeProjectId={activeProjectId}
            onSelectProject={setActiveProjectId}
            onApproveMilestone={handleApproveMilestone}
            onRequestRevisions={handleRequestRevisions}
            onNavigateToBilling={() => setCurrentView('billing')}
          />
        )}

        {currentView === 'billing' && (
          <BillingCenter
            invoices={invoices}
            projects={projects}
            activeProjectId={activeProjectId}
            onPayInvoice={handlePayInvoice}
            onSelectProject={setActiveProjectId}
          />
        )}

        {currentView === 'agency' && (
          <AgencyOperations
            projects={projects}
            invoices={invoices}
            onSelectProjectForClientView={(projId) => {
              setActiveProjectId(projId);
              setCurrentView('tracker');
            }}
            onAdvanceProjectPhase={handleAdvanceProjectPhase}
            onGenerateAddonInvoice={handleGenerateAddonInvoice}
            onSendInvoiceReminder={handleSendInvoiceReminder}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090d16] py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-display font-semibold text-slate-300 text-sm">
              Foundry Web Studio
            </span>
            <p className="text-[11px] text-slate-500">
              Modern digital infrastructure & automated website operations for small businesses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <button onClick={() => setCurrentView('storefront')} className="hover:text-white transition-colors">
              Website Packages
            </button>
            <button onClick={() => setCurrentView('tracker')} className="hover:text-white transition-colors">
              Project Tracker
            </button>
            <button onClick={() => setCurrentView('billing')} className="hover:text-white transition-colors">
              Automated Care Billing
            </button>
            <button onClick={() => setCurrentView('agency')} className="hover:text-white transition-colors">
              Agency Cockpit
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            © 2026 Foundry Web Studio · 256-Bit Escrow Encrypted
          </div>
        </div>
      </footer>

      {/* Interactive Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        packages={SERVICE_PACKAGES}
        addons={ADDONS_CATALOG}
        initialPackageId={onboardingTargetPackageId}
        onClose={() => setIsOnboardingOpen(false)}
        onSubmit={handleCompleteOnboarding}
      />

      {/* Case Study Live Sandbox Modal */}
      <StagingPreviewModal
        isOpen={caseStudyStagingModal.isOpen}
        projectCompany={caseStudyStagingModal.company}
        businessType={caseStudyStagingModal.businessType}
        onClose={() =>
          setCaseStudyStagingModal({
            isOpen: false,
            company: '',
            businessType: ''
          })
        }
      />
    </div>
  );
}
