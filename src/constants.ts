export const OMISE_API_BASE_URL = 'https://api.omise.co'
export const DEFAULT_API_VERSION = '2019-05-29'

export const CHARGES_RESOURCE = 'charges'
export const CUSTOMERS_RESOURCE = 'customers'
export const SCHEDULES_RESOURCE = 'schedules'
export const SEARCH_RESOURCE = 'search'

export type PaginationParams = {
  expand?: boolean
  from?: string
  to?: string
  offset?: number
  limit?: number
  order?: 'chronological' | 'reverse_chronological'
}
