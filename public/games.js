// games.js

// Define a list of game titles and corresponding HTML file names
const games = [
  { name: "1 On 1 Soccer", file: "1 On 1 Soccer.html" },
  { name: "2048", file: "2048.html" },
  { name: "60SBURGERRUN", file: "60SBURGERRUN.html" },
  { name: "achivement unlocked", file: "achivement unlocked.html" },
  { name: "adofai", file: "adofai.html" },
  { name: "alienhominid", file: "alienhominid.html" },
  { name: "amongus", file: "amongus.html" },
  { name: "awesometanks2", file: "awesometanks2.html" },
  { name: "bacon may die", file: "bacon may die.html" },
  { name: "basket ball stars", file: "basket ball stars.html" },
  { name: "bitlife", file: "bitlife.html" },
  { name: "bloons td2", file: "bloons td2.html" },
  { name: "bloonsTd3", file: "bloonsTd3.html" },
  { name: "bloxorz", file: "bloxorz.html" },
  { name: "bobTherobber", file: "bobTherobber.html" },
  { name: "bobtherobber2", file: "bobtherobber2.html" },
  { name: "boxingrandom", file: "boxingrandom.html" },
  { name: "burrito bison", file: "burrito bison.html" },
  { name: "cannonbasketball4", file: "cannonbasketball4.html" },
  { name: "cookie clicker", file: "cookie clicker.html" },
  { name: "cutTheRope", file: "cutTheRope.html" },
  { name: "deathrun3d", file: "deathrun3d.html" },
  { name: "deepestsword", file: "deepestsword.html" },
  { name: "diggy", file: "diggy.html" },
  { name: "douchebagworkout2", file: "douchebagworkout2.html" },
  { name: "driftboss", file: "driftboss.html" },
  { name: "drivemad", file: "drivemad.html" },
  { name: "ducklife4", file: "ducklife4.html" },
  { name: "eaglercraft", file: "eaglercraft.html" },
  { name: "eurocup", file: "eurocup.html" },
  { name: "extremepampolumpa", file: "extremepampolumpa.html" },
  { name: "fancypants2", file: "fancypants2.html" },
  { name: "fbawg", file: "fbawg.html" },
  { name: "fnaf", file: "fnaf.html" },
  { name: "footballballlegends", file: "footballballlegends.html" },
  { name: "funnyshooter", file: "funnyshooter.html" },
  { name: "getawayshootout", file: "getawayshootout.html" },
  { name: "gravitysoccer", file: "gravitysoccer.html" },
  { name: "gunmayhem", file: "gunmayhem.html" },
  { name: "hanger2", file: "hanger2.html" },
  { name: "hobo", file: "hobo.html" },
  { name: "hobo2", file: "hobo2.html" },
  { name: "hobo3", file: "hobo3.html" },
  { name: "hobo4", file: "hobo4.html" },
  { name: "hobo5", file: "hobo5.html" },
  { name: "hobo6", file: "hobo6.html" },
  { name: "hobo7", file: "hobo7.html" },
  { name: "hole.io", file: "hole.io.html" },
  { name: "idlebreakout", file: "idlebreakout.html" },
  { name: "infiltratingtheairship", file: "infiltratingtheairship.html" },
  { name: "jacksmith", file: "jacksmith.html" },
  { name: "jelly truck", file: "jelly truck.html" },
  { name: "justfall.lol", file: "justfall.lol.html" },
  { name: "monkeymart", file: "monkeymart.html" },
  { name: "motox3m", file: "motox3m.html" },
  { name: "myrustysubmarine", file: "myrustysubmarine.html" },
  { name: "ninjavsevilcorp", file: "ninjavsevilcorp.html" },
  { name: "noobsteveparkour", file: "noobsteveparkour.html" },
  { name: "papafreeiziria", file: "papafreeiziria.html" },
  { name: "papalouie2", file: "papalouie2.html" },
  { name: "paper.io", file: "paper.io.html" },
  { name: "plantsvszombies", file: "plantsvszombies.html" },
  { name: "retrobowl", file: "retrobowl.html" },
  { name: "riddleschool", file: "riddleschool.html" },
  { name: "riddleschool2", file: "riddleschool2.html" },
  { name: "riddleschool3", file: "riddleschool3.html" },
  { name: "rocketleuge2d", file: "rocketleuge2d.html" },
  { name: "rooftopsnipers", file: "rooftopsnipers.html" },
  { name: "shopingcarthero3", file: "shopingcarthero3.html" },
  { name: "slope", file: "slope.html" },
  { name: "slope2", file: "slope2.html" },
  { name: "snowball.io", file: "snowball.io.html" },
  { name: "snowrider3d", file: "snowrider3d.html" },
  { name: "soccerandom", file: "soccerandom.html" },
  { name: "sportsheadfootball", file: "sportsheadfootball.html" },
  { name: "stickarchersbattle", file: "stickarchersbattle.html" },
  { name: "tanukisunset", file: "tanukisunset.html" },
  { name: "theimpossiblequizmas", file: "theimpossiblequizmas.html" },
  { name: "theworldshardestgame", file: "theworldshardestgame.html" },
  { name: "timeshooter3", file: "timeshooter3.html" },
  { name: "tinyfishing", file: "tinyfishing.html" },
  { name: "tombofthemask", file: "tombofthemask.html" },
  { name: "tosstheturtle", file: "tosstheturtle.html" },
  { name: "tubejumpers", file: "tubejumpers.html" },
  { name: "unfairmario", file: "unfairmario.html" },
  { name: "volleyrandom", file: "volleyrandom.html" }
];

// Dynamically populate the .grid element with buttons
const grid = document.querySelector(".grid");
games.forEach(game => {
  const button = document.createElement("a");
  button.className = "game-button";
  button.href = game.file;
  button.textContent = game.name;
  grid.appendChild(button);
});
