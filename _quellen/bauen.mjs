// Baut die Webseite dolabst.de aus den Texten in _quellen/*.md.
// Aufruf im Ordner dolabst-webseite:  node _quellen/bauen.mjs
// Ordner mit Unterstrich veröffentlicht GitHub Pages nicht – die Quellen bleiben also intern.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const quellen = dirname(fileURLToPath(import.meta.url));
const ziel = join(quellen, '..');

// ---------- Apps ----------
// NEUE APP HINZUFÜGEN – so geht's:
//   1. Hier unten einen Eintrag ergänzen (id = Ordnername in der Adresse, z. B. 'meineapp').
//   2. Zwei Texte anlegen: _quellen/<id>-datenschutz.md (Deutsch) und _quellen/<id>-privacy.md (Englisch).
//   3. Optional: Symbol als <id>/symbol.png (oder .svg) ablegen und unter `symbol` eintragen.
//   4. Bauen: node _quellen/bauen.mjs
// Daraus entstehen automatisch: dolabst.de/<id>/datenschutz/ und /<id>/privacy/ (mit Sprachwechsel),
// die Karte auf der Startseite und der Eintrag auf der Übersicht dolabst.de/privacy/.
// Eine eigene App-Startseite (dolabst.de/<id>/) wird weiter unten von Hand gebaut; dann `startseite: true` setzen.
const APPS = [
  { id: 'wakedeal', name: 'WakeDeal', symbol: '/wakedeal/symbol.svg', startseite: true, hervor: true,
    kurz: 'Der Wecker, bei dem Verschlafen Geld kostet. Bald im App Store.' },
  { id: 'fullout', name: 'FullOut', symbol: '/fullout/symbol.png', startseite: true,
    kurz: 'Reaktionsspiel: Countdown abwarten, im richtigen Moment reagieren, Bestzeit auf die Millisekunde.' },
  { id: 'rivet', name: 'RIVET', symbol: '/rivet/symbol.png', startseite: true,
    kurz: 'Das Partyspiel für Gruppen: Wer das leere Feld erwischt, verliert die Runde.' },
];

// ---------- Weitere Textseiten: [Quelldatei, Zielordner, Sprache, Titel, Bereich] ----------
const SEITEN = [
  ['impressum.md', 'impressum', 'de', 'Impressum / Legal notice', null],
  ['wakedeal-nutzungsbedingungen.md', 'wakedeal/nutzungsbedingungen', 'de', 'Nutzungsbedingungen – WakeDeal', 'wakedeal'],
];
// Datenschutzseiten jeder App kommen automatisch dazu
for (const app of APPS) {
  SEITEN.push([`${app.id}-datenschutz.md`, `${app.id}/datenschutz`, 'de', `Datenschutzerklärung – ${app.name}`, app.id]);
  SEITEN.push([`${app.id}-privacy.md`, `${app.id}/privacy`, 'en', `Privacy Policy – ${app.name}`, app.id]);
}

