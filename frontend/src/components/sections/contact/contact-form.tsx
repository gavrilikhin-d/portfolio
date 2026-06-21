"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import {
  checkContactRateLimit,
  sendContactEmail,
  type ContactState,
} from "./actions";

const initialState: ContactState = { success: false };

const inputClassName =
  "w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/40";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(
    sendContactEmail,
    initialState,
  );

  const isRateLimited =
    blockedUntil !== null && Date.now() < blockedUntil;

  useEffect(() => {
    checkContactRateLimit().then((result) => {
      if (result.rateLimitedUntil) {
        setBlockedUntil(result.rateLimitedUntil);
        setRateLimitError(result.error ?? null);
      }
    });
  }, []);

  useEffect(() => {
    if (state.rateLimitedUntil) {
      setBlockedUntil(state.rateLimitedUntil);
      if (state.error) {
        setRateLimitError(state.error);
      }
    }
  }, [state.rateLimitedUntil, state.error]);

  useEffect(() => {
    if (!blockedUntil) {
      return;
    }

    const remainingMs = blockedUntil - Date.now();
    if (remainingMs <= 0) {
      setBlockedUntil(null);
      setRateLimitError(null);
      return;
    }

    const timer = window.setTimeout(() => {
      setBlockedUntil(null);
      setRateLimitError(null);
    }, remainingMs);

    return () => window.clearTimeout(timer);
  }, [blockedUntil]);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    formRef.current?.reset();
    setShowToast(true);

    const timer = window.setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [state.success]);

  return (
    <>
      {showToast && (
        <div className="toast" role="status">
          Thanks for reaching out! I&apos;ll get back to you soon.
        </div>
      )}

      <form ref={formRef} action={formAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-white/70">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm text-white/70"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell me about your project..."
            className={`${inputClassName} min-h-32 resize-y`}
          />
        </div>

        <div className="flex flex-row items-center justify-between gap-2">
          <button
            type="submit"
            disabled={pending || isRateLimited}
            className="btn-dark w-fit"
          >
            {pending ? "Sending..." : "Submit"}
            <img
              src="/icons/chevron-right.svg"
              alt=""
              aria-hidden
              className="size-4"
            />
          </button>

          {(state.error ?? rateLimitError) && (
            <p className="text-sm text-red-400">
              {state.error ?? rateLimitError}
            </p>
          )}
        </div>
      </form>
    </>
  );
}
