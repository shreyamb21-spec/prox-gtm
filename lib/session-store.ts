"use client";

// client-side store for everything generated this session, so the export zip
// includes what the founder just watched being generated. also holds the
// global in-flight lock and the localStorage generation counter.

import { useSyncExternalStore } from "react";
import { SESSION_GENERATION_CAP } from "./config";

export interface GeneratedOutreach {
  personaId: string;
  text: string;
  fromFallback: boolean;
}

interface SessionState {
  briefs: Record<string, { text: string; fromFallback: boolean }>;
  outreach: Record<string, GeneratedOutreach[]>; // keyed by account slug
  inFlight: boolean;
}

let state: SessionState = { briefs: {}, outreach: {}, inFlight: false };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function useSessionState(): SessionState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

export function setInFlight(v: boolean) {
  state = { ...state, inFlight: v };
  emit();
}

export function saveBrief(slug: string, text: string, fromFallback: boolean) {
  state = {
    ...state,
    briefs: { ...state.briefs, [slug]: { text, fromFallback } },
  };
  emit();
}

export function saveOutreach(
  slug: string,
  personaId: string,
  text: string,
  fromFallback: boolean
) {
  const existing = (state.outreach[slug] ?? []).filter(
    (o) => o.personaId !== personaId
  );
  state = {
    ...state,
    outreach: {
      ...state.outreach,
      [slug]: [...existing, { personaId, text, fromFallback }],
    },
  };
  emit();
}

export function getSessionSnapshot(): SessionState {
  return state;
}

const COUNTER_KEY = "pve-generation-count";

export function sessionCapReached(): boolean {
  try {
    return Number(localStorage.getItem(COUNTER_KEY) ?? "0") >= SESSION_GENERATION_CAP;
  } catch {
    return false;
  }
}

export function bumpGenerationCount() {
  try {
    const n = Number(localStorage.getItem(COUNTER_KEY) ?? "0") + 1;
    localStorage.setItem(COUNTER_KEY, String(n));
  } catch {}
}
