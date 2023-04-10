import { Queue } from "@serverlessq/nextjs";
import { verifySignature } from "utils/verifySignature";

const doSomethingImportant = async () => {
  return await (await fetch("https://mock.codes/200")).json();
};

// your deployed vercel or ngrok forwared url @see: https://docs.serverlessq.com/tutorial/ngrokLocalDevelopment
const TARGET =
  "https://api.serverlessq.com?id=87b5afe4-0870-4d09-97a6-5aedd5d13898&target=/api/queue";

// pages/api/queue
export default Queue(
  "react-demo-serverless",
  "api/queue",
  async (req, res) => {
    if (!verifySignature(req, JSON.stringify({ target: TARGET }))) {
      res.status(403).json({
        code: `invalid_signature`,
        error: `signature didn't match`,
      });
      return;
    }
    await doSomethingImportant();
    res.send("finished");
  },
  {
    retries: 1,
    urlToOverrideWhenRunningLocalhost: TARGET,
  }
);
