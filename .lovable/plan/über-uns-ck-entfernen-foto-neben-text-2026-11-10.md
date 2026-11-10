# Über uns: "(CK)" entfernen, Foto neben Text

1. "(CK)" im Einleitungstext auf Deutsch, Englisch und Spanisch löschen – nur noch "Christof Kluska".
2. Neues Foto (Christof Kluska mit Kind in Holguín, Version 1.1-2) hochladen und das alte Foto ersetzen.
3. Kopfbereich von "Über uns": Text links, Foto rechts daneben (auf dem Handy darunter), abgerundet, mit Bildbeschreibung in allen drei Sprachen.

## Technisch
- `story` in `src/i18n/{de,en,es}.ts` ohne "(CK)"; neuer Key `about.photoAlt`.
- Asset `christof-kluska-holguin-v12.png.asset.json`; in `AboutPage` (Other.tsx) eigener zweispaltiger Header statt `PageHeader intro`.
