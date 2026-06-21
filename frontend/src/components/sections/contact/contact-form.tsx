"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { sendContactEmail, type ContactState } from "./actions";

const initialState: ContactState = { success: false };

const inputClassName =
  "w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/40";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [state, formAction, pending] = useActionState(
    sendContactEmail,
    initialState,
  );

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
          Thanks for reaching out! I'll get back to you soon.
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

        {state.error && (
          <p className="text-sm text-red-400">{state.error}</p>
        )}

        <button type="submit" disabled={pending} className="btn-dark mt-2 w-fit">
          {pending ? "Sending..." : "Submit"}
          <img
            src="/icons/chevron-right.svg"
            alt=""
            aria-hidden
            className="size-4"
          />
        </button>
      </form>
    </>
  );
}