// ---------- Kleiner Markdown-Umsetzer (Überschriften, Absätze, Listen, Tabellen, fett, Links) ----------
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function zeile(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2">$2</a>');
  s = s.replace(/(^|[\s(:])([\w.+-]+@dolabst\.de)/g, '$1<a href="mailto:$2">$2</a>');
  return s;
}
function markdown(text) {
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  const zeilen = text.split(/\r?\n/);
  let html = '', i = 0;
  while (i < zeilen.length) {
    const z = zeilen[i];
    if (!z.trim()) { i++; continue; }
    let m;
    if ((m = z.match(/^(#{1,3}) (.*)$/))) { html += `<h${m[1].length}>${zeile(m[2])}</h${m[1].length}>\n`; i++; continue; }
    if (/^---+$/.test(z.trim())) { html += '<hr>\n'; i++; continue; }
    if (/^\s*- /.test(z)) {
      html += '<ul>\n';
      while (i < zeilen.length && /^\s*- /.test(zeilen[i])) { html += `<li>${zeile(zeilen[i].replace(/^\s*- /, ''))}</li>\n`; i++; }
      html += '</ul>\n'; continue;
    }
    if (z.trim().startsWith('|')) {
      const reihen = [];
      while (i < zeilen.length && zeilen[i].trim().startsWith('|')) { reihen.push(zeilen[i].trim()); i++; }
      const zellen = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      html += '<div class="tabelle"><table>\n<thead><tr>' + zellen(reihen[0]).map(c => `<th>${zeile(c)}</th>`).join('') + '</tr></thead>\n<tbody>\n';
      for (const r of reihen.slice(2)) html += '<tr>' + zellen(r).map(c => `<td>${zeile(c)}</td>`).join('') + '</tr>\n';
      html += '</tbody></table></div>\n'; continue;
    }
    // Absatz: aufeinanderfolgende Zeilen, Zeilenumbrüche bleiben erhalten (für Anschriften)
    const absatz = [];
    while (i < zeilen.length && zeilen[i].trim() && !/^(#{1,3} |\s*- |\||---+$)/.test(zeilen[i].trim())) { absatz.push(zeile(zeilen[i].trim())); i++; }
    html += `<p>${absatz.join('<br>\n')}</p>\n`;
  }
  return html;
}

// ---------- Rahmen ----------
// App-Symbol (Bilder mit Fotoinhalt bekommen abgerundete Ecken wie auf dem iPhone)
function symbolBild(app, groesse, extraKlasse = '') {
  if (!app.symbol) return `<span class="logo">${esc(app.name[0])}</span>`;
  const klasse = [app.symbol.endsWith('.svg') ? '' : 'app-symbol', extraKlasse].filter(Boolean).join(' ');
  return `<img${klasse ? ` class="${klasse}"` : ''} src="${app.symbol}" alt="" width="${groesse}" height="${groesse}">`;
}
const rechtsLinks = app => `<a href="/${app.id}/privacy/">Privacy Policy</a> · <a href="/${app.id}/datenschutz/">Datenschutzerklärung</a>`;
const CSS = readFileSync(join(quellen, 'stil.css'), 'utf8');
function rahmen({ titel, sprache, inhalt, bereich, beschreibung, noindex }) {
  const de = sprache === 'de';
  const app = APPS.find(a => a.id === bereich);
  const marke = app
    ? `<a class="marke" href="${app.startseite ? `/${app.id}/` : '/'}">${symbolBild(app, 32)}${esc(app.name)}</a>`
    : `<a class="marke" href="/"><span class="logo">D</span>DoLabst</a>`;
  return `<!doctype html>
<html lang="${sprache}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beschreibung || titel)}">
<meta name="color-scheme" content="dark light">${noindex ? '<meta name="robots" content="noindex">' : ''}
<style>${CSS}</style>
</head>
<body>
<header class="kopf"><div class="breite">${marke}<nav><a href="/">DoLabst</a><a href="/impressum/">${de ? 'Impressum' : 'Legal notice'}</a></nav></div></header>
<main class="breite">
${inhalt}
</main>
<footer class="fuss"><div class="breite">© 2026 DoLabst · <a href="/impressum/">${de ? 'Impressum' : 'Legal notice'}</a> · <a href="mailto:kontakt@dolabst.de">kontakt@dolabst.de</a></div></footer>
</body>
</html>
`;
}
function schreiben(ordner, html) {
  const pfad = join(ziel, ordner, 'index.html');
  mkdirSync(dirname(pfad), { recursive: true });
  writeFileSync(pfad, html);
  console.log(join(ordner, 'index.html'));
}

// ---------- Textseiten ----------
for (const [datei, ordner, sprache, titel, bereich] of SEITEN) {
  const inhalt = `<article class="text">\n${markdown(readFileSync(join(quellen, datei), 'utf8'))}</article>`;
  schreiben(ordner, rahmen({ titel, sprache, inhalt, bereich, noindex: ordner === 'impressum' }));
}

// ---------- Startseite ----------
schreiben('.', rahmen({
  titel: 'DoLabst – Apps für iPhone', sprache: 'de',
  beschreibung: 'DoLabst entwickelt schlichte Apps für iPhone: WakeDeal, FullOut und RIVET.',
  inhalt: `
<section class="held">
  <h1>DoLabst</h1>
  <p class="unter">Schlichte Apps, die eine Sache gut machen.</p>
  <p class="klein">Simple apps that do one thing well.</p>
</section>
<section class="karten">
${APPS.map(app => app.startseite
  ? `  <a class="karte${app.hervor ? ' hervor' : ''}" href="/${app.id}/">
    ${symbolBild(app, 64)}
    <div><h2>${esc(app.name)}</h2><p>${esc(app.kurz)}</p></div>
  </a>`
  : `  <div class="karte">
    ${symbolBild(app, 64)}
    <div><h2>${esc(app.name)}</h2>${app.kurz ? `<p>${esc(app.kurz)}</p>` : ''}<p>${rechtsLinks(app)}</p></div>
  </div>`).join('\n')}
</section>
<section class="kontakt"><h2>Kontakt</h2><p><a href="mailto:kontakt@dolabst.de">kontakt@dolabst.de</a></p></section>`
}));

// ---------- Übersicht dolabst.de/privacy/ ----------
// Alte, allgemeine Adresse (stand früher im App Store). Bleibt erreichbar und führt zu jeder App.
schreiben('privacy', rahmen({
  titel: 'Privacy Policy / Datenschutz – DoLabst', sprache: 'en',
  beschreibung: 'Privacy policies for all DoLabst apps. · Datenschutzerklärungen aller Apps von DoLabst.',
  inhalt: `
<article class="text">
<h1>Privacy Policy · Datenschutz</h1>
<p>Each of our apps has its own privacy policy. Please choose your app.<br>
Jede unserer Apps hat eine eigene Datenschutzerklärung. Bitte wähle deine App.</p>
</article>
<section class="karten">
${APPS.map(app => `  <div class="karte">
    ${symbolBild(app, 48)}
    <div><h2>${esc(app.name)}</h2><p>${rechtsLinks(app)}</p></div>
  </div>`).join('\n')}
</section>
<p class="klein">Controller / Verantwortlicher: DoLabst – <a href="/impressum/">Legal notice / Impressum</a> · <a href="mailto:kontakt@dolabst.de">kontakt@dolabst.de</a></p>`
}));

// ---------- WakeDeal-Startseite ----------
schreiben('wakedeal', rahmen({
  titel: 'WakeDeal – Dein Deal mit dir selbst', sprache: 'de', bereich: 'wakedeal',
  beschreibung: 'WakeDeal: Der Wecker, bei dem Verschlafen Geld kostet. Aufstehen mit Beweis – Barcode, Schritte oder Foto.',
  inhalt: `
<section class="held">
  <img class="symbol" src="/wakedeal/symbol.svg" alt="" width="120" height="120">
  <h1>Dein Deal<br>mit dir selbst.</h1>
  <p class="unter">Der Wecker, bei dem Verschlafen Geld kostet.</p>
  <p class="klein">Bald im App Store für iPhone. · Coming soon to the App Store.</p>
</section>
<section class="schritte">
  <div class="karte"><span class="nr">1</span><div><h2>Abends bestätigen</h2><p>Weckzeit, Beweis und Einsatz wählen – 1 bis 20 € oder nur dein Ehrenwort.</p></div></div>
  <div class="karte"><span class="nr">2</span><div><h2>Morgens beweisen</h2><p>Barcode im Bad scannen, Schritte gehen oder einen Gegenstand mit der Kamera finden.</p></div></div>
  <div class="karte"><span class="nr">3</span><div><h2>Geschafft?</h2><p>Dann wird der vorgemerkte Betrag freigegeben. Verschlafen? Dann wird er abgebucht – vorher kannst du Einspruch einlegen.</p></div></div>
</section>
<section class="links">
  <h2>Rechtliches · Legal</h2>
  <p><a href="/wakedeal/datenschutz/">Datenschutzerklärung</a> · <a href="/wakedeal/privacy/">Privacy Policy (English)</a><br>
  <a href="/wakedeal/nutzungsbedingungen/">Nutzungsbedingungen</a> · <a href="/impressum/">Impressum</a></p>
  <h2>Support</h2>
  <p>Fragen, Probleme, Einspruch? Schreib uns: <a href="mailto:kontakt@dolabst.de?subject=WakeDeal">kontakt@dolabst.de</a></p>
</section>`
}));

// ---------- FullOut-Startseite (zweisprachig, Support-URL im App Store) ----------
schreiben('fullout', rahmen({
  titel: 'FullOut – Show your best time', sprache: 'de', bereich: 'fullout',
  beschreibung: 'FullOut: Reaktionsspiel für iPhone und iPad. Countdown abwarten, im richtigen Moment reagieren, Bestzeit auf die Millisekunde.',
  inhalt: `
<section class="held">
  <img class="symbol app-symbol" src="/fullout/symbol.png" alt="" width="120" height="120">
  <h1>FullOut</h1>
  <p class="unter">Bereit? Zeig deine Bestzeit.</p>
  <p class="klein">Das Reaktionsspiel für iPhone und iPad – Zeitmessung auf die Millisekunde.<br>Ready? Show your best time. A reaction game for iPhone and iPad.</p>
</section>
<section class="schritte">
  <div class="karte"><span class="nr">1</span><div><h2>Objekt platzieren · Place an object</h2><p>Leg ein Objekt in die Sensor Zone oben am Display. · Put an object in the Sensor Zone at the top of the screen.</p></div></div>
  <div class="karte"><span class="nr">2</span><div><h2>Countdown abwarten · Wait for the countdown</h2><p>Erst im richtigen Moment reagieren. · React at exactly the right moment.</p></div></div>
  <div class="karte"><span class="nr">3</span><div><h2>Zeit stoppen · Stop the clock</h2><p>Objekt zurücklegen – FullOut misst deine Zeit auf die Millisekunde. · Put the object back – FullOut measures your time to the millisecond.</p></div></div>
</section>
<section class="links">
  <h2>Hinweis · Note</h2>
  <p>Am besten leichte, nicht durchsichtige und nicht zerbrechliche Objekte verwenden – kein Glas oder Metall, das kann das Display beschädigen.<br>
  Use light, non-transparent, unbreakable objects – no glass or metal, as they can damage the screen.</p>
  <h2>Support</h2>
  <p>Fragen oder Probleme? · Questions or problems?<br>
  <a href="mailto:kontakt@dolabst.de?subject=FullOut">kontakt@dolabst.de</a></p>
  <h2>Rechtliches · Legal</h2>
  <p><a href="/fullout/datenschutz/">Datenschutzerklärung</a> · <a href="/fullout/privacy/">Privacy Policy</a> · <a href="/impressum/">Impressum / Legal notice</a></p>
</section>`
}));

// ---------- RIVET-Startseite (zweisprachig, wird Support-URL im App Store) ----------
schreiben('rivet', rahmen({
  titel: 'RIVET – Game of Chance', sprache: 'en', bereich: 'rivet',
  beschreibung: 'RIVET: a fast-paced party game for groups. Whoever hits the blank tile loses the round.',
  inhalt: `
<section class="held">
  <img class="symbol app-symbol" src="/rivet/symbol.png" alt="" width="120" height="120">
  <h1>RIVET</h1>
  <p class="unter">How far will you go?</p>
  <p class="klein">A fast-paced party game for groups – for iPhone and iPad.<br>Das schnelle Partyspiel für Gruppen – für iPhone und iPad.</p>
</section>
<section class="schritte">
  <div class="karte"><span class="nr">1</span><div><h2>Tap a tile · Feld antippen</h2><p>Players take turns tapping on tiles. · Reihum tippt jeder auf ein Feld.</p></div></div>
  <div class="karte"><span class="nr">2</span><div><h2>Make it yours · Mach es persönlich</h2><p>Emojis, icons or your own photos and sounds. · Emojis, Symbole oder eigene Fotos und Sounds.</p></div></div>
  <div class="karte"><span class="nr">3</span><div><h2>Blank tile? · Leeres Feld?</h2><p>Whoever hits the blank tile loses the round. · Wer das leere Feld erwischt, verliert die Runde.</p></div></div>
</section>
<section class="links">
  <h2>Support</h2>
  <p>Questions or problems? · Fragen oder Probleme?<br>
  <a href="mailto:kontakt@dolabst.de?subject=RIVET">kontakt@dolabst.de</a></p>
  <h2>Legal · Rechtliches</h2>
  <p><a href="/rivet/privacy/">Privacy Policy</a> · <a href="/rivet/datenschutz/">Datenschutzerklärung</a> · <a href="/impressum/">Impressum / Legal notice</a></p>
</section>`
}));
