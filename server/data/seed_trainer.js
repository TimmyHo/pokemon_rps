const loremIpsum = require('lorem-ipsum').loremIpsum;

const db = require('../src/db/db');

const PokedexData = require('../src/models/pokedexData');
const PokemonCreature = require('../src/models/pokemonCreature');
const Trainer = require('../src/models/trainer');

async function deleteTrainers() {
    await Trainer.deleteMany({ trainerType: 'TEST' });
};

async function seedTrainers() {
    // Sprites taken from: https://archives.bulbagarden.net/wiki/Category:Trainer_sprites
    const picList = [
        // 'https://archives.bulbagarden.net/media/upload/0/0e/Spr_FRLG_Pok%C3%A9Maniac.png',
        // 'https://archives.bulbagarden.net/media/upload/4/4c/Spr_FRLG_Oak.png',
        // 'https://archives.bulbagarden.net/media/upload/a/a3/Spr_RS_Pok%C3%A9fan_M.png',
        // 'https://archives.bulbagarden.net/media/upload/f/f8/Spr_RS_Black_Belt.png',
        // 'https://archives.bulbagarden.net/media/upload/2/2b/Spr_FRLG_Leaf.png'
        '/img/sprites/female_trainer.png',
        '/img/sprites/male_trainer.png'
    ]

    // Generate trainer data
    for (let i = 0; i < 20; i++) {
        const pokedexData = await PokedexData.findOne({
            pokedex_id: i*3+1 
        });
    
        const pokemonCreature = new PokemonCreature({
            pokedex: pokedexData
        });

        const trainer = new Trainer({
            email: `test_trainer_${i+1}@pokemon.com`,
            password: 'testtest',
            trainerTag: `testTrainer_${i+1}`,
            trainerImageUrl: picList[i % picList.length],
            trainerType: 'TEST',
            pokemonCompanion: pokemonCreature
        });

        await pokemonCreature.save();   
        await trainer.save();
        console.log('Adding trainer #'+(i+1));
    }
};

deleteTrainers().then(async () => {
    console.log('Deleted all test trainers');

    await seedTrainers();
}).then(() => {
    console.log(`Added test trainers`);
    process.exit();    
});



 


