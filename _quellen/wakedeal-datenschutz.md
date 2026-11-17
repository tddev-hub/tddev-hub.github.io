
# Datenschutzerklärung für die App WakeDeal

Stand: 17. November 2026 · [English version](/wakedeal/privacy/)

## 1. Verantwortlicher

DoLabst – Inhaber und Anschrift: siehe [Impressum](/impressum/)
E-Mail: kontakt@dolabst.de

Einen Datenschutzbeauftragten haben wir nicht; dazu sind wir nicht verpflichtet.

## 2. Kurz zusammengefasst

- WakeDeal funktioniert **ohne Konto**, solange du keinen Geldbetrag einsetzt („Ehrenwort“). Dann bleiben alle Daten auf deinem Handy.
- Erst wenn du Geld einsetzt, brauchst du ein Konto. Dann speichern wir auf unserem Server nur, was für den Einsatz und die Abrechnung nötig ist.
- **Fotos und Kamerabilder werden nie gespeichert oder hochgeladen.** Die Erkennung läuft auf deinem Handy.
- Kein Tracking, keine Werbung, keine Analyse-Dienste.

## 3. Daten, die nur auf deinem Handy bleiben

Diese Daten speichert die App lokal. Sie werden nicht an uns übertragen und beim Löschen der App entfernt:

- Wecker-Einstellungen (Uhrzeit, Beweisart, Einsatzhöhe, Schrittzahl)
- Abend-Erinnerung (Uhrzeit, an/aus)
- Verlauf und Serie der Ehrenwort-Tage
- der hinterlegte Barcode (nur die Zeichenfolge, kein Bild)
- die Liste der Gegenstände, die du ausgeschlossen hast
- eine Warteschlange von Meldungen, die ohne Internet noch nicht gesendet wurden

### Erlaubnisse auf dem Handy

| Erlaubnis | Wofür | Was passiert mit den Daten |
|---|---|---|
| Kamera | Foto-Beweis (Gegenstand erkennen) und Barcode scannen | Bilder werden nur live ausgewertet, nicht gespeichert, nicht gesendet |
| Bewegung & Fitness / Körperliche Aktivität | Schritte-Beweis | Schritte werden nur während des Beweises gezählt, nicht gespeichert, nicht gesendet |
| Mitteilungen | Abend-Erinnerung | lokal auf dem Handy geplant, ohne Server |
| Wecker (iPhone: AlarmKit) | den Wecker stellen | bleibt auf dem Handy |

Du kannst jede Erlaubnis in den Einstellungen deines Handys widerrufen. Die betroffene Funktion steht dann nicht mehr zur Verfügung.

### Bilderkennung (Google ML Kit)

Für den Foto-Beweis nutzt die App die Bibliothek **ML Kit** von Google mit einem Erkennungsmodell, das in der App enthalten ist. Die Erkennung läuft vollständig auf deinem Handy; Kamerabilder werden nicht an Google oder an uns gesendet. ML Kit kann jedoch technische Nutzungs- und Diagnosedaten zur Bibliothek selbst (z. B. App- und Geräteinformationen, Leistungswerte) an Google übermitteln. Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer funktionierenden, sicheren Bibliothek).

## 4. Daten auf unserem Server (nur bei Geldeinsatz)

| Daten | Zweck | Rechtsgrundlage | Speicherdauer |
|---|---|---|---|
| E-Mail-Adresse (bzw. bei „Mit Apple anmelden“ ggf. eine von Apple weitergeleitete Adresse), Konto-ID, Anmeldezeitpunkte | Konto, Anmeldung, Kontakt bei Einsprüchen | Art. 6 Abs. 1 lit. b DSGVO (Vertrag) | bis zur Löschung des Kontos |
| Einsätze: Datum, Weckzeit, Betrag, Beweisart, Ergebnis (geschafft/verschlafen/abgebrochen), Zeitpunkte von Bestätigung, Beweis und Ergebnis, Zahlungsstatus | Durchführung und Abrechnung des Einsatzes | Art. 6 Abs. 1 lit. b DSGVO | bis zur Löschung des Kontos; Abrechnungsbelege siehe Abschnitt 8 |
| Einsprüche: Grund, Zeitpunkt, Entscheidung | Bearbeitung deines Einspruchs | Art. 6 Abs. 1 lit. b DSGVO | bis zur Löschung des Kontos |
| Kundennummer bei Stripe und Zahlungs-Kennungen | Zuordnung der Zahlungen | Art. 6 Abs. 1 lit. b DSGVO | bis zur Löschung des Kontos |
| technische Protokolle (z. B. IP-Adresse, Zeitpunkt von Anfragen) | Betrieb und Sicherheit des Servers | Art. 6 Abs. 1 lit. f DSGVO | in der Regel wenige Tage |

Was **nicht** auf den Server kommt: Einsätze mit 0 € (Ehrenwort), Fotos, Kamerabilder, Schrittdaten, Barcodes, Wecker-Einstellungen.

### Automatische Auswertung (Art. 22 DSGVO)

Erbringst du bis zum Ende der Kulanzzeit keinen Beweis bzw. meldet sich die App bis 2 Stunden nach der Weckzeit nicht, wertet unser Server den Einsatz automatisch als „verschlafen“; ohne Einspruch wird der vorgemerkte Betrag nach 24 Stunden abgebucht. Diese automatische Entscheidung ist für die Erfüllung des Vertrags erforderlich (Art. 22 Abs. 2 lit. a DSGVO). Du kannst jederzeit innerhalb von 24 Stunden in der App **Einspruch** einlegen; über Einsprüche entscheidet ein Mensch. Du kannst außerdem deinen Standpunkt darlegen und die Entscheidung anfechten.

