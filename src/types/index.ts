export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  targetAudience: string;
  setupPrice: number;
  monthlyCarePrice: number;
  timelineWeeks: number;
  pagesCount: string;
  features: string[];
  deliverables: string[];
  isPopular?: boolean;
}

export interface AddOnItem {
  id: string;
  name: string;
  description: string;
  setupPrice: number;
  monthlyPrice: number;
  category: 'seo' | 'conversion' | 'content' | 'speed';
}

export type BillingSchedule = 'milestone_50_50' | 'milestone_33_33_34' | 'monthly_retainer';

export type MilestoneStatus = 'completed' | 'in_progress' | 'pending' | 'review_required';
export type ApprovalStatus = 'approved' | 'pending_review' | 'changes_requested';

export interface MilestoneDeliverable {
  name: string;
  type: 'figma' | 'pdf' | 'staging_url' | 'code' | 'report';
  url: string;
  previewSnippet?: string;
}

export interface ProjectMilestone {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  status: MilestoneStatus;
  estimatedDate: string;
  completedDate?: string;
  deliverable?: MilestoneDeliverable;
  approvalStatus: ApprovalStatus;
  clientNotes?: string;
  revisionsRequested?: {
    date: string;
    requestText: string;
    priority: 'high' | 'medium' | 'low';
    resolved: boolean;
  }[];
  billingTriggerNotice?: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  actor: 'agency' | 'client' | 'system';
  type: 'milestone' | 'billing' | 'revision' | 'communication';
}

export interface Project {
  id: string;
  clientName: string;
  clientCompany: string;
  businessType: string;
  contactEmail: string;
  contactPhone: string;
  domainTarget: string;
  packageId: string;
  selectedAddonIds: string[];
  billingSchedule: BillingSchedule;
  totalSetupPrice: number;
  monthlyCarePrice: number;
  currentPhaseIndex: number;
  startDate: string;
  targetLaunchDate: string;
  stagingUrl: string;
  liveUrl?: string;
  milestones: ProjectMilestone[];
  activityLog: ActivityEvent[];
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  clientCompany: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  status: 'paid' | 'pending' | 'scheduled' | 'overdue';
  title: string;
  category: 'deposit' | 'milestone' | 'launch_final' | 'monthly_care' | 'addon';
  lineItems: InvoiceLineItem[];
  paymentMethod: string;
  autoPayEnabled: boolean;
  notes?: string;
}

export interface BusinessIntakeSubmission {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessCategory: string;
  existingWebsite: string;
  targetAudience: string;
  primaryGoal: 'leads' | 'bookings' | 'sales' | 'brand';
  packageId: string;
  selectedAddonIds: string[];
  billingSchedule: BillingSchedule;
  domainPreference: string;
  notes: string;
}
