const loremIpsum = require('lorem-ipsum').loremIpsum;

const db = require('../src/db/db');
const Trainer = require('../src/models/trainer');


async function deleteTrainers() {
    await Trainer.deleteMany({ trainerType: 'TEST' });
};

async function seedTrainers() {
    const genderList = ['NONE', 'M', 'F'];
    const picList = [
        'https://archives.bulbagarden.net/media/upload/0/0e/Spr_FRLG_Pok%C3%A9Maniac.png',
        'https://archives.bulbagarden.net/media/upload/4/4c/Spr_FRLG_Oak.png',
        'https://archives.bulbagarden.net/media/upload/a/a3/Spr_RS_Pok%C3%A9fan_M.png',
        'https://archives.bulbagarden.net/media/upload/f/f8/Spr_RS_Black_Belt.png',
        'https://archives.bulbagarden.net/media/upload/2/2b/Spr_FRLG_Leaf.png'
    ]

    // Generate trainer data
    for (let i = 0; i < 20; i++) {
        const trainer = new Trainer({
            trainerTag: 'testTrainer_'+(i+1),
            trainerType: 'TEST',

            name: 'Trainer #'+(i+1),
            picUrl: picList[i % picList.length],
            gender: genderList[i % genderList.length],
            tagline: loremIpsum({ count: 5, units: 'words'}),
            bio: loremIpsum({count: 3, units: 'sentences'})
        });

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



 


