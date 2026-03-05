// supabase.ts — Supabase client + quiz submission function
// Keys are loaded from .env.local (never hardcoded — AI-003)
// Gracefully handles missing keys — quiz works offline, DB write skipped.

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ComputedScores } from './scoring';
import { ContactData, AnswerMap } from './state';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

function isValidUrl(str: string): boolean {
    try {
        const url = new URL(str);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

// Only create the client if we have valid keys
let supabase: SupabaseClient | null = null;
if (isValidUrl(supabaseUrl) && supabaseAnonKey && supabaseAnonKey !== 'your-supabase-anon-key-here') {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export interface SubmissionPayload {
    submission_id: string;
    contact: ContactData;
    answers: AnswerMap;
    scores: ComputedScores;
    tier: string;
}

/**
 * Write the completed quiz submission to Supabase.
 * Errors are caught and logged — they do NOT block the results page from rendering.
 * If Supabase is not configured, this is a no-op.
 */
export async function submitQuiz(payload: SubmissionPayload): Promise<void> {
    if (!supabase) {
        console.warn('[Supabase] Client not configured — skipping DB write. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.');
        return;
    }

    const { contact, answers, scores, tier, submission_id } = payload;

    const row = {
        id: submission_id,
        status: 'completed',
        name: contact.name,
        email: contact.email,
        whatsapp: contact.whatsapp ?? null,
        // Scored answers
        q1: answers.q1_acquisition_source_clarity,
        q2: answers.q2_acquisition_consistency,
        q3: answers.q3_acquisition_targeted_marketing,
        q4: answers.q4_acquisition_capture_system,
        q5: answers.q5_conversion_repeatable_process,
        q6: answers.q6_conversion_followup,
        q7: answers.q7_conversion_response_speed,
        q8: answers.q8_retention_post_purchase_system,
        q9: answers.q9_retention_tracking,
        q10: answers.q10_retention_communication,
        // Computed scores
        acquisition_score: scores.acquisition_score,
        conversion_score: scores.conversion_score,
        retention_score: scores.retention_score,
        total_score: scores.total_score,
        overall_percent: scores.overall_percent,
        acquisition_percent: scores.acquisition_percent,
        conversion_percent: scores.conversion_percent,
        retention_percent: scores.retention_percent,
        focus_area: scores.focus_area,
        // Qualification answers
        q11_revenue_range: answers.q11_revenue_range,
        q12_90_day_goal: answers.q12_90_day_goal,
        q13_biggest_obstacle: answers.q13_biggest_obstacle,
        q14_support_type: answers.q14_support_type,
        q15_additional_notes: answers.q15_additional_notes ?? null,
        tier,
    };

    try {
        const { error } = await supabase.from('quiz_submissions').insert(row);
        if (error) throw error;
    } catch (err) {
        console.error('[Supabase] Submission failed:', err);
    }
}
