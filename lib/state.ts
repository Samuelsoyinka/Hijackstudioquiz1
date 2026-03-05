// state.ts — sessionStorage-based state manager
// Stores quiz progress during the session. Persists to Supabase on final submit.

export interface ContactData {
    name: string;
    email: string;
    whatsapp?: string;
}

export type AnswerMap = Record<string, number | string>;

export interface QuizSession {
    submission_id: string;
    contact: ContactData;
    answers: AnswerMap; // keyed by question id
}

const SESSION_KEY = 'hijack_quiz_session';

function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/** Load the current session from sessionStorage, or return null */
export function loadSession(): QuizSession | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

/** Save (upsert) the full session to sessionStorage */
export function saveSession(session: QuizSession): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/** Initialize a brand-new session after contact form submit */
export function initSession(contact: ContactData): QuizSession {
    const session: QuizSession = {
        submission_id: generateUUID(),
        contact,
        answers: {},
    };
    saveSession(session);
    return session;
}

/** Save a single answer to the current session */
export function saveAnswer(questionId: string, value: number | string): void {
    const session = loadSession();
    if (!session) return;
    session.answers[questionId] = value;
    saveSession(session);
}

/** Get a previously saved answer value (returns undefined if not answered) */
export function getAnswer(questionId: string): number | string | undefined {
    return loadSession()?.answers[questionId];
}

/** Clear the entire session (e.g. after successful submission) */
export function clearSession(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(SESSION_KEY);
}
