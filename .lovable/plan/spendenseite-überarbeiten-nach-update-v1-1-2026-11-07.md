# Spendenseite überarbeiten (nach Update v1.1)

## Was Besucher sehen werden
Neue Spendenseite in DE / EN / ES, Aufbau laut Vorgabe:

1. **Kopfbereich** – Titelbild (Mutter mit zwei Jungen), Überschrift "Hilfe beginnt heute. Nicht erst nach der Vereinsgründung.", Hinweis zum aktuellen Status (Verein in Gründung), drei Buttons (Spenden / Mitmachen / Kontakt) und das Kampagnenziel.
2. **Drei Spendenwege**
   - Banküberweisung – erst sichtbar, wenn Daten freigegeben sind.
   - Bitcoin – Ihr hochgeladener QR-Code, die Adresse bc1qdcknh849yme4msnnq3rrqh90xm4w6rjce60rjy mit Kopier-Knopf und ein Knopf "Mit Bitcoin zahlen", der direkt die Wallet-App öffnet. Wird sofort sichtbar geschaltet.
   - Silent Payments – als "in Vorbereitung" angezeigt.
   - Crowdfunding – nur allgemeine Plattform-Links, Kampagnen-Link bleibt leer bis Christof Kluska ihn bestätigt.
3. **Nothilfe-Beispiel** – das passende Plakat "Nothilfe in Holguín" (neue Version 1.1, Hochformat 4:5) je Sprache, ersetzt die alten Plakate (50 USD = ein Monat Lebensmittel).
4. **Mitmachen** – 8 Karten mit Möglichkeiten zur Mithilfe.
5. **Partner & Förderkreis** – Abschnitt für Unternehmen und Unterstützer.
6. **Transparenz-FAQ** – 8 Fragen und Antworten aus der Vorlage.
7. **Abschluss** – Aufruf mit Kontaktmöglichkeit.

**X-Kanal (neu, auf der ganzen Website):** Gut sichtbarer Hinweis "Folgen Sie uns auf X" mit Link zu https://x.com/HopeCuba – für aktuelle Infos, Erfolgsgeschichten, Projekt-Updates und Einblicke von Menschen vor Ort. Platziert auf der Startseite, auf der Spendenseite, im Teilen-Bereich und unten auf jeder Seite.

Wichtig vor der Eintragung: Als Empfänger wird Christof Kluska (Initiator) als privater Sammler genannt, nicht "Hope Cuba e.V.". Keine Countdowns oder Drucktexte. Bisherige Farben (Navy/Grün/Gold) bleiben.

## Regeln
- Ein Spendenweg erscheint nur, wenn er sowohl eingeschaltet als auch geprüft ist.
- Mitmachen, Kontakt und Partnerschaft sind immer aktiv.
- Statuswechsel (z. B. "eingetragen") schaltet nichts automatisch frei.

## Technische Details
- Neues Konfigurationsmodul `src/config/hope-cuba.ts` (LegalStatus, campaign, organization, payment: bank, bitcoin, silentPayments, crowdfunding); `organization-status.ts` liest daraus bzw. bleibt kompatibel.
- Neue Bilder (3 Nothilfe-Plakate v1.1, BTC-QR v1.0-2) als Lovable Assets in `media.ts`; Bitcoin enabled/verified = true, Link `bitcoin:<adresse>`.
- DonatePage in `Other.tsx` neu als eigene Komponente(n) unter `src/components/donate/`; alle Texte in `src/i18n/{de,en,es}.ts` (Copy-Tabelle aus der .md).
- `socialLinks.x = "https://x.com/HopeCuba"`; neuer Baustein für den X-Hinweis, Texte in DE/EN/ES.
- Externe Links mit `rel="noopener noreferrer"`.
- Tests (vitest) für die Sichtbarkeitsregeln: deaktiviert/ungeprüft = verborgen, Statuswechsel aktiviert nichts, Empfängername vor Eintragung = Christof Kluska.
- Seitentitel/Beschreibung je Sprache aktualisieren.
