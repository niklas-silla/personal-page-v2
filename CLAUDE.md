# CLAUDE.md — Anweisungen für Claude Code

## Projekt
Personal Website für Niklas Silla (AI Engineer & Automation Developer).

## Tech-Stack (festgelegt)

- **Astro** (statisches Framework, keine Hydration nötig)
- **Vanilla CSS** mit CSS Custom Properties (KEIN Tailwind, KEIN CSS-in-JS)
- **TypeScript** für Daten-Files (Skills, Research-Themen)
- **Hosting**: Cloudflare Pages oder Vercel (Niklas entscheidet beim Deploy)

Begründung: Skill-Liste und Research-Themen sollen pflegbar in Daten-Files liegen. Astro rendert das beim Build zu reinem HTML, ohne JavaScript an den Browser auszuliefern. Vanilla CSS, weil DESIGN.md sehr token-basiert ist und Tailwind den HTML hier nur unnötig aufblähen würde.

## Wichtige Dokumente

- `BRIEF.md` — Konzept, Inhalte, Sektionen, Tonalität
- `DESIGN.md` — exakte Design-Spezifikation (Farben, Typo, Komponenten)
- `linkedin_banner.jpg` — visuelle Referenz, das Design knüpft daran an
- `assets/profile.png` — Profilfoto (freigestellt, transparent)

## Empfohlene Projektstruktur

```
personal-site/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   └── assets/
│       ├── profile.png
│       └── favicon.svg
├── src/
│   ├── pages/
│   │   └── index.astro          ← Haupt-Seite, importiert alle Sektionen
│   ├── layouts/
│   │   └── BaseLayout.astro     ← <html>, <head>, globale Styles
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── QuickFacts.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Research.astro
│   │   └── Contact.astro
│   ├── data/
│   │   ├── skills.ts            ← Skill-Daten (siehe unten)
│   │   ├── research.ts          ← Research-Themen
│   │   └── site.ts              ← Name, Tagline, Links (zentrale Stelle)
│   └── styles/
│       ├── tokens.css           ← CSS Custom Properties (alle Farben, Spacings)
│       └── global.css           ← Reset, Body, Grid-Hintergrund, Typo-Defaults
└── README.md                    ← Pflege-Anleitung für Niklas
```

## Daten-Files (KRITISCH — bitte genau so umsetzen)

### `src/data/skills.ts`

```ts
export type SkillCategory = {
  number: string;     // "01", "02", ...
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
```

Niklas pflegt diese Datei selbst. Niemals Skills im Komponenten-HTML hardcoden.

### `src/data/research.ts`

```ts
export const researchTopics: string[] = [
  "Reliability und Evaluation von Agentic Systems",
  "Tool-Use als Entscheidungsproblem",
  "AI in betrieblichen Workflows (WI-Perspektive)",
];
```

### `src/data/site.ts`

```ts
export const site = {
  name: "Niklas Silla",
  role: "AI Engineer & Automation Developer",
  tagline: "// crafting intelligent systems",
  description: "Ich baue agentische Systeme und Automation-Workflows — dort, wo Sprachmodelle aufhören, nur Text zu generieren, und anfangen, Entscheidungen zu treffen.",
  techStack: ["LLM", "LangChain", "n8n", "Python"],
  quickFacts: {
    background: "M.Sc. Wirtschaftsinformatik",
    focus: "Agentic AI · Workflows",
    next: "PhD ab Ende 2026",
  },
  links: {
    email: "mailto:...",   // Niklas trägt ein
    linkedin: "https://linkedin.com/in/...",
    github: "https://github.com/...",
    scholar: "https://scholar.google.com/...",
  },
};
```

## Vorgehen — Sektion für Sektion

**Schritt 1: Setup**
- `npm create astro@latest` mit minimalem Template, TypeScript: strict
- `tokens.css` und `global.css` aus DESIGN.md anlegen
- `BaseLayout.astro` mit Grid-Hintergrund, eingebundener Inter + JetBrains Mono (über Fontsource oder lokale Files)
- Daten-Files anlegen (oben)
- Halt machen, Niklas zeigen, ob die Tokens korrekt geladen sind (leere Seite mit Grid-Hintergrund)

