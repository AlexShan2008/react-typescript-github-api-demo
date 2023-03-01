import { message } from "antd";

export async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // "X-GitHub-Api-Version": "2022-11-28", //Backend API doesn't support this, will cause CORS issue.
      Accept: "application/vnd.github+json",
    },
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  // check for error response
  if (!response.ok) {
    // get error message from body or default to response status
    const error = (data && data.message) || response.status;

    message.error(error);

    return data;
  }

  return data; // parses JSON response into native JavaScript objects
}