## 5. Dienste, die wir einsetzen

### Supabase (Server und Konto)
Supabase, Inc. (USA). Mit Supabase besteht ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO). Soweit Daten in Länder außerhalb der EU übertragen werden, geschieht das auf Grundlage der EU-Standardvertragsklauseln.

### Stripe (Zahlungen)
Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Irland. Wenn du Geld einsetzt, wird der Betrag über Stripe auf deinem Zahlungsmittel nur **vorgemerkt** und lediglich bei verschlafenem Wecker abgebucht. Deine Kartendaten gibst du direkt bei Stripe bzw. über Apple Pay / Google Pay ein; **wir sehen deine vollständigen Kartendaten nie**. Stripe verarbeitet u. a. Zahlungsdaten, Betrag, E-Mail-Adresse, Geräte- und Verbindungsdaten zur Betrugsvermeidung. Stripe ist für einen Teil dieser Verarbeitung (z. B. Betrugsprävention, gesetzliche Pflichten) selbst verantwortlich. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO; Betrugsprävention Art. 6 Abs. 1 lit. f DSGVO. Datenschutz bei Stripe: https://stripe.com/de/privacy

### Apple Pay / Google Pay
Wenn du Apple Pay oder Google Pay nutzt, gelten zusätzlich die Datenschutzbestimmungen von Apple (https://www.apple.com/legal/privacy/) bzw. Google (https://policies.google.com/privacy). Wir erhalten von dort keine Kartendaten.

### Mit Apple anmelden
Auf dem iPhone kannst du dich mit deiner Apple-ID anmelden. Wir erhalten dabei eine Kennung und eine E-Mail-Adresse; wenn du „E-Mail-Adresse verbergen“ wählst, nur eine von Apple weitergeleitete Adresse. Anbieter: Apple Distribution International Ltd., Hollyhill Industrial Estate, Hollyhill, Cork, Irland. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.

### E-Mail-Versand (Resend und Supabase)
Für Anmelde-Links verwenden wir den Mailversand von Supabase, für Benachrichtigungen (z. B. zu Einsprüchen) den Dienst Resend (Resend, Inc., USA). Dabei werden E-Mail-Adresse und Inhalt der Nachricht verarbeitet. Mit Resend besteht ein Vertrag zur Auftragsverarbeitung; die Übermittlung in die USA erfolgt auf Grundlage geeigneter Garantien nach Art. 46 DSGVO (EU-Standardvertragsklauseln).

### Hosting dieser Seiten (GitHub Pages)
Diese Webseite (dolabst.de) liegt auf GitHub Pages (GitHub B.V., Niederlande / GitHub, Inc., USA). Beim Aufruf verarbeitet GitHub deine IP-Adresse und technische Daten, um die Seite auszuliefern und vor Missbrauch zu schützen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Datenschutz bei GitHub: https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement

### App Store / Google Play
Beim Herunterladen der App verarbeiten Apple bzw. Google Daten in eigener Verantwortung. Darauf haben wir keinen Einfluss.

## 6. Kein Tracking

Wir verwenden keine Analyse-, Werbe- oder Tracking-Dienste und erstellen keine Profile zu Werbezwecken.

## 7. Konto löschen

Du kannst dein Konto jederzeit in der App löschen (Einstellungen → Konto → Konto löschen). Dabei werden dein Konto und alle zugehörigen Daten auf unserem Server gelöscht. Solange ein Einsatz noch läuft, ist das Löschen gesperrt, damit er ordnungsgemäß abgeschlossen werden kann. Lokale Daten entfernst du, indem du die App löschst.

## 8. Gesetzliche Aufbewahrung

Zahlungen, die tatsächlich abgebucht wurden, sind Geschäftsvorfälle. Die dazugehörigen Abrechnungsbelege (bei Stripe) bewahren wir nach den steuer- und handelsrechtlichen Vorschriften auf (in der Regel 8 bzw. 10 Jahre, § 147 AO, § 257 HGB), auch wenn du dein Konto löschst. Rechtsgrundlage: Art. 6 Abs. 1 lit. c DSGVO.

## 9. Deine Rechte

Du hast das Recht auf
- Auskunft über deine gespeicherten Daten (Art. 15 DSGVO),
- Berichtigung (Art. 16 DSGVO),
- Löschung (Art. 17 DSGVO),
- Einschränkung der Verarbeitung (Art. 18 DSGVO),
- Datenübertragbarkeit (Art. 20 DSGVO),
- Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO),
- Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO), z. B. von Handy-Erlaubnissen.

Schreib uns dazu einfach an kontakt@dolabst.de.

## 10. Beschwerderecht

Du kannst dich bei einer Datenschutz-Aufsichtsbehörde beschweren, z. B. bei der für uns zuständigen:
Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, https://www.ldi.nrw.de

## 11. Mindestalter

Geldeinsätze sind erst ab 18 Jahren möglich. Wissentlich erheben wir keine Daten von Kindern unter 16 Jahren.

## 12. Änderungen

Wenn sich die App oder die eingesetzten Dienste ändern, passen wir diese Erklärung an. Es gilt die jeweils hier veröffentlichte Fassung.