**Schritt 2: Hero**
- `<Hero>` aufbauen mit Mono-Tagline, Name, Gold-Linie, Rolle, Beschreibung, Tech-Stack
- Foto rechts mit `mask-image` für sanftes Auslaufen ins Schwarz (siehe DESIGN.md)
- Glow hinter Foto via radial-gradient
- Niklas zeigen, Feedback einholen

**Schritt 3: QuickFacts**
- Drei-Spalten-Leiste mit Mono-Labels
- Niklas zeigen

**Schritt 4: About**
- Zwei Absätze, Highlights in Gold
- Mono-Label-Layout: 160px-Spalte links, Content rechts

**Schritt 5: Skills**
- Pflicht: aus `skills.ts` rendern, niemals hardcoden
- Pro Kategorie: nummeriertes Goldlabel + Titel + horizontale Linie + Pills
- Pills mit Hover-State (siehe DESIGN.md)

**Schritt 6: Research**
- Liste mit goldenen Pfeil-Bullets
- Italic-Schluss-Satz unten

**Schritt 7: Contact**
- Schmale Footer-Zeile, Mono-Label links, Links rechts
- Erster Link (email) in Gold, Rest gedimmt

**Schritt 8: Polish**
- Scroll-Animationen via IntersectionObserver (subtil, einmalig, fade + 12px translateY)
- Responsive Test bei 375 / 768 / 1280px
- Lighthouse-Check (Ziel: Performance 100, Accessibility ≥95)
- `prefers-reduced-motion` respektieren

## Was NICHT machen

- **Kein Tailwind** einführen, auch wenn es schneller scheint
- **Keine zusätzlichen Sektionen**, die nicht im BRIEF.md stehen (Testimonials, Newsletter, Contact-Form — bewusst weggelassen)
- **Skills nicht hardcoden** — immer aus `skills.ts` lesen
- **Keine Roboter-Illustrationen** aus dem Banner — die Website nutzt nur Grid und Knoten-Motiv
- **Kein Terminal-Look** (kein blinkender Cursor, keine `$`-Prompts)
- **Keine schweren Animations-Libs** (kein GSAP, kein Framer Motion, kein Lottie) — alles soll mit reinem CSS + IntersectionObserver gehen
- **Skill-Pills nicht runden**: max. `border-radius: 3px` (siehe DESIGN.md)
- **Keine Schatten** unter Cards/Pills — alles flach
- **Keine zentrierten Layouts** — alles linksbündig

## Pflege durch Niklas (nach Launch)

Niklas sollte ohne Code-Verständnis:
- **Skills hinzufügen**: `src/data/skills.ts` editieren, einen String anhängen
- **Neue Skill-Kategorie**: ein Objekt anhängen, Nummer hochzählen
- **Texte ändern**: `src/data/site.ts` editieren
- **Research-Themen**: `src/data/research.ts` editieren

Schreibe dazu eine `README.md` im Projekt-Root mit klaren Anleitungen für genau diese vier Operationen. Beispiele beilegen.

## Spätere Erweiterungen (nicht jetzt umsetzen, nur vorbereiten)

Astro wurde gewählt, weil später möglich sein soll:
- **Blog** via Content Collections (`src/content/blog/*.md`)
- **Mehrsprachigkeit** Deutsch/Englisch via Astro-i18n
- **Unterseiten** wie `/now`, `/research`

Strukturiere den Code so, dass diese Erweiterungen nicht zu Refactoring zwingen. Konkret:
- `BaseLayout.astro` sollte schon `lang`-Attribut akzeptieren
- Texte in `site.ts` so strukturieren, dass sie später in `de.ts` / `en.ts` aufgeteilt werden können
- Aber: kein Over-Engineering — nicht jetzt schon i18n-Library installieren

## Deployment

Vorschlag: Cloudflare Pages.
- Build-Command: `npm run build`
- Build-Output: `dist`
- Node-Version: 20+

Domain später hinzufügen.
