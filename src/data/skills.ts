export type SkillCategory = {
  number: string;
  title: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    number: "01",
    title: "AI & Agentic Systems",
    items: ["LangChain", "LangGraph", "LangSmith", "ElevenLabs", "Ollama", "AutoGen", "CrewAI", "Prompt Engineering"],
  },
  {
    number: "02",
    title: "Automation & Workflows",
    items: ["n8n", "REST APIs", "Webhooks"],
  },
  {
    number: "03",
    title: "Engineering",
    items: ["Python", "TypeScript", "FastAPI", "PostgreSQL", "SQLite", "Docker", "Git"],
  },
];
