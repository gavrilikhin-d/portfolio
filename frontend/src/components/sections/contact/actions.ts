"use server";

import { Resend } from "resend";

import { getClientIp } from "@/lib/get-client-ip";
import { contactIpLimit } from "@/lib/rate-limit";
import { EpochTime } from "@/types";
import { hash } from "node:crypto";

export type ContactState = {
  success: boolean;
  error?: string;
  rateLimitedUntil?: EpochTime;
};

export async function checkContactRateLimit(): Promise<ContactState> {
  const ip = await getClientIp();

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return {
      success: false,
      error: "Contact form is temporarily unavailable.",
    };
  }

  const rateLimit = await contactIpLimit.limit(ip);

  if (!rateLimit.success) {
    return {
      success: false,
      error: `Too many messages sent. Try again later.`,
      rateLimitedUntil: rateLimit.reset as EpochTime,
    };
  }

  return { success: false };
}

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!email || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const contactRateLimit = await checkContactRateLimit();
  if (contactRateLimit.error) {
    return contactRateLimit;
  }


  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!resendApiKey || !contactEmail) {
    return {
      success: false,
      error: "Email service is not configured.",
    };
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from:
      process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: contactEmail,
    replyTo: email,
    subject: `Portfolio contact from ${email}`,
    text: `Email: ${email}\n\n${message}`,
  }, {
    idempotencyKey: hash("md5", `${email}-${message}`),
  });

  if (error) {
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    };
  }

  return { success: true };
}
