import type { Skill } from "./skills";

type SkillStripeProps = {
  skills: Skill[];
  direction: "left" | "right";
};

export function SkillStripe({ skills, direction }: SkillStripeProps) {
  const renderGroup = (keyPrefix: string) =>
    skills.map((skill) => (
      <div key={`${keyPrefix}-${skill.name}`} className="skill-card">
        <img
          src={skill.icon}
          alt=""
          aria-hidden
          className="skill-card-icon"
        />
        <span className="skill-card-name">{skill.name}</span>
      </div>
    ));

  return (
    <div>
      <div className="skills-fade overflow-hidden">
        <div
          className={`skills-track ${direction === "right" ? "skills-track-right" : ""}`}
        >
          <div className="skills-group">{renderGroup("a")}</div>
          <div className="skills-group" aria-hidden="true">
            {renderGroup("b")}
          </div>
        </div>
      </div>
    </div>
  );
}
