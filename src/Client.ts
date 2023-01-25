import axios, { Method, AxiosResponse } from 'axios'
import qs from 'qs'
import { Charges } from './resources/Charges'
import { Customers } from './resources/Customers'
import { Schedules } from './resources/Schedules'
import { Search } from './resources/Search'
import { OMISE_API_BASE_URL, DEFAULT_API_VERSION } from './constants'

const OMISE_TS_VERSION = '0.1.0'

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
  public search: Search

  constructor({ apiSecretKey, omiseAPIVersion }: ClientConfig) {
    if (typeof apiSecretKey !== 'string' || !apiSecretKey) {
      throw new Error('⚠️ Invalid secret for Omise client')
    }
    this.apiSecretKey = apiSecretKey
    this.omiseAPIVersion = omiseAPIVersion || DEFAULT_API_VERSION

    this.charges = new Charges(this)
    this.customers = new Customers(this)
    this.schedules = new Schedules(this)
    this.search = new Search(this)
  }

  async request<TResponse, TData = any>({
    method,
    path,
    data,
    params,
  }: {
    method: Method
    path: string
    data?: TData
    params?: any
  }): Promise<AxiosResponse<TResponse>['data']> {
    const result = await axios.request<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >({
      headers: {
        'User-Agent': `omise-ts/${OMISE_TS_VERSION}`,
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
      params,
      paramsSerializer: (_params) => qs.stringify(_params),
    })
    return result?.data
  }
}
