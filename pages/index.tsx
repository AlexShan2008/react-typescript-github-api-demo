import Head from "next/head";
import { Container, Main, Title } from "../components/sharedstyles";
import Features from "../components/features/features";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>React TypeScript RESTful demo</title>
        <meta
          name="description"
          content="A zero config demo using React, TypeScript, Next.js, StyledComponents, RESTful and Github API."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Title>
          Welcome to{" "}
          <a href="https://nextjs.org">React TypeScript RESTful demo!</a>
        </Title>

        <Features />
      </Main>
    </Container>
  );
}
