import { CvPreview } from "./cv-preview";
import { cvDownloadName, cvPath, workExperience } from "./experience-data";
import "./styles.css";

export default function Experience() {
  return (
    <section id="experience" className="bg-black px-8 py-24">
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-gradient-primary text-sm font-medium">Experience</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Where I&apos;ve worked
          </h2>

          <ol className="mt-10 flex flex-col gap-8">
            {workExperience.map((job) => (
              <li key={`${job.company}-${job.period}`} className="relative pl-6">
                <span className="absolute left-0 top-2 h-full w-px bg-white/15" />
                <span className="absolute left-0 top-2 size-2 -translate-x-[3px] rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
                <p className="text-sm text-white/50">{job.period}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {job.role}
                </h3>
                <p className="text-gradient-primary text-sm font-medium">
                  {job.company}
                </p>
                <p className="mt-2 text-base leading-7 text-white/70">
                  {job.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <CvPreview />
      </div>
    </section>
  );
}
