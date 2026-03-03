# Motivation Machine

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Mobile-first single-page app displaying random motivational quotes
- Category filter tabs: Discipline, Business, Fitness, Life, Stoic
- Hardcoded quotes array (5+ quotes per category)
- "New Quote" button to randomly select another quote from the active category
- "Copy to Clipboard" button that copies the current quote text
- Subtle fade transition between quote changes
- Minimal, clean, bold, centered typography with flat design

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
- No backend needed (all data is hardcoded in frontend)
- Define quotes data structure: `{ id, text, author, category }`
- Build a single App component with:
  - Category tab row (Discipline, Business, Fitness, Life, Stoic + "All")
  - Quote display area with fade-in/out CSS transition on quote change
  - "New Quote" button to pick a random quote from current category
  - "Copy to Clipboard" button using navigator.clipboard API with toast feedback
- Design: bold centered text, flat colors, mobile-first layout
