const path = require('path');
const csv = require('csvtojson');

const db = require('../src/db/db');
const PokedexData = require('../src/models/pokedexData');

let csvFilePath='pokemon.csv';
// csvFilePath = 'pokemon_min.csv';

const fullCvsFilePath = path.join(__dirname, csvFilePath);
let pokedexDataList;

const deletePokedexData = async () => {
    await PokedexData.deleteMany({});
}

const savePokedexData = async () => {
    const jsonObjs = await csv().fromFile(fullCvsFilePath);
    // For the initial game, just use the first generation
    pokedexDataList = jsonObjs.filter(jsonObj => parseInt(jsonObj.generation) === 1); 
    
    await Promise.all(pokedexDataList.map(async (pokedexData) => {
        const pokedexEntry = new PokedexData({
            pokedex_id: pokedexData.pokedex_number,
            name: pokedexData.name,
            classification: pokedexData.classfication,

            hitPoints: pokedexData.hp,
            attack: pokedexData.attack,
            defense: pokedexData.defense,
            specialAttack: pokedexData.sp_attack,
            specialDefense: pokedexData.sp_defense,
            speed: pokedexData.speed,
            type1: pokedexData.type1,
            type2: pokedexData.type2,

            imageUrl: `https://www.serebii.net/pokemon/art/${pokedexData.pokedex_number.padStart(3, '0')}.png`,
            spriteUrl: `https://www.serebii.net/xy/pokemon/${pokedexData.pokedex_number.padStart(3, '0')}.png`,
            shinySpriteUrl: `https://www.serebii.net/Shiny/XY/${pokedexData.pokedex_number.padStart(3, '0')}.png`
        });
        const foo = await pokedexEntry.save();

        console.log(`Saved ${pokedexData.pokedex_number} - ${pokedexData.name}`);
    })); 
};


deletePokedexData().then(async () => {
    console.log('Deleted all pokedex data');

    await savePokedexData();
}).then(() => {
    console.log(`Added ${pokedexDataList.length} pokemon`);
    process.exit();    
});
