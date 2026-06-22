import type { Skill } from "./skills";

type SkillStripeProps = {
  skills: Skill[];
  direction: "left" | "right";
};

export function SkillStripe({ skills, direction }: SkillStripeProps) {
  const items = [...skills, ...skills];

  return (
    <div>
      <div className="skills-fade overflow-hidden">
        <div
          className={`skills-track ${direction === "right" ? "skills-track-right" : ""}`}
        >
          {items.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className="skill-card">
              <img
                src={skill.icon}
                alt=""
                aria-hidden
                className="skill-card-icon"
              />
              <span className="skill-card-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
