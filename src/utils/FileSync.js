const fs = require("fs").promises;

const readFile = async () => {
  const data = await fs.readFile("src/talker.json", "utf-8");
  const talkers = JSON.parse(data);
  return talkers;
};

const writeFile = async (data) => {
  await fs.writeFile("src/talker.json", data);
};

module.exports = {
  readFile,
  writeFile,
};
