import { SkillStripe } from "./skill-stripe";
import { backendSkills, frontendSkills } from "./skills";
import "./styles.css";

export default function Skills() {
  return (
    <section id="work" className="overflow-hidden bg-black py-24">
      <div className="mx-auto mb-12 max-w-5xl px-8">
        <p className="text-gradient-primary text-sm font-medium">Skills</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Technologies I work with
        </h2>
      </div>

      <div className="skills-stripes flex flex-col gap-8">
        <div className="px-8">
          <SkillStripe
            skills={frontendSkills}
            direction="left"
          />
        </div>
        <div className="px-8">
          <SkillStripe
            skills={backendSkills}
            direction="right"
          />
        </div>
      </div>
    </section>
  );
}
