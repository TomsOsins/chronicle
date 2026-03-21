# Chronicle: Development Roadmap

## Current State
- ✅ Gemini-powered city generation with 6 data views
- ✅ Ledger system for organizing cities
- ✅ Persistent localStorage storage
- ✅ EVA-inspired UI with micro-animations
- ✅ Ready for Vercel deployment

---

## Phase 1: Core Editor Features (Next Priority)

### Manual City Creation Wizard
- [ ] Multi-step form to manually create cities
  - Step 1: Basic info (name, population, government, economy, history)
  - Step 2: Strategic vitals (security rating, trade volume, stability)
  - Step 3: Geography (coordinates, territory, resources)
  - Step 4: Magic system (leyline nodes, arcane signature)
  - Step 5: Society (demographics, unrest, hierarchy)
  - Step 6: Defense (walls, garrison, siege days, defense nodes)
  - Step 7: Theology (pantheon, faith tension, miracles)
  - Step 8: Commerce (commodities, wealth gap, exports)
- Form validation and error handling
- Preview before save
- Save to active ledger

### City Editing
- [ ] Edit existing cities (generated or manual)
  - Section-by-section editing
  - Inline editing in data views
  - Modal forms for complex fields
- [ ] Undo/redo functionality
- [ ] Mark cities as "custom" vs "generated"
- [ ] Edit history log

### Import/Export
- [ ] Export city as JSON
- [ ] Import city from JSON file
- [ ] Batch import multiple cities
- [ ] Export ledger as JSON (all cities)
- [ ] Print-friendly views (PDF-ready HTML)

---

## Phase 2: Discovery & Organization

### City Management
- [ ] Search cities by name/property
- [ ] Filter by: government, economy, magic level, population range
- [ ] Sort cities: alphabetical, date created, magic level, population
- [ ] Favorites/starred cities
- [ ] City tags/categories for custom organization
- [ ] Bulk operations: delete multiple, batch tag, batch ledger move

### Ledger Enhancements
- [ ] Ledger statistics dashboard
  - Average city stats across ledger
  - Population distribution charts
  - Magic level trends
  - Timeline view (cities by era/cycle)
- [ ] Ledger templates (e.g., "Medieval Campaign", "High Magic Continent")
- [ ] Export entire ledger as PDF

### City Comparison
- [ ] Side-by-side city comparison view
- [ ] Compare up to 3 cities across all metrics
- [ ] Highlight differences

---

## Phase 3: Content Features

### City Variations
- [ ] "Tweak" button to regenerate specific city sections
  - Keep some data, regenerate others
  - E.g., keep name/location, regenerate government/economics
- [ ] Alternative names/descriptions for the same city
- [ ] Timeline variations (city in different eras)

### NPCs & Districts Deep Dive
- [ ] Expanded NPC profiles
  - Skills, relationships, motivations
  - Add custom NPCs
  - NPC interaction web view
- [ ] District maps (visual grid layout)
  - Drag-and-drop districts
  - Add custom locations within districts
- [ ] Rumors board (filter, tag, mark as investigated)

### Notes & Annotations
- [ ] City-level notes/journals
- [ ] Per-section inline notes
- [ ] Markdown support
- [ ] Pin important notes

---

## Phase 4: Sharing & Collaboration

### Sharing
- [ ] Generate shareable links for cities
- [ ] Public city gallery
- [ ] Community uploads (with user accounts)
- [ ] Share as QR code
- [ ] Generate share codes (temporary access)

### Collaboration
- [ ] Multi-user ledgers (basic invite system)
- [ ] Comments on cities
- [ ] Version control for shared cities

---

## Phase 5: Advanced Features

### VTT Integration
- [ ] Export for Roll20 (handout format)
- [ ] Export for Foundry VTT (JSON module)
- [ ] Battle map exports

### Analytics & Stats
- [ ] Global statistics (across all ledgers)
- [ ] City generation history chart
- [ ] Most-used government types, economies, etc.
- [ ] Word clouds from descriptions

### Customization
- [ ] Theme editor (color schemes)
- [ ] Animation toggle/speed controls
- [ ] Custom fonts
- [ ] Dark/light mode toggle
- [ ] Layout presets

### AI Enhancements
- [ ] Claude API integration (alongside Gemini for content refinement)
- [ ] AI-powered city name generator
- [ ] AI story generator from city data
- [ ] NPC backstory generator
- [ ] Dynamic city events/hooks generator

---

## Phase 6: Polish & Performance

- [ ] Mobile responsiveness optimization
- [ ] Offline mode with service worker
- [ ] Caching strategy for faster loads
- [ ] Performance monitoring
- [ ] Accessibility audit (WCAG AA)
- [ ] Keyboard shortcuts cheat sheet
- [ ] Onboarding tutorial

---

## Potential Nice-to-Haves

- City relationship mapper (trade routes, alliances, conflicts)
- Weather/climate system generator
- Religion/pantheon conflict simulator
- Economy simulator (trading between cities)
- Campaign journal integration
- Session notes linked to cities
- Character birth city generator
- Faction system (factions per city, relationships)
- Custom data fields (extensible schemas)
- API for third-party tools

---

## Technical Debt & Refactoring

- [ ] Break up App.tsx (too large)
- [ ] Extract modal logic into custom hook
- [ ] Refactor animation components
- [ ] Add proper error boundaries
- [ ] Improve TypeScript strict mode compliance
- [ ] Add unit tests for core utilities
- [ ] Add E2E tests with Cypress/Playwright
- [ ] Improve bundle size analysis

---

## Notes

- **Highest impact first**: Wizard → Editing → Import/Export → Search/Filter
- **User feedback**: Let community guide Phase 4+ priorities
- **Iteration**: Each phase can have sub-releases
- **Sustainability**: Keep API costs low (Gemini free tier focus)
