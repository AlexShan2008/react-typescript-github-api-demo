import Head from "next/head";
import { Container, Main, Title } from "components/sharedstyles";
import Features from "components/features/features";
import SearchInput from "components/search-input/search-input";

export default function Home() {
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
      </Main>
    </Container>
  );
}
