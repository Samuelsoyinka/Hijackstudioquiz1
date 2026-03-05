// scoring.ts — Scoring Engine (Single Source of Truth)
// AI-002: If logic changes → update gemini.md SOP BEFORE updating this file.

export interface RawAnswers {
    q1: number; q2: number; q3: number; q4: number;
    q5: number; q6: number; q7: number; // q7 already reverse-scored at input time
    q8: number; q9: number; q10: number;
}

export interface QualificationAnswers {
    q11_revenue_range: string;
    q12_90_day_goal: string;
    q13_biggest_obstacle: string;
    q14_support_type: string;
    q15_additional_notes?: string;
}

export type PerformanceLabel =
    | 'Top Performer'
    | 'Growth Ready'
    | 'Unstable Growth'
    | 'Leaking Revenue';

export type FocusArea = 'Lead Acquisition' | 'Lead Conversion' | 'Lead Retention';
export type Tier = 'A' | 'B' | 'C';

export interface ComputedScores {
    acquisition_score: number;   // 0–8
    conversion_score: number;    // 0–6
    retention_score: number;     // 0–6
    total_score: number;         // 0–20
    acquisition_percent: number; // 0–100
    conversion_percent: number;  // 0–100
    retention_percent: number;   // 0–100
    overall_percent: number;     // 0–100
    performance_label: PerformanceLabel;
    focus_area: FocusArea;
}

/** Compute all dimension scores + percentages + performance label + focus area */
export function computeScores(answers: RawAnswers): ComputedScores {
    // Q7 value stored as already-reversed (Yes→0, Somewhat→1, No→2) per questions.ts options
    const acquisition_score = answers.q1 + answers.q2 + answers.q3 + answers.q4; // max 8
    const conversion_score = answers.q5 + answers.q6 + answers.q7;               // max 6 (q7 pre-reversed)
    const retention_score = answers.q8 + answers.q9 + answers.q10;              // max 6
    const total_score = acquisition_score + conversion_score + retention_score; // max 20

    const acquisition_percent = Math.round((acquisition_score / 8) * 100);
    const conversion_percent = Math.round((conversion_score / 6) * 100);
    const retention_percent = Math.round((retention_score / 6) * 100);
    const overall_percent = Math.round((total_score / 20) * 100);

    const performance_label = getPerformanceLabel(overall_percent);

    // Focus area = dimension with the LOWEST percent score
    const buckets: [FocusArea, number][] = [
        ['Lead Acquisition', acquisition_percent],
        ['Lead Conversion', conversion_percent],
        ['Lead Retention', retention_percent],
    ];
    const focus_area = buckets.reduce((a, b) => (a[1] <= b[1] ? a : b))[0];

    return {
        acquisition_score, conversion_score, retention_score, total_score,
        acquisition_percent, conversion_percent, retention_percent, overall_percent,
        performance_label, focus_area,
    };
}

/** Performance label based on overall_percent */
export function getPerformanceLabel(percent: number): PerformanceLabel {
    if (percent >= 80) return 'Top Performer';
    if (percent >= 60) return 'Growth Ready';
    if (percent >= 40) return 'Unstable Growth';
    return 'Leaking Revenue';
}

/** Tier routing logic based on revenue range + support type */
export function computeTier(revenue: string, support: string): Tier {
    if (
        ['2m_to_10m', '10m_plus'].includes(revenue) &&
        ['done_with_you', 'done_for_you'].includes(support)
    ) return 'A';

    if (
        revenue === '100k_to_2m' &&
        ['group_coaching', 'short_course'].includes(support)
    ) return 'B';

    return 'C';
}

/** SVG ring color by overall_percent */
export function getRingColor(percent: number): string {
    if (percent >= 80) return '#4CAF7D'; // green
    if (percent >= 60) return '#F59E0B'; // amber
    if (percent >= 40) return '#F97316'; // orange
    return '#EF4444';                    // red
}

/** Dynamic insight text per dimension */
export function getInsightText(dimension: 'acquisition' | 'conversion' | 'retention', percent: number): string {
    if (dimension === 'acquisition') {
        if (percent < 50) return 'Work on building a predictable way of attracting new leads.';
        if (percent < 75) return 'Work on improving the consistency and strategy behind how you attract leads.';
        return 'You already have a reliable lead generation engine — focus on maintaining and scaling it.';
    }
    if (dimension === 'conversion') {
        if (percent < 50) return 'Work on building a structured process for turning leads into paying customers.';
        if (percent < 75) return 'Work on improving follow-up and response speed to convert more of the leads you already get.';
        return 'You have a strong system for turning interest into revenue — keep optimizing it.';
    }
    // retention
    if (percent < 50) return 'Work on creating systems that bring past customers back to buy again.';
    if (percent < 75) return 'Work on making your follow-up with past customers more systematic.';
    return 'You are leveraging retention effectively — which most businesses ignore.';
}

/** CTA content per tier */
export const TIER_CONTENT: Record<Tier, { cta: string; subtext: string }> = {
    A: {
        cta: 'Join the Next Implementation Call →',
        subtext: 'Spots are limited to ensure focused implementation support.',
    },
    B: {
        cta: 'Join the Next Implementation Call →',
        subtext: 'Limited availability for next consulting cycles.',
    },
    C: {
        cta: 'Strengthen Your Foundation →',
        subtext: 'We only share practical frameworks — not generic advice.',
    },
};

/** Dynamic title + subtitle by performance_label */
export const PERFORMANCE_COPY: Record<PerformanceLabel, { title: string; subtitle: string }> = {
    'Top Performer': {
        title: 'Congrats!',
        subtitle: 'You score really well based on your operational metrics and growth strategy.',
    },
    'Growth Ready': {
        title: 'Well done!',
        subtitle: 'Your business has strong foundations, but a few improvements could significantly increase your revenue.',
    },
    'Unstable Growth': {
        title: 'Well done!',
        subtitle: 'Your business shows potential — a few gaps in your acquisition, conversion, or retention systems are limiting your growth.',
    },
    'Leaking Revenue': {
        title: 'Oh no…',
        subtitle: 'Your business may be leaking revenue without you realizing it. Several core growth systems appear to be missing or inconsistent.',
    },
};
