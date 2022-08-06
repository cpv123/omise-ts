import axios, { Method, AxiosResponse } from "axios";
import { Charges } from "./resources/Charges";
import { Customers } from "./resources/Customers";
import { Schedules } from "./resources/Schedules";
import { OMISE_API_BASE_URL, DEFAULT_API_VERSION } from "./constants";

export type ClientConfig = {
  apiSecretKey: string;
  omiseAPIVersion?: string;
};

export class Client {
  private apiSecretKey: string;
  private omiseAPIVersion: string;

  public charges: Charges;
  public customers: Customers;
  public schedules: Schedules;

  constructor({ apiSecretKey, omiseAPIVersion }: ClientConfig) {
    if (typeof apiSecretKey !== "string" || !apiSecretKey) {
      throw new Error("⚠️ Invalid secret for Omise client");
    }
    this.apiSecretKey = apiSecretKey;
    this.omiseAPIVersion = omiseAPIVersion || DEFAULT_API_VERSION;

    this.charges = new Charges(this);
    this.customers = new Customers(this);
    this.schedules = new Schedules(this);
  }

  async request<TResponse, TData = any>({
    method,
    path,
    data,
  }: {
    method: Method;
    path: string;
    data?: TData;
  }): Promise<AxiosResponse<TResponse>["data"]> {
    const base64Auth = Buffer.from(this.apiSecretKey).toString("base64");
    return axios
      .request<TResponse, AxiosResponse<TResponse>, TData>({
        headers: {
          Authorization: `Basic ${base64Auth}`,
          ["Omise-Version"]: this.omiseAPIVersion,
        },
        method,
        url: `${OMISE_API_BASE_URL}/${path}`,
        data,
      })
      .then(({ data }) => data);
  }
}
