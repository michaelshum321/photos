import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { FileUploader } from "../../components/FileUploader";

const Random: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "potato pasta" });
  return (
    <>
      <Head>
        <title>Upload Photos</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 bg-slate-400 bg-opacity-80 rounded-xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Do something I guess
          </h1>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <FileUploader/>
        </div>
      </main>
    </>
  );
};

export default Random;