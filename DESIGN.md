# Design Specification

Basis: LinkedIn-Banner (siehe `linkedin_banner.jpg`).
Style: Dark Mode, minimalistisch, technisch-elegant, Editorial-Touch.

## Farben

```css
--bg-primary: #0a0a0a;         /* Tiefes Schwarz, Hauptfläche */
--bg-secondary: rgba(0,0,0,0.4); /* Leicht abgesetzte Bereiche (Quick Facts, Footer) */

--text-primary: #fafafa;        /* Headlines, wichtige Werte */
--text-secondary: rgba(255,255,255,0.85); /* Fließtext (about) */
--text-tertiary: rgba(255,255,255,0.6);   /* Sekundärer Text, Tagline */
--text-muted: rgba(255,255,255,0.45);     /* Caption, Mono-Details */

--accent-gold: #d4b572;         /* Hauptakzent (Banner-Gold) */
--accent-gold-soft: rgba(212,181,114,0.7); /* Mono-Labels */
--accent-gold-line: rgba(212,181,114,0.12); /* Trennlinien zwischen Sektionen */
--accent-gold-grid: rgba(212,181,114,0.04); /* Hintergrund-Grid */
--accent-gold-glow: rgba(212,181,114,0.08); /* Subtiler Glow hinter Foto */

--border-subtle: 0.5px solid var(--accent-gold-line);
```

## Typografie

```css
--font-sans: "Inter", system-ui, sans-serif;     /* Headlines, Fließtext */
--font-mono: "JetBrains Mono", "Fira Code", monospace; /* Labels, Tech-Details */
--font-serif: optional, falls editorial gewünscht — sonst weglassen */
```

### Typo-Skala
- H1 (Name, Hero): 52px / weight 300 / line-height 1.1 / letter-spacing -0.025em
- H1 (mobile): 36px
- Sub (Rolle, uppercase): 16px / weight 300 / letter-spacing 0.18em / text-transform uppercase
- Body (about): 15px / line-height 1.8
- Body (research, secondary): 14px / line-height 1.8
- Mono-Labels (`// section`): 11px / letter-spacing 0.05em
- Mono-Inline (`// crafting...`): 12px

## Layout

- Max content width: 1100px (centered)
- Section padding: 48px vertical, 40px horizontal (desktop)
- Section padding (mobile): 32px vertical, 20px horizontal
- Two-column layout für Sektionen: `160px 1fr` Grid (Mono-Label links, Content rechts)
- Auf Mobile: Spalten zu Zeilen, Mono-Label oben

## Hintergrund-Grid

Subtiles Grid auf der ganzen Seite — direkt aus dem Banner übernommen.

```css
background-image:
  linear-gradient(var(--accent-gold-grid) 1px, transparent 1px),
  linear-gradient(90deg, var(--accent-gold-grid) 1px, transparent 1px);
background-size: 64px 64px;
```

## Sektionen — Trennung

Sektionen durch dünne goldene Linie getrennt: `border-top: 0.5px solid var(--accent-gold-line)`.
Keine großen Abstände zwischen Sektionen, eher Padding *innerhalb*.

## Komponenten

### Mono-Label (links in jeder Sektion)
```html
<p class="mono-label">// about</p>
```
- Farbe: `--accent-gold-soft`
- Font: mono
- Size: 11px
- Letter-spacing: 0.05em

### Gold-Trennlinie unter Hero-Headline
- 48px breit, 2px hoch, Background `--accent-gold`
- Margin: 0 0 20px

### Skill-Pill
```html
<span class="skill-pill">LangChain</span>
```
- Padding: 6px 12px
- Border: 0.5px solid rgba(212,181,114,0.3)
- Border-radius: 3px (eher kantig, keine vollen Pillen)
- Font: mono, 12px
- Color: rgba(255,255,255,0.85)
- Hover: Border auf `--accent-gold` voll, Hintergrund `rgba(212,181,114,0.06)`

### Skill-Kategorie-Header
```html
<div class="skill-category">
  <span class="skill-num">01</span>
  <p class="skill-title">AI & Agentic Systems</p>
  <div class="skill-line"></div> <!-- horizontale Linie, nimmt Restbreite -->
</div>
```
- Nummer in Gold, Mono, 11px
- Titel in Weiß, 14px
- Linie: 0.5px gold-line, flex: 1

### Research-Liste (Pfeil-Bullets)
- Custom Bullet: → in Gold (`--accent-gold`)
- Padding-left 20px, Pfeil absolute positioniert links

### Quick-Facts-Leiste
- 3 Spalten, gleichmäßig verteilt
- Hintergrund: `--bg-secondary`
- Border-top und border-bottom: gold-line
- Padding 28px vertical, 40px horizontal

## Hero-Bild (rechts)

```css
.hero-photo-container {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 540px;
  overflow: hidden;
}

/* Glow */
.hero-photo-glow {
  position: absolute;
  bottom: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, var(--accent-gold-glow) 0%, transparent 70%);
  pointer-events: none;
}

/* Foto selbst — sanft ins Schwarz auslaufend */
.hero-photo {
  position: relative;
  z-index: 1;
  max-width: 100%;
  height: auto;
  /* Maske, damit Foto nach unten ins Schwarz ausläuft */
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
          mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}
```

## Animationen (subtil)

- Beim Scrollen: Sektionen faden sanft ein (`opacity 0 → 1`, `translateY 12px → 0`), 600ms ease-out, einmalig
- Hover auf Skill-Pills: Border-Farbe wechselt in 200ms ease zu vollem Gold
- Hover auf Nav-Links: Farbe wechselt zu `--text-primary`
- Cursor blinkt nirgendwo (kein Terminal-Stil)
- Keine Parallax, keine schweren Animations-Libraries

## Responsive Breakpoints

- Desktop: ≥ 1024px (Standard-Layout, zwei Spalten Hero)
- Tablet: 640–1023px (Hero einspaltig, Foto kleiner unter Text oder optional weggelassen)
- Mobile: < 640px (alles einspaltig, kompakter)

## Accessibility

- Mindest-Kontrast WCAG AA für Body-Text
- Fokus-States für alle Links: 1px Gold-Outline
- `prefers-reduced-motion`: Animationen deaktivieren
- Semantisches HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- Logischer Heading-Flow: H1 nur einmal (Name), H2 für Sektion-Titel (visually hidden, weil wir Mono-Labels zeigen)

## Was NICHT machen

- Keine Roboter-Illustrationen wie im Banner (würden auf der Website kindlich wirken)
- Kein Terminal-Look (kein blinkender Cursor, keine `$ command`-Prompts im Body)
- Keine Schatten unter Cards / Tags (alles flach)
- Keine Verlauf-Hintergründe außer dem Glow hinterm Foto
- Kein zentriertes Layout (alles linksbündig, Editorial-Charakter)
