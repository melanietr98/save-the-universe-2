class Ship {
    constructor(hull, firepower, accuracy) {
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    }
    
    attack(target) {
      if (Math.random() < this.accuracy) {
        console.log(`${this.name} hit ${target.name}!`);
        target.hull -= this.firepower;
      } else {
        console.log(`${this.name} missed ${target.name}!`);
      }
    }
  }
  
  class AlienShip extends Ship {
    constructor() {
      super(
        Math.floor(Math.random() * 4) + 3,
        Math.floor(Math.random() * 3) + 2,
        Math.random() * 0.2 + 0.6
      );
      this.name = `Alien Ship ${Math.floor(Math.random() * 1000)}`;
    }
  }
  
  class PlayerShip extends Ship {
    constructor() {
      super(20, 5, 0.7);
      this.name = "The Benatar";
    }
  }
  
  const player = new PlayerShip();
  const aliens = [...Array(6)].map(() => new AlienShip());
  
  let currentAlien = 0;
  let retreat = false;
  
  while (!retreat && player.hull > 0 && currentAlien < aliens.length) {
    player.attack(aliens[currentAlien]);
    if (aliens[currentAlien].hull <= 0) {
      console.log(`You have destroyed ${aliens[currentAlien].name}!`);
      const retreatChoice = prompt("Do you want to attack the next ship or retreat? (a/r)");
      if (retreatChoice === "r") {
        retreat = true;
      } else {
        currentAlien++;
      }
    } else {
      aliens[currentAlien].attack(player);
      if (player.hull <= 0) {
        console.log("You have been destroyed!");
      }
    }
  }
  
  if (retreat) {
    console.log("You have retreated from battle.");
  } else if (player.hull > 0) {
    console.log("You have defeated all of Thanos' ships!");
  }
  