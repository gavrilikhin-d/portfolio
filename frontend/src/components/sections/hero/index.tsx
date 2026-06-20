export default function Hero() {
  return (
    <div className="flex min-h-screen w-full items-center overflow-hidden bg-black bg-[url('/background.webp')] bg-cover bg-center bg-no-repeat px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start">
        <div>
          <p className="text-gradient text-xl font-medium pl-[1.5px]"> {/* pl-[1.5px] is an optical adjustment to make `H` align with `F` */}
            Hello, I'm Daniil
          </p>

          <h1 className="text-5xl font-bold leading-none tracking-tight">
            Full Stack
            <br />
            <span className="text-gradient">Developer</span>
          </h1>
        </div>

        <p className="pl-0.5 mt-6 max-w-md text-base leading-7 text-white/70">
          I build scalable web applications with modern technologies 
          and exceptional user experience.
        </p>
      </div>
    </div>
  );
}