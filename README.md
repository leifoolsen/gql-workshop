# Kom i gang med utvikling

Følg disse stegene for å benytte dette prosjektet sum en basis for ditt eget prosjekt.

```bash
# Flytt til ønsket utviklingskatalog
cd dev

# Klon prosjektet
git clone https://github.com/leifoolsen/gql-workshop.git

cd gql-workshop     # Flytt til prosjektroten
npm install         # Installer avhengigheter
npm run start:dev   # Start utvikling
```

Åpne nettleser og naviger til: `localhost:3000`

## Slik benytter du dette prosjektet som en mal for eget prosjekt
Før du kan benytte dette prosjektet som et utgangspunkt for ditt eget prosjekt, må du fjerne eksisterende `.git`-filer.
```bash
cd ..                          # Flytt til parent directory
mv gql-workshop mitt-prosjekt  # Gi prosjektkatalogen et navn som gjenspeiler  prosjektnavnet
cd mitt-ptrosjekt              # Flytt til den nye prosjektroten
```

**Fjern `.git`, Windows**
```bash
del /F /S /Q /A .git  # Fjerner alle filene i .git katalogen
rmdir .git            # Fjerner .git katalogen
```

**Fjern `.git`, Mac / Linux**
```bash
rm -rf .git
```

**Åpne `package.json`**

