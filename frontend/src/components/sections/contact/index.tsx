import { ContactForm } from "./contact-form";

const linkedInUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com";

export default function Contact() {
  return (
    <section id="contact" className="bg-black px-8 py-24">
      <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-1 md:order-2">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Let's work together
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-white/70">
            Have a project in mind or just want to say hi?<br />
            Fill out the form and I'll get back to you as soon as possible.
          </p>

          <div className="mt-8">
            <p className="text-sm text-white/50">Or find me on</p>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              LinkedIn
              <img
                src="/icons/linkedin.svg"
                alt=""
                aria-hidden
                className="size-4"
              />
            </a>
          </div>
        </div>

        <div className="order-2 md:order-1">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
