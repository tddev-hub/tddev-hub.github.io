// Baut die Webseite dolabst.de aus den Texten in _quellen/*.md.
// Aufruf im Ordner dolabst-webseite:  node _quellen/bauen.mjs
// Ordner mit Unterstrich veröffentlicht GitHub Pages nicht – die Quellen bleiben also intern.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const quellen = dirname(fileURLToPath(import.meta.url));
const ziel = join(quellen, '..');

// ---------- Seiten: [Quelldatei, Zielordner, Sprache, Titel, Bereich] ----------
const SEITEN = [
  ['impressum.md', 'impressum', 'de', 'Impressum / Legal notice', null],
  ['privacy.md', 'privacy', 'en', 'Privacy Policy – FullOut & RIVET', null],
  ['wakedeal-datenschutz.md', 'wakedeal/datenschutz', 'de', 'Datenschutzerklärung – WakeDeal', 'wakedeal'],
  ['wakedeal-privacy.md', 'wakedeal/privacy', 'en', 'Privacy Policy – WakeDeal', 'wakedeal'],
  ['wakedeal-nutzungsbedingungen.md', 'wakedeal/nutzungsbedingungen', 'de', 'Nutzungsbedingungen – WakeDeal', 'wakedeal'],
];

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
const CSS = readFileSync(join(quellen, 'stil.css'), 'utf8');
function rahmen({ titel, sprache, inhalt, bereich, beschreibung, noindex }) {
  const de = sprache === 'de';
  const marke = bereich === 'wakedeal'
    ? `<a class="marke" href="/wakedeal/"><img src="/wakedeal/symbol.svg" alt="" width="32" height="32">WakeDeal</a>`
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
  <a class="karte hervor" href="/wakedeal/">
    <img src="/wakedeal/symbol.svg" alt="" width="64" height="64">
    <div><h2>WakeDeal</h2><p>Der Wecker, bei dem Verschlafen Geld kostet. Bald im App Store.</p></div>
  </a>
  <div class="karte">
    <div><h2>FullOut</h2><p><a href="/privacy/">Privacy Policy</a></p></div>
  </div>
  <div class="karte">
    <div><h2>RIVET</h2><p><a href="/privacy/">Privacy Policy</a></p></div>
  </div>
</section>
<section class="kontakt"><h2>Kontakt</h2><p><a href="mailto:kontakt@dolabst.de">kontakt@dolabst.de</a></p></section>`
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
