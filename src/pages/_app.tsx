import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Head from "next/head";

const app: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>

      <ClerkProvider>
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(app);
