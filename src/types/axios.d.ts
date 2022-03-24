import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    requestKey?: string;
    cancel?: Canceler;
  }
}
