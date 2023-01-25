import type { Client } from '../Client'
import { SEARCH_RESOURCE, PaginationParams } from '../constants'

type Scope =
  | 'charge'
  | 'charge_schedule'
  | 'customer'
  | 'dispute'
  | 'link'
  | 'recipient'
  | 'refund'
  | 'transfer'
  | 'transfer_schedule'
  | 'transaction'
  | 'fund_account'

export class Search {
  protected client: Client
  constructor(client: Client) {
    this.client = client
  }

  /**
   * Performs a search query.
   * @param searchParams
   * @returns Promise<any>
   */
  list(params: {
    scope: Scope
    query: string
    filters?: {
      [key: string]: any
    }
    order?: PaginationParams['order']
    page?: number
    per_page?: number
  }): Promise<any> {
    return this.client.request<any>({
      method: 'get',
      path: SEARCH_RESOURCE,
      params: params,
    })
  }
}
