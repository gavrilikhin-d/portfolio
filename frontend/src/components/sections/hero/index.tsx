import Image from "next/image";

import "./styles.css";

export default function Hero() {
  return (
    <div className="flex min-h-screen w-full items-center overflow-hidden bg-black bg-[url('/background.webp')] bg-cover bg-center bg-no-repeat px-8">
      <div className="hero-appear mx-auto flex w-full max-w-5xl flex-col items-start">
        <div>
          <p className="text-gradient-primary text-xl font-medium pl-[1.5px]"> {/* pl-[1.5px] is an optical adjustment to make `H` align with `F` */}
            Hello, I&apos;m Daniil
          </p>

          <h1 className="text-5xl font-bold leading-none tracking-tight">
            Full Stack
            <br />
            <span className="text-gradient-primary">Developer</span>
          </h1>
        </div>

        <p className="pl-0.5 mt-6 max-w-md text-base leading-7 text-white/70">
          I build scalable web applications with modern technologies 
          and exceptional user experience.
        </p>

        <div className="ml-0.5 mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#experience"
            className="bg-gradient-primary inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            View My Work
            <Image
              src="/icons/arrow-right.svg"
              alt=""
              aria-hidden
              width={20}
              height={20}
              className="size-5"
              loading="eager"
            />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
          >
            Get In Touch
            <Image
              src="/icons/chat-bubble.svg"
              alt=""
              aria-hidden
              width={16}
              height={16}
              className="size-4"
              loading="eager"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
