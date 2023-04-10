// pages/api/enqueue or getServerSideProps
import { NextApiRequest, NextApiResponse } from "next";
import queue from "./queue";

export default async function enqueue(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await queue.enqueue({ method: "GET" });
  res.send("OK");
}

export const getServerSideProps = async () => {
  const resp = await queue.enqueue({ method: "GET" });
  console.log(resp);
  return {
    props: {
      ...resp,
    },
  };
};
