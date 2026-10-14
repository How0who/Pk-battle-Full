const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Persistent HP
let bulbasaurHealth = 100;
let mimikyuHealth = 100;

// Bulbasaur's random attacks
const bulbaMoves = [
    { name: "Vine Whip", dmg: 15 },
    { name: "Razor Leaf", dmg: 20 },
    { name: "Tackle", dmg: 10 },
    { name: "Seed Bomb", dmg: 25 }
];

function askForMove() {
    console.log("\nChoose your attack:");
    console.log("1. Play Rough (25 dmg)");
    console.log("2. Shadow Claw (20 dmg)");
    console.log("3. Drain Punch (10 dmg)");
    console.log("4. Dodge (50% chance to avoid Bulbasaur's attack)");
    console.log("Type 1, 2, 3, or 4:");

    rl.question("> ", (choice) => {
        nextRound(choice.trim());
    });
}

function nextRound(choice) {
    let damage = 0;
    let mimikyuDodged = false;

    // Mimikyu's turn
    if (choice === "1") {
        damage = 25;
        console.log("\nMimikyu used Play Rough!");
    } else if (choice === "2") {
        damage = 20;
        console.log("\nMimikyu used Shadow Claw!");
    } else if (choice === "3") {
        damage = 10;
        console.log("\nMimikyu used Drain Punch!");
    } else if (choice === "4") {
        mimikyuDodged = true;
        console.log("\nMimikyu prepares to dodge!");
    } else {
        console.log("\nInvalid choice — Mimikyu missed!");
        damage = 0;
    }

    // Apply damage to Bulbasaur
    if (!mimikyuDodged) {
        bulbasaurHealth -= damage;
        if (bulbasaurHealth < 0) bulbasaurHealth = 0;
        console.log("Bulbasaur is now at", bulbasaurHealth, "health");
    }

    // Check if Bulbasaur fainted
    if (bulbasaurHealth <= 0) {
        console.log("\nBulbasaur fainted! Mimikyu wins!");
        rl.close();
        return;
    }

    // Bulbasaur's turn
    const bulbaAttack = bulbaMoves[Math.floor(Math.random() * bulbaMoves.length)];

    // Bulbasaur dodge chance (50%)
    let bulbasaurDodged = Math.random() < 0.5;

    if (bulbasaurDodged && !mimikyuDodged) {
        console.log("Bulbasaur dodged Mimikyu's attack!");
    }

    // Bulbasaur attacks unless Mimikyu dodged successfully
    if (mimikyuDodged) {
        if (Math.random() < 0.5) {
            console.log("Mimikyu dodged Bulbasaur's", bulbaAttack.name + "!");
        } else {
            console.log("Bulbasaur used", bulbaAttack.name, "dealing", bulbaAttack.dmg);
            mimikyuHealth -= bulbaAttack.dmg;
        }
    } else if (!bulbasaurDodged) {
        console.log("Bulbasaur used", bulbaAttack.name, "dealing", bulbaAttack.dmg);
        mimikyuHealth -= bulbaAttack.dmg;
    }

    if (mimikyuHealth < 0) mimikyuHealth = 0;
    console.log("Mimikyu is now at", mimikyuHealth, "health");

    // Check if Mimikyu fainted
    if (mimikyuHealth <= 0) {
        console.log("\nMimikyu fainted! Bulbasaur wins!");
        rl.close();
        return;
    }

    // Continue battle
    askForMove();
}

askForMove();
