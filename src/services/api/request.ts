import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import HttpStatusCode from "./HttpStatusCode";
import client from "./client";
import { message } from "antd";
import useAuth from "../../Utils/useAuth";

type RequestType = AxiosRequestConfig & {
  showError?: boolean;
  useToken?: boolean;
  mimeType?: string;
};

type ErrorResponseType = {
  code: string;
  message: string | object;
  time: string;
};

const getMessage = (message?: string | Record<string, any>): string => {
  if (typeof message === "object" && message !== null) {
    return Object.keys(message).reduce((prev, curr) => {
      return prev + `${curr.toUpperCase()}: ${message[curr]}\n`;
    }, "");
  } else if (typeof message === "string") {
    return message;
  }

  return "Oops! An Error has occurred!";
};

const request = <T>({
  method,
  url,
  params,
  data: requestData,
  showError,
  headers: headerConfig,
  useToken,
  ...config
}: RequestType) =>
  (async () => {
    try {
      const response: AxiosResponse = await client({
        method,
        url,
        data: method === "GET" ? undefined : requestData,
        params,
        headers: {
          ...headerConfig,
        },
        useToken,
        ...config,
      });

      const { data, status }: { data: T; status: number } = response;

      if (showError !== false && status === HttpStatusCode.ALREADY_REPORTED) {
        message.error(getMessage((data as any)?.message));
      }

      return {
        data,
        status,
        HttpStatusCode,
        response,
      };
    } catch (err: any) {
      if (!axios.isAxiosError(err)) {
        if (showError !== false) {
          message.error("Opps there is an error");
        }

        return {
          status: undefined,
          HttpStatusCode,
        };
      }
      const data = err.response?.data as ErrorResponseType;

      if (err.response?.status === HttpStatusCode.UNAUTHORIZED) {
        const { logout } = useAuth.getState();
        logout();
        // message.error("You have been logged out, please login again!");
      } else {
        if (showError !== false) {
          message.error(getMessage(data?.message));
        }
      }
      return {
        status: err.response?.status,
        HttpStatusCode,
      };
    }
  })();

export type { RequestType };
export default request;
