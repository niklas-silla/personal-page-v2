export type SkillCategory = {
  number: string;
  title: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    number: "01",
    title: "AI & Agentic Systems",
    items: ["LangChain", "LangGraph", "LLM Orchestration", "RAG", "Tool-Use", "Vector DBs", "Prompt Engineering", "Evaluation"],
  },
  {
    number: "02",
    title: "Automation & Workflows",
    items: ["n8n", "Make", "Zapier", "REST APIs", "Webhooks", "Custom Nodes"],
  },
  {
    number: "03",
    title: "Engineering",
    items: ["Python", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Git", "CI/CD"],
  },
  {
    number: "04",
    title: "Research & Methods",
    items: ["Wirtschaftsinformatik", "Process Modeling", "Design Science", "Qualitative Research", "LaTeX"],
  },
];
