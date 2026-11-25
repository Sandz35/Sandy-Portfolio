export const profile = {
  name: "Sandip Banerjee",
  shortName: "Sandip",
  initial: "B",
  location: "Weston, Florida",
  headline: "I turn strategy into",
  headlineAccent: "shipped programs.",
  intro:
    "Technology leader blending engineering roots with an IIM Lucknow MBA. I build high-performing teams and deliver platform modernization, product launches and Agile transformation at enterprise scale.",
  roles: ["Technical Program Manager", "Release Train Engineer", "Product & Delivery Leader"],
  photo: "/images/Sandip.webp",
  resume: "/resume.pdf",
  email: "sandipbanerjee.in@gmail.com",
  linkedin: "https://www.linkedin.com/in/sandipbanerjee1/",
  github: "https://github.com/Sandz35",
  currentBadge: "American Express programs",
};

export const highlights = [
  { value: "19 yrs", label: "Technology delivery, 2005–2024" },
  { value: "IIM-L", label: "Full-time MBA (PGDM), IIM Lucknow" },
  { value: "SAFe", label: "Release Train Engineer & Agile at scale" },
  { value: "FinTech", label: "Payments & banking platforms" },
];

export const about = {
  title: "Engineer by training, program leader by choice.",
  body:
    "I lead large-scale programs spanning new product launches, platform modernization, Agile/SAFe adoption and business-process re-engineering — always aimed at better customer experience and profitable growth. I lead by example, keep learning new technology, and care about teams growing together.",
};

export const skillGroups = [
  { title: "Leadership", items: ["Product Management", "Technical Program Mgmt", "SAFe · Agile · Scrum"] },
  { title: "Cloud & Data", items: ["AWS", "PostgreSQL", "DB2", "CI/CD"] },
  { title: "Engineering", items: ["React", "JavaScript", "Tailwind CSS", "HTML5 / CSS3", "Git & GitHub"] },
];

export const experience = [
  {
    dates: "2019 – 2024",
    role: "Release Train Engineer · E2E Program Manager",
    org: "Virtusa Corp — client: American Express",
    summary:
      "Grew from Scrum Master to end-to-end Program Manager and Release Train Engineer, delivering complex cross-functional initiatives aligned with product and engineering priorities, and partnering with business, product and marketing stakeholders on strategy, vision and roadmap.",
    tags: ["SAFe", "Release Trains", "Roadmapping", "Stakeholder alignment"],
  },
  {
    dates: "2015 – 2019",
    role: "Program Lead, Digital Transformation",
    org: "Virtusa Corp",
    summary:
      "Led digital-transformation programs for a major European bank, migrating off legacy code to cut costs and lift process efficiency; owned rollouts from inception through technology mapping to launch.",
    tags: ["Legacy modernization", "Banking", "Delivery governance"],
  },
  {
    dates: "2005 – 2014",
    role: "Tech Lead → Technical Architect",
    org: "Cognizant Technology Solutions",
    summary:
      "Led technical solutioning for back-office payment systems at a global payments leader, enabling transaction qualification across the US; as architect, shaped RFP responses and solution value propositions.",
    tags: ["Payments", "Solution architecture", "RFPs"],
  },
  {
    dates: "2015 · 2005",
    role: "MBA (PGDM) · B.Tech, Electronics & Communication",
    org: "IIM Lucknow · Engineering",
    summary:
      "Full-time PGDM from the Indian Institute of Management, Lucknow, on top of an engineering degree in Electronics and Communication.",
    tags: ["Education"],
  },
];

// category must match one of projectFilters (except "All").
// Leave demo or code as "" to hide that link.
export const projectFilters = ["All", "Programs", "Engineering"];

export const projects = [
  {
    kind: "Web",
    category: "Engineering",
    title: "This portfolio",
    description:
      "React + Vite + Tailwind single-page site on S3 + CloudFront, with a serverless Lambda contact form and automated deploys from GitHub Actions.",
    tags: ["React", "Tailwind", "AWS"],
    gradient: "from-teal-700 to-teal-950",
    demo: "",
    code: "https://github.com/Sandz35/Sandy-Portfolio",
  },
  {
    kind: "Case study",
    category: "Programs",
    title: "[YOUR PROGRAM CASE STUDY]",
    description:
      "[Problem → what you led → measurable outcome. One short paragraph about a release train or modernization you drove.]",
    tags: ["SAFe", "Modernization"],
    gradient: "from-amber-700 to-amber-950",
    demo: "",
    code: "",
  },
  {
    kind: "Side project",
    category: "Engineering",
    title: "[YOUR SIDE PROJECT]",
    description: "[A small app you built — e.g. a dashboard or tool. Link to the live demo and the GitHub repo.]",
    tags: ["JavaScript", "PostgreSQL"],
    gradient: "from-slate-700 to-slate-950",
    demo: "",
    code: "",
  },
];
