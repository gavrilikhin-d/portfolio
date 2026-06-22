export type WorkExperience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const workExperience: WorkExperience[] = [
  {
    role: "Full Stack Developer",
    company: "Chatroulette",
    period: "2023 — Present",
    description:
      "Building website and mobile application with React Native Web. Working on CI/CD pipeline and internal tools",
  },
  {
    role: "Freelancer",
    company: "Kwork",
    period: "2021 — 2023",
    description:
      "Building applications in C++ and Python"
  }
];

export const cvPath = "/cv.pdf";
export const cvDownloadName = "Daniil-Gavrilikhin-CV.pdf";
