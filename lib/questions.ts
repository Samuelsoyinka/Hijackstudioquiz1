// questions.ts — All 15 quiz question definitions
// Source of truth for question text, answer options, and scoring metadata

export type QuestionType = 'scored' | 'qualification' | 'open';

export interface QuestionOption {
  label: string;
  value: string | number;
}

export interface Question {
  id: string;
  step: number; // 1–15
  type: QuestionType;
  category?: 'acquisition' | 'conversion' | 'retention';
  text: string;
  reverseScored?: boolean;
  options?: QuestionOption[];
  placeholder?: string; // for open text
  optional?: boolean;
}

export const QUESTIONS: Question[] = [
  // ─── LEAD ACQUISITION (Q1–Q4) ───────────────────────────────────────────
  {
    id: 'q1_acquisition_source_clarity',
    step: 1,
    type: 'scored',
    category: 'acquisition',
    text: 'Do you know exactly where most of your new customers first hear about your business?',
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 0 },
    ],
  },
  {
    id: 'q2_acquisition_consistency',
    step: 2,
    type: 'scored',
    category: 'acquisition',
    text: 'Do you consistently attract new leads every week without relying on referrals alone?',
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 0 },
    ],
  },
  {
    id: 'q3_acquisition_targeted_marketing',
    step: 3,
    type: 'scored',
    category: 'acquisition',
    text: 'Do you intentionally create content or marketing for a specific type of customer?',
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 0 },
    ],
  },
  {
    id: 'q4_acquisition_capture_system',
    step: 4,
    type: 'scored',
    category: 'acquisition',
    text: 'Do you have a simple system for capturing leads instead of losing them in DMs or chats?',
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 0 },
    ],
  },

  // ─── LEAD CONVERSION (Q5–Q7) ────────────────────────────────────────────
  {
    id: 'q5_conversion_repeatable_process',
    step: 5,
    type: 'scored',
    category: 'conversion',
    text: 'Do you have a clear, repeatable process for turning inquiries into payments?',
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 0 },
    ],
  },
  {
    id: 'q6_conversion_followup',
    step: 6,
    type: 'scored',
    category: 'conversion',
    text: "Do you follow up with leads who don't buy immediately?",
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 0 },
    ],
  },
  {
    id: 'q7_conversion_response_speed',
    step: 7,
    type: 'scored',
    category: 'conversion',
    reverseScored: true, // ⚠️ REVERSE SCORED: Yes=0, Somewhat=1, No=2
    text: 'Do you lose sales because responses are slow or inconsistent?',
    options: [
      { label: 'Yes', value: 0 },    // reversed
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 2 },     // reversed
    ],
  },

  // ─── LEAD RETENTION (Q8–Q10) ────────────────────────────────────────────
  {
    id: 'q8_retention_post_purchase_system',
    step: 8,
    type: 'scored',
    category: 'retention',
    text: 'Do you have a system for following up after a customer buys from you?',
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 0 },
    ],
  },
  {
    id: 'q9_retention_tracking',
    step: 9,
    type: 'scored',
    category: 'retention',
    text: 'Do you track repeat customers or returning clients?',
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 0 },
    ],
  },
  {
    id: 'q10_retention_communication',
    step: 10,
    type: 'scored',
    category: 'retention',
    text: 'Do you intentionally communicate with past customers, not just new leads?',
    options: [
      { label: 'Yes', value: 2 },
      { label: 'Somewhat / Not sure', value: 1 },
      { label: 'No', value: 0 },
    ],
  },

  // ─── QUALIFICATION QUESTIONS (Q11–Q15) ──────────────────────────────────
  {
    id: 'q11_revenue_range',
    step: 11,
    type: 'qualification',
    text: 'Which best describes your business right now?',
    options: [
      { label: 'Under ₦100k/month', value: 'under_100k' },
      { label: '₦100k–₦2m/month', value: '100k_to_2m' },
      { label: '₦2m–₦10m/month', value: '2m_to_10m' },
      { label: '₦10m+/month', value: '10m_plus' },
      { label: 'I\'m not sure — I want clarity', value: 'not_sure' },
    ],
  },
  {
    id: 'q12_90_day_goal',
    step: 12,
    type: 'qualification',
    text: 'What would you most like to achieve in the next 90 days?',
    options: [
      { label: 'Start getting consistent leads', value: 'consistent_leads' },
      { label: 'Increase sales by 20–30%', value: 'increase_sales' },
      { label: 'Double our sales', value: 'double_sales' },
      { label: 'Make sales more predictable and less stressful', value: 'predictable_sales' },
      { label: 'Build systems so the business doesn\'t depend on me', value: 'systems' },
      { label: 'I\'m not sure — I need guidance', value: 'not_sure' },
    ],
  },
  {
    id: 'q13_biggest_obstacle',
    step: 13,
    type: 'qualification',
    text: 'What do you believe is the biggest thing stopping you from achieving that goal?',
    options: [
      { label: 'We don\'t get enough quality leads', value: 'not_enough_leads' },
      { label: 'Leads come in, but many don\'t convert', value: 'low_conversion' },
      { label: 'Follow-up is inconsistent or manual', value: 'poor_followup' },
      { label: 'We don\'t have a clear sales process', value: 'no_sales_process' },
      { label: 'Everything depends too much on the founder', value: 'founder_dependent' },
      { label: 'I\'m not sure — something just isn\'t working', value: 'not_sure' },
    ],
  },
  {
    id: 'q14_support_type',
    step: 14,
    type: 'qualification',
    text: 'What kind of support do you feel would help you most right now?',
    options: [
      { label: 'Free guides, templates, or checklists', value: 'free_guides' },
      { label: 'A short course or training program', value: 'short_course' },
      { label: 'Group coaching or guided implementation', value: 'group_coaching' },
      { label: 'Done-with-you support', value: 'done_with_you' },
      { label: 'Done-for-you services', value: 'done_for_you' },
      { label: 'I\'m not sure — I need help deciding', value: 'not_sure' },
    ],
  },
  {
    id: 'q15_additional_notes',
    step: 15,
    type: 'open',
    optional: true,
    text: 'Is there anything else about your business or challenges you\'d like us to know?',
    placeholder: 'Share anything you think is relevant… (optional)',
  },
];

export const TOTAL_STEPS = QUESTIONS.length; // 15
export const getQuestion = (step: number) =>
  QUESTIONS.find((q) => q.step === step) ?? null;
