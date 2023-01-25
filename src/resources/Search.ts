import type { Client } from '../Client'
import { SEARCH_RESOURCE } from '../constants'

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
  list(searchParams: {
    scope: Scope
    query: string
    order: 'chronological' | 'reverse_chronological'
    filters?: {
      [key: string]: any
    }
    page?: number
    per_page?: number
  }): Promise<any> {
    return this.client.request<any>({
      method: 'get',
      path: SEARCH_RESOURCE,
      params: searchParams,
    })
  }
}
