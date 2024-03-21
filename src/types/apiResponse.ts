import { AxiosError } from "axios";

export interface APIResponseType {
  status: number;
  error: AxiosError | Error;
}