```json
{
  "name": "gql-workshop",
  "version": "0.0.0",
  "main": "index.js",
  "description": "GraphQL workshop",
  "repository": {
    "type": "git",
    "url": "https://github.com/leifoolsen/gql-workshop.git"
  }
}
```
* Finn `repository`-seksjonen og sett inn korrekt URL
* Endre "name" slik at det gjenspeiler prosjektnavnet
* Endre andre ting i `package.json` etter behov 
* Deretter: 

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin <ssh_or_https_url>
git push
```

>Det finnes flere måter å kopiere fra et eksisterende git/stash prosjekt til et nytt prosjekt.
>Benytt den framgangsmåten som passer deg best. 

### Start koding
```bash 
npm run start:dev  # Start applikasjonen i utviklingsmodus
``` 
* Åpne en nettleser og naviger til http://localhost:3000/
* Klikk på Søk for å vise et søkeresultat
* Sjekk at Hot Module Replacement (HMR) virker
  * Åpne filen `src/client/containers/SearchContainer.js`
  * Finn denne koden, og endre bakgrunnsfargen til f.eks. grønn
  ```javascript
  const SearchResult = ({result}) => {
    const divStyle = {
      background: '#eee',
      padding: '20px',
      margin: '20px'
    };
  ...
  ```
  * Lagre endringen
  ```javascript
  const SearchResult = ({result}) => {
    const divStyle = {
      background: 'green',
    };
  ...
  ```
  * Bytt til nettleseren hvor du åpnet applikasjonen
  * Bakgrunnsfargen til søkeresultatet skal nå være grønn

## Prosjektstruktur
```
.
├── dist                                    # Produksjonsklar kode
│   ├── bin                                 # Server (Node Express)
│   └── client                              # Statiske filer som bilder, HTML, CSS og JavaScript
├── src                                     # Kildekode 
│   ├── config                              # Client og Server konfigurasjon
│   │   ├── config.default.json             # Standard instillinger
│   │   ├── config.development.json         # Utviklingsspesifikke instillinger
│   │   ├── config.production.json          # Produksjonsspesifikke instillinger
│   │   ├── config.test.json                # Testspesifikke instillinger
│   │   └── index.js                        # Server configuration entry point
│   ├── client                              # Klientkode
│   │   ├── components                      # Reusable components (including scss/testing files)
│   │   ├── containers                      # Container components (including scss/testing files)
│   │   ├── actions                         # Redux actions (including testing files)
│   │   ├── reducers                        # Redux reducers (including testing files)
│   │   ├── helpers                         # App-wide helpers (e.g. configure Redux store, HTML template etc.)  
│   │   ├── theme                           # App-wide style and vendor CSS framework
│   │   ├── utils                           # Utilitykode
│   │   ├── index.html                      # Indexside (dekoreres av webpack)
│   │   └── favicon.ico                     # Favicon
│   ├── server                              # Serverkode
│   │   ├── gql                             # GraphQl relatert kode
│   │   ├── logger                          # Oppsett av logger
│   │   └── utils                           # Utilitykode server
│   └── bin                                 # Serverimplementsjon, Node Express
│       ├── middlewares                     # Node Express middlewares
│       ├── api-app.js                      # API server implementasjon
│       ├── api-server.js                   # API server oppstartfil med HMR
│       ├── app.js                          # Frontend server implementasjon med webpack dev/hot middlewares
│       ├── server.js                       # Frontend server oppstartfil 
│       └── index.js                        # Frontendserver entry point 
├── tools                                   # Byggrelatert konfigurasjon
│   ├── jest                                # Jest konfigurasjon
│   └── webpack                             # Webpackkonfigurasjon
│       ├── webpack.config.base.js          # Webpack base configuration
│       ├── webpack.config.dev.babel.js     # Webpack dev configuration
│       ├── webpack.config.prod.babel.js    # Webpack prod configuration
│       └── webpack.config.server.babel.js  # Webpack server konfigurasjon
├── .babelrc                                # Babel API konfigurasjon  
├── .editorconfig                           # Editorinnstillinger som kan benyttes uvhengig av valgt IDE  
├── .eslitrc                                # Lintregler for JavaScript 
├── .stylelintrc                            # Lintregler for CSS/SASS/LESS 
├── postcss.config.js                       # postcss-loader konfigurasjon 
└── index.js                                # App entry point
```

## NPM-kommandoer

| Kommando               | Beskrivelse                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `clean`                | Sletter genererte kalaloger, som `./build` og `./dist`.                                        |
| `setup`                | Kjører `clean && npm install && selenium-standalone install`.                                  |
| `start:dev`            | Starter HMR utviklingsserver.                                                                  |
| `start:dev -- --proxy` | Starter HMR utviklingsserver med proxy mot separat API-server.                                 |
| `start:api`            | Starter HMR API server på `localhost:3001`.                                                    |
| `start`                | Kjører bundlet kode fra `./dist`. Bundlet kode må bygges med `build` før den kan kjøres.       |
| `build`                | Bygger (bundler) klient- og serverkode til `./dist`.                                           |
| `lint`                 | Kjører `lint:js` og `lint:css`.                                                                |
| `lint:js`              | Lint `.js` filer (Benytt `--fix` for å autokorrigere eslint feil).                             |
| `lint:style`           | Lint `.css` filer (Benytt `--fix` for å autokorrigere stylelint errors).                       |
| `test`                 | Kjører `test:unit` og `test:it`                                                                |
| `test:unit`            | Kjører enhetstester.                                                                           |
| `test:unit -- --watch` | Kjører enhetstester kontinuerlig. Kun tester relatert til kode som endres kjøres på nytt.      |
| `test:it`              | Kjører integrasjonstester.                                                                     |
| `test:it -- --watch`   | Kjører integrasjonstester kontinuerlig. Kun tester relatert til kode som endres kjøres på nytt.|

## Utvikling
All kode utvikles og bygges/bundles med [Webpack](https://webpack.js.org/concepts/).

### Code splitting - Common Chunks Plugin
[CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) benyttes for å dele koden opp i 
"naturlige" biter. All tredjaparts kode, som React, bør legges inn i en eller flere chunks. Dette prosjektet
legger all tredjeparts kode i en chunk. Med tredjeparts kode menes alle avhengigheter listet under
`"dependencies"` i `package.json`.

### Code splitting - system.import
Avhengigheter som kun benyttes i spesielle tilfeller kan man sette opp slik at de kun lastes ved behov. Et eksempel på 
dette kan være polyfills: Dersom en nettleser ikke støtter en standard-funksjonalitet, som f.eks. Fetch API, kan man
polyfille denne med **system.import**. Webpack vil under bygging lage en "kodesplitt" for dette som kun lastes 
når man kjører applikasjonen på en nettleser som ikke støtter Fetch.

Et annet tilfelle kan være at man ønsker å benytte `moment`-biblioteket til å formatere datoer. Denne avhengigheten
vil øke størrelsen på applikasjonen, og dermed nedlastinigstiden, betraktelig. Siden funksjonen, i dette tenkte 
tilfellet, bare skal brukes nå og da, benyttes system.import.   

```javascript
async function formatTimeStamp() {
  const moment = await import('moment');  // <-- system.import moment
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

const enFunksjon = () => {
  return formatTimeStamp()
    .then((timeStamp) => timeStamp)
    .catch((err) => err);
}
```
Moduler som lastes med system.import **skal ikke** refereres i Common Chunks plugin!

### Klient med HMR
I utviklingsmodus startes prosjektet med Hot Module Replacement, HMR, for klientkoden. Dette gjør at endringer i 
koden umiddelbart vises i nettleseren, uten at man behøver å oppfriske nettleseren eller restarte utviklingsserveren.

### Server med HMR
Webpack kan ikke hot reloade både klient- og serverkode i samme prosjektoppsett. Prosjektet har derfor en egen
API-server som tilbyr hot reloading av serverkoden. Dersom du utvikler serverbasert kode, kan det være en fodel
å gjøre det mot API-serveren.

### Oppstart med serverside HMR
API-server med HMR og frontendserver med HMR og proxy til API-serveren starter du opp slik:

Åpne et kommandovindu.
```bash
npm run start:api            # Start api server
```

Åpne et nytt kommandovindu.
```bash
npm run start:dev -- --proxy  # Start frontend med proxy til API
```

## Produksjonsklar kode
Produksjonsklar kode bundles og legges på `dist`-mappa. Koden kan prøvekjøres på lokal maskin slik:
 

Åpne et kommandovindu.

```bash
npm run build          # Bygger og bundler koden
npm start              # Start applikajonen med bundlet kode (produksjonsklar)
```

Åpne nettleser og naviger til: `localhost:8080`

## Konfigurasjon av applikasjonen
Prosjektet benytter [nconf](https://github.com/indexzero/nconf) til konfigurasjonsstyring.

```
.
└── src                                     
    └── config                              
        ├── config.default.json             
        ├── config.development.json         
        ├── config.production.json          
        ├── config.test.json                
        └── index.js                        
```

Konfigurasjonsinstillinger for applikasjonen finnes i katalogen `./src/config`. Standardinnstillinger er 
definert i filen `config.default.js`. Filen lastes sammen med en konfigurasjonsfil gitt av miljøvariabelen 
`process.env.NODE_ENV`. Dersom `process.env.NODE_ENV` er satt til `"production"`, vil konfigurasjonsinnstillinger
gitt i `config.production.json` overskrive standardinstillingene i `config.default.js`. 

### Bruk av konfigurasjonsfiler
Kode som kjører direkte under Node; webpack, server, tester, o.l, kan lese konfigurasjonsfiler direkte. Klientkode
kan ikke lese konfigurasjon direkte fra en fil. Overføring konfigurasjonsvariabler til klienten skjer med 
`webpack.EnvironmentPlugin`.

```javascript
import config from '../../src/config';
const {scheme, host, port, publicPath, apiPath} = config.server;

new webpack.EnvironmentPlugin({
  BUILD_TARGET: 'client',
  NODE_ENV: process.env.NODE_ENV,
  SCHEME: scheme,
  HOST: host,
  PORT: port,
  PUBLIC_PATH: publicPath,
  API_PATH: apiPath,
  __DEV__: isDev,
})
```

Variablene kan ved behov aksesseres i klientkoden via `process.env`.

```javascript
console.log(process.env.SCHEME, process.env.HOST, process.env.PORT, process.env.API_PATH);
```

## Lint
Lintere sørger for at utviklere i et prosjekt forholder seg til en felles kodestandard og hjelper til med å avdekke 
potensielle problemer i koden. Prosjektet er satt opp med kontinuerlig linting.

**JavaScript**

Prosjektet benytter grunnoppsettet til [Airbnb  JavaScript Style Guide](https://github.com/airbnb/javascript) 
for linting av JavaScript. Regler som avviker fra dette oppsettet er definert `.eslintrc`.

**CSS**

Prosjektet benytter grunnoppsettet til [Stylelint](https://github.com/stylelint/stylelint) for linting 
av CSS. Regler som avviker fra dette oppsettet er definert `.stylelintrc`.

## Test
Som testrammeverk benyttes [Jest](https://facebook.github.io/jest/). Jest forventer at tester er plassert i `__tests__`, 
eller så må filnavnet slutte med `.spec.js` eller `.test.js`. 

Jest konfigureres via `jest` i `package.json`

```json
{
  "jest": {
    "notify": true,
    "setupFiles": [
      "raf/polyfill",
      "<rootDir>/tools/jest/setup.js"
    ],
    "globals": {
      "__DEV__": true
    },
    "moduleDirectories": [
      "node_modules",
      "src/client"
    ]
  }
}
```

Overstyring av Jest-konfigurasjon skjer via `scripts` i `package.json`.
```json
{
  "scripts": {
    "test:unit": "jest --config=tools/jest/jest.unit.config.js",
    "test:it": "jest --config=tools/jest/jest.integration.config.js"
  }
}
```

### Enhetstester
Enhetstester kjører mot en spesifikk fil/modul, så det er naturlig å legge disse testene sammen med koden 
som skal testes. Benytt følgende oppsett:

```
.
└── src                               
    ├── client                        
    │   └── components               
    │       ├── MinKomponent.js
    │       └── __tests__
    │           │  
    │           └── MinKomponent.unit.test.js
    └── server                        
        └── utils
            ├── enUtilityfunksjon.js
            └── __tests__
                │  
                └── enUtilityfunksjon.unit.test.js
```

Alternativt kan enhetstestene plasseres i `test`:
```
.
└── src                               
│   └── client                        
│       └── components               
│           └── MinKomponent.js
└── test                        
    └── unit
        └── client
            └── components               
                └── MinKomponent.unit.test.js
```

#### React
Til enhetstesting av Reactkomponenter benyttes [Jest](https://facebook.github.io/jest/docs/en/getting-started.html)
sammen med [Enzyme](https://github.com/airbnb/enzyme/).

### Integrasjonstester
Integrasjonstester er ofte avhengig av å kjøre kode som ligger spredt i flere filer/moduler. 
Det er derfor naturlig å plassere integrasjonstestene under en felles testkatalog.
Benytt følgende oppsett:
 
```
.
├── src                               
│   └── server                        
│       └── api
│           └── api.js                
└── test                        
   └── integration
       └── server
           └── api
               └── api.integration.test.js
```

Integrasjonstester kjøres med Jest og de tredjeparts tillegg som er nødvendig for å gjennomføre en integrasjonstest.

## Commit med 🐶 woof!
Prosjektet kjører `npm run lint` før faktisk commit mot git. Denne prosessen 
automatiseres med [Husky](https://github.com/typicode/husky). Hvilke script som skal kjøres før
commit, defineres via `husky.hooks` i `package.json`.
 
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  }
}
```

>**IntelliJ**: Dersom du kjører `git commit` fra IntelliJ, kan det virke som om commiten tar lengre tid enn det du er
>vant til. Dette har å gjøre med at det ikke vises noen aktivitet i konsollet mens Husky gjør det den
>skal gjøre. Sjekk Event Log vinduet i IntelliJ dersom du får en commitfeil.
