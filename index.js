import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";
const totalCommits = 1000; // Adjust this number as needed

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

function getRandomDateInRange(startDate, endDate) {
  const start = moment(startDate).valueOf();
  const end = moment(endDate).valueOf();
  const randomTimestamp = random.int(start, end);
  return moment(randomTimestamp).format();
}

(async () => {
  try {
    // Checkout the target branch
    await git.checkout("main");

    for (let i = 0; i < totalCommits; i++) {
      const date = getRandomDateInRange("2015-01-01", "2025-06-27");
      const data = { date };

      console.log(`Commit #${i + 1} at ${date}`);

      await jsonfile.writeFile(path, data); // Write dummy content
      await git.add([path]); // Stage file
      await git.commit(generateRandomMessage(), {
        // Commit with random message
        "--date": date,
      });
    }

    console.log("All commits done. Pushing to origin...");
    await git.push("origin", "main");
  } catch (err) {
    console.error("Error:", err);
  }
})();
