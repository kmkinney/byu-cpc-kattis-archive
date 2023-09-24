import Head from "next/head";
import ProblemTable from "~/components/ProblemTable";

import { api } from "~/utils/api";

export default function Home() {
  const { data, isLoading, isError } = api.problem.allProblems.useQuery();

  if (isLoading || isError) return <></>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-black">
        <h1>Problems</h1>
        <ProblemTable data={data} />
      </main>
    </>
  );
}
