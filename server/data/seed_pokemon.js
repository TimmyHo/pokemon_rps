const path = require('path');
const csv = require('csvtojson');

const db = require('../src/db/db');
const Pokemon = require('../src/models/pokemon');

let csvFilePath='pokemon.csv';
//csvFilePath = 'pokemon_min.csv';

const fullCvsFilePath = path.join(__dirname, csvFilePath);

Pokemon.deleteMany({}, () => {
    console.log('Deleted all pokemon');
});

csv()
.fromFile(fullCvsFilePath)
.then((jsonObjs)=>{
    // For the initial game, just use the first generation
    pokemonList = jsonObjs.filter(jsonObj => parseInt(jsonObj.generation) === 1);

    const seedData = async () => {
        await Promise.all(
            pokemonList.map(async (pokemonData) => {
                const pokemon = new Pokemon({
                    pokedex_id: pokemonData.pokedex_number,
                    name: pokemonData.name,
                    type1: pokemonData.type1,
                    type2: pokemonData.type2,
                    imageUrl: `https://www.serebii.net/pokemon/art/${pokemonData.pokedex_number.padStart(3, '0')}.png`
                });

                // console.log(`Saving ${pokemonData.pokedex_number} - ${pokemonData.name}`);
                await pokemon.save();
            })
        );
    }

    seedData().then(() => {
        console.log(`Added ${pokemonList.length} pokemon`);
        process.exit();    
    });
});
