"use client";

import { useActionState } from "react";

import { sendContactEmail, type ContactState } from "./actions";

const initialState: ContactState = { success: false };

const inputClassName =
  "w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/40";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactEmail,
    initialState,
  );

  if (state.success) {
    return (
      <p className="rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
        Thanks for reaching out! I'll get back to you soon.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
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
        <label htmlFor="message" className="mb-1.5 block text-sm text-white/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          className={`${inputClassName} resize-y min-h-32`}
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-dark mt-2 w-fit"
      >
        {pending ? "Sending..." : "Submit"}
        <img
          src="/icons/chevron-right.svg"
          alt=""
          aria-hidden
          className="size-4"
        />
      </button>
    </form>
  );
}
