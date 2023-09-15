import readline from "readline";
import process from "process";
import { logger } from "./logger.js";

export const prompt = async (question, callback) => {
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  logger.log(question);

  prompt.question("", async (answer) => {
    await callback(answer);
    prompt.close();
  });
};
