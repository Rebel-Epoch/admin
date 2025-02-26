import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    useToken?: boolean;
  }
}
