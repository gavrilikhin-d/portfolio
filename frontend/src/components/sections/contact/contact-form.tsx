"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";

import {
  sendContactEmail,
  type ContactState,
} from "./actions";

const initialState: ContactState = { success: false };

const TOAST_VISIBLE_MS = 3000;

const inputClassName =
  "w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/40";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [toastShownAt, setToastShownAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [state, formAction, pending] = useActionState(
    sendContactEmail,
    initialState,
  );

  const blockedUntil = state.rateLimitedUntil ?? null;
  const isRateLimited = blockedUntil !== null && now < blockedUntil;
  const toastAge = toastShownAt === null ? null : now - toastShownAt;
  const showToast =
    toastAge !== null && toastAge < TOAST_VISIBLE_MS;
  const displayError = state.error;

  useEffect(() => {
    if (!state.success) {
      return;
    }

    formRef.current?.reset();

    const shownAt = Date.now();
    const showTimer = window.setTimeout(() => {
      setToastShownAt(shownAt);
      setNow(shownAt);
    }, 0);

    const hideTimer = window.setTimeout(() => {
      setNow(Date.now());
    }, TOAST_VISIBLE_MS);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [state]);

  useEffect(() => {
    if (blockedUntil === null || now >= blockedUntil) {
      return;
    }

    const timer = window.setTimeout(() => {
      setNow(Date.now());
    }, blockedUntil - now);

    return () => window.clearTimeout(timer);
  }, [blockedUntil, now]);

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
            <Image
              src="/icons/chevron-right.svg"
              alt=""
              aria-hidden
              width={16}
              height={16}
              className="size-4"
            />
          </button>

          {displayError && (
            <p className="text-sm text-red-400">
              {displayError}
            </p>
          )}
        </div>
      </form>
    </>
  );
}
