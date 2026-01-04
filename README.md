

Min Bokliste - JavaScript Webapp:

<img width="2548" height="1218" alt="Skjermbilde 2026-01-04 203633" src="https://github.com/user-attachments/assets/22d82988-80e3-4aa9-91d4-fe501dd27f4d" />

Dette prosjektet er en enkel webapplikasjon hvor brukeren kan legge inn, vise og administrere bøker. Data lagres i localStorage slik at de ikke forsvinner når siden lukkes.

Funksjonalitet:
Legge til bøker:
Brukeren kan skrive inn tittel, forfatter, sjanger og antall sider. Når en bok legges til, blir den lagret i localStorage og vist i en tabell på siden.

Vise bøker:
Alle bøker som ligger lagret blir hentet fra localStorage og vist i en tabell når siden åpnes.

Favorittmerke:
Hver bok kan markeres som favoritt. Dette lagres også i localStorage.

Slette bøker:
En bok kan slettes enkeltvis via en knapp i tabellen.
Det finnes også en knapp for å slette alle bøker.

Filtrering og sortering:
Applikasjonen har mulighet for filtrering etter sjanger og sortering etter tittel, forfatter eller antall sider.

Statistikk:
Det vises enkel statistikk basert på dataene:
-Totalt antall bøker
-Totalt antall sider
-Bøker per sjanger
-Statistikken oppdateres automatisk når data endres.


Brukte JavaScript-metoder og konsepter:
-localStorage (lagring av data)
-map(), filter(), sort(), reduce()
-Destructuring
-Event listeners
-DOM-manipulasjon


Teknologi:
-HTML
-CSS
-JavaScript (vanilla)

Mappestruktur:
app.js
background.library.mp4
index.html
README.md
style.css
