/** Command-line tool to generate Markov text. */
const fs = require('fs')
const axios = require('axios');
const { MarkovMachine } = require('./markov');
const markov = require('./markov');


function fileMarkov(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`There seems to be a problem with ${path}`);
            console.log(err);
            process.exit(1);
        } else {
            const mm = new MarkovMachine(data)
            console.log(mm.makeText());
            process.exit(1);
        }
    })
}

async function urlMarkov(url) {
    try {
        const resp = await axios.get(url);
        const txt = resp.data
        let mm = new MarkovMachine(txt);
        console.log(mm.makeText());
        process.exit(1);
    } catch (e) {
        console.log(`There seems to be a problem with ${url}`)
        console.error(e)
        process.exit(1)
    }
}


function markovSelect() {
    if (process.argv[2] === 'file' ) {
        const file = process.argv[3];
        fileMarkov(file);
    } else if (process.argv[2] === 'url') {
        const url = process.argv[3];
        urlMarkov(url);
    } else {
        console.log('Please use a "file" or "url" flag and include a source');
        process.exit(1);
    }
}

markovSelect()