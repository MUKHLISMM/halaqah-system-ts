import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import { fetcher } from "../config/axios";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";
import "antd/dist/antd.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          refreshInterval: 10000,
          fetcher: fetcher,
        }}
      >
        <ChakraProvider>
          <ConfigProvider>
            <Component {...pageProps} />
          </ConfigProvider>
        </ChakraProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
