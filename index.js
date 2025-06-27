import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const git = simpleGit();
const path = "./data.json";
const startDate = moment("2015-01-01");
const endDate = moment(); // Current date
const commitsPerDay = 1; // You can increase this if needed

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

    let date = moment(startDate);

    while (date.isSameOrBefore(endDate)) {
      for (let i = 0; i < commitsPerDay; i++) {
        const commitTime = date
          .clone()
          .hour(10 + i)
          .minute(0)
          .second(0); // e.g., 10:00 AM, 11:00 AM...
        const formattedDate = commitTime.format();

        const data = { date: formattedDate };
        console.log(`Committing on: ${formattedDate}`);

        await jsonfile.writeFile(path, data);
        await git.add([path]);
        await git.commit(generateRandomMessage(), { "--date": formattedDate });
      }

      date.add(1, "day"); // move to next day
    }

    console.log("All commits done. Pushing to origin...");
    await git.push("origin", "main");
  } catch (err) {
    console.error("Error:", err);
  }
})();
