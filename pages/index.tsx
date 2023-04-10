import Head from "next/head";
import { Container, Main, Title } from "components/sharedstyles";
import Features from "components/features/features";
import SearchInput from "components/search-input/search-input";
import { Footer } from "components/footer/footer";

import queue from "../pages/api/queue";
import { useState } from "react";

export const getServerSideProps = async () => {
  const result = await queue.enqueue({ method: "GET" });
  return {
    props: { ...result },
  };
};

const Spinner = () => (
  <div className="flex items-center justify-center space-x-2 animate-bounce">
    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
    <div className="w-8 h-8 bg-black rounded-full"></div>
  </div>
);

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>();

  const doSomething = async () => {
    setResult("");
    setIsLoading(true);
    try {
      const r = await fetch("/api/enqueue");
      const data = await r.json();
      console.log(data);
      setResult(data);
    } catch (e: any) {
      console.log(e);
      setResult(JSON.stringify(e));
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Head>
        <title>React TypeScript GitHub API demo</title>
        <meta
          name="description"
          content="A zero config demo using React, TypeScript, Next.js, StyledComponents and GitHub API."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Title>
          Welcome to{" "}
          <a
            data-cypress="demoUrl"
            href="https://react-typescript-github-api-demo.vercel.app/"
            target="_self"
          >
            Next.js
          </a>{" "}
          demo!
        </Title>

        <SearchInput />

        <Features />

        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center gap-5">
            <div className="mb-20">
              <p className="font-bold">
                SSR Result:{" "}
                <span className="font-normal">{JSON.stringify(props)}</span>
              </p>
            </div>

            {isLoading ? (
              <Spinner />
            ) : (
              <button
                disabled={isLoading}
                onClick={doSomething}
                className="text-xl border rounded-xl p-4 border-neutral-700 hover:shadow-lg disabled:text-7xl w-45"
              >
                Execute Task (CSR)
              </button>
            )}
            <div>
              <p className="font-bold">
                Client Side Fetch Result:{" "}
                <span className="font-normal">{JSON.stringify(result)}</span>
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </Main>
    </Container>
  );
}
