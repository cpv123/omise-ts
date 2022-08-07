import axios, { Method, AxiosResponse } from 'axios'
import { Charges } from './resources/Charges'
import { Customers } from './resources/Customers'
import { Schedules } from './resources/Schedules'
import { OMISE_API_BASE_URL, DEFAULT_API_VERSION } from './constants'
import { version as packageVersion } from '../package.json'

export type ClientConfig = {
  apiSecretKey: string
  omiseAPIVersion?: string
}

export class Client {
  private apiSecretKey: string
  private omiseAPIVersion: string

  public charges: Charges
  public customers: Customers
  public schedules: Schedules

  constructor({ apiSecretKey, omiseAPIVersion }: ClientConfig) {
    if (typeof apiSecretKey !== 'string' || !apiSecretKey) {
      throw new Error('⚠️ Invalid secret for Omise client')
    }
    this.apiSecretKey = apiSecretKey
    this.omiseAPIVersion = omiseAPIVersion || DEFAULT_API_VERSION

    this.charges = new Charges(this)
    this.customers = new Customers(this)
    this.schedules = new Schedules(this)
  }

  async request<TResponse, TData = any>({
    method,
    path,
    data,
  }: {
    method: Method
    path: string
    data?: TData
  }): Promise<AxiosResponse<TResponse>['data']> {
    const result = await axios.request<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >({
      headers: {
        'User-Agent': `omise-ts/${packageVersion}`,
        'Content-Type': 'application/json',
        'Omise-Version': this.omiseAPIVersion,
      },
      auth: {
        username: this.apiSecretKey,
        password: '',
      },
      method,
      baseURL: OMISE_API_BASE_URL,
      url: path,
      data,
    })
    return result?.data
  }
}
