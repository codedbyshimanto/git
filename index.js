import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";
const totalCommits = 500; // Reduce this for sanity/testing

function generateRandomMessage() {
  const messages = [
    "Random commit",
    "Updated files",
    "Minor fix",
    "Changes made",
    "Fix bugs",
    "Refactored code",
    "Added new features",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

(async () => {
  try {
    await git.checkout("main");

    for (let i = 0; i < totalCommits; i++) {
      const x = random.int(0, 54);
      const y = random.int(0, 6);
      const date = moment()
        .subtract(2, "y")
        .add(1, "d")
        .add(x, "w")
        .add(y, "d")
        .format();

      const data = { date };
      console.log(`Commit #${i + 1} at ${date}`);

      await jsonfile.writeFile(path, data);
      await git.add([path]);
      await git.commit(generateRandomMessage(), { "--date": date });
    }

    console.log("All commits done. Pushing to origin...");
    await git.push("origin", "main");
  } catch (err) {
    console.error("Error:", err);
  }
})();
