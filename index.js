// IMPORT PACKAGES
const express = require('express')
const path = require('path')
const fs = require('fs/promises')
const https = require('https')

// STATIC DEFINITIONS
const app = express()
const {kaikkiDatabase, port, databaseAuthorisation, gamesManifestFile, certPath, certKey} = require('./config.json')

// DYNAMIC DEFINITIONS
let allowedHosts = []

// GET ROUTES
app.get('/pelisi-palvelin/peleja/*', (req, res, next) => {
    const host = req.get('host');

    if (!allowedHosts.includes(host)) {
        console.warn(`[403] Illegal access attempt from ${host} to ${req.path} denied`)
        return res.status(403).send('Kielletty: Pyyntö ei ole valtuutetulta isännältä');
    }

    const filePath = path.join(__dirname, 'games', req.params[0]);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Ei löydy: Pyydettyä peliä ei löytynyt palvelimelta');
        }
    });
});

app.get('/pelisi-palvelin/pelien-manifesti', async (req, res, next) => {
    const host = req.get('host');

    if (!allowedHosts.includes(host)) {
        console.warn(`[403] Illegal access attempt from ${host} to ${req.path} denied`)
        return res.status(403).send('Kielletty: Pyyntö ei ole valtuutetulta isännältä');
    }

    const gamesManifestPath = path.join(__dirname, gamesManifestFile)

    res.sendFile(gamesManifestPath, (err) => {
        if (err) {
            res.status(500).send('Sisäinen palvelinvirhe: palvelin ei voinut suorittaa pyyntöä loppuun');
        }
    })
})

app.get('/img/*', (req, res, next) => {
    const host = req.get('host');

    if (!allowedHosts.includes(host)) {
        console.warn(`[403] Illegal access attempt from ${host} to ${req.path} denied`)
        return res.status(403).send('Kielletty: Pyyntö ei ole valtuutetulta isännältä');
    }

    const filePath = path.join(__dirname, 'public', 'img', req.params[0]);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Ei löydy: Pyydettyä kuvaa ei löytynyt palvelimelta');
        }
    });
});

app.get('/css/*', (req, res, next) => {
    const host = req.get('host');

    if (!allowedHosts.includes(host)) {
        console.warn(`[403] Illegal access attempt from ${host} to ${req.path} denied`)
        return res.status(403).send('Kielletty: Pyyntö ei ole valtuutetulta isännältä');
    }

    const filePath = path.join(__dirname, 'public', 'css', req.params[0]);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Ei löydy: Pyydettyä tyylisivu ei löytynyt palvelimelta');
        }
    });
});

app.get('/js/*', (req, res, next) => {
    const host = req.get('host');
    if (!allowedHosts.includes(host)) {
        console.warn(`[403] Illegal access attempt from ${host} to ${req.path} denied`)
        return res.status(403).send('Kielletty: Pyyntö ei ole valtuutetulta isännältä');
    }

    const filePath = path.join(__dirname, 'public', 'js', req.params[0]);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Ei löydy: Pyydettyä käsikirjoitus ei löytynyt palvelimelta');
        }
    });
});

app.get('/', (req, res, next) => {
    // This function should state that the user is either prompted to login or returns the main game page.
    // For now, it just returns the index.
    const host = req.get('host');

    if (!allowedHosts.includes(host)) {
        console.warn(`[403] Illegal access attempt from ${host} to ${req.path} denied`)
        return res.status(403).send('Kielletty: Pyyntö ei ole valtuutetulta isännältä');
    }

    const filePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Ei löydy: Pyydettyä käsikirjoitus ei löytynyt palvelimelta');
        }
    });
})

app.get('/favicon.ico', (req, res, next) => {
    const host = req.get('host');

    if (!allowedHosts.includes(host)) {
        console.warn(`[403] Illegal access attempt from ${host} to ${req.path} denied`)
        return res.status(403).send('Kielletty: Pyyntö ei ole valtuutetulta isännältä');
    }

    const filePath = path.join(__dirname, 'public', 'favicon.ico');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Ei löydy: Pyydettyä käsikirjoitus ei löytynyt palvelimelta');
        }
    });
})

app.get('/api/ok', async (req, res) => {
    return res.status(200).send('OK')
})

// AUXILIARY FUNCTIONS
async function fetchGamesDatabase() {
    const response = await fetch(`https://${kaikkiDatabase}/api/v1/games-manifest`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-authorization': databaseAuthorisation
        }
    })
    .then(response => response.json())
    .catch(error => {throw new Error(error)})

    console.info(`Fetched ${Object.keys(response).length} games from Kaikki Pelisi Database`)

    return response;
}

async function fetchHostsDatabase() {
    const response = await fetch(`https://${kaikkiDatabase}/api/v1/hosts`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-authorization': databaseAuthorisation
        }
    })
    .then(response => response.json())
    .catch(error => {throw new Error(error)})

    console.info(`Fetched ${response.length} hosts from Kaikki Pelisi Database`)

    return response;
}

let startupPrereqLength = 3

async function startup() {
    console.log(`\x1b[32mStartup: [1/${startupPrereqLength}]\x1b[0m Fetching hosts...`)
    allowedHosts = []
    allowedHosts = await fetchHostsDatabase()
    console.log(`\x1b[32mStartup: [2/${startupPrereqLength}]\x1b[0m Fetching games manifest...`)
    const gamesManifestSync = await fetchGamesDatabase()
    await fs.writeFile(path.join(__dirname, gamesManifestFile), JSON.stringify(gamesManifestSync, null, 2))

    console.log(`\x1b[32mStartup: [3/${startupPrereqLength}]\x1b[0m Importing HTTPS options...`)

    const options = {
        key: await fs.readFile(certKey),
        cert: await fs.readFile(certPath)
    }

    https.createServer(options, app).listen(port, () => {
        console.log(`\x1b[32mStartup Success\x1b[0m Server listening on the ${port}`)
    })

    // DEPRICATED 30/12/24
    /*app.listen(port, () => {
        console.log(`\x1b[32mStartup Success\x1b[0m Server listening on the ${port}`)
    })*/
}

startup()