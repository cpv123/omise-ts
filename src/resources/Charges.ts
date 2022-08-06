import type { Client } from '../Client'
import * as Types from '../types'
import { CHARGES_RESOURCE } from '../constants'

export class Charges {
  protected client: Client
  constructor(client: Client) {
    this.client = client
  }

  /**
   * Retrieves a charge.
   * @param chargeId
   * @returns Promise<ICharge>
   */
  retrieve(chargeId: string): Promise<Types.Charges.ICharge> {
    return this.client.request<Types.Charges.ICharge>({
      method: 'get',
      path: `${CHARGES_RESOURCE}/${chargeId}`,
    })
  }

  /**
   * Creates a charge.
   * @param chargeData
   * @returns Promise<ICharge>
   */
  create(chargeData: Types.Charges.IRequest): Promise<Types.Charges.ICharge> {
    return this.client.request<Types.Charges.ICharge, Types.Charges.IRequest>({
      method: 'post',
      path: CHARGES_RESOURCE,
      data: chargeData,
    })
  }

  /**
   * Updates a charge.
   * @param chargeId
   * @param chargeData
   * @returns Promise<ICharge>
   */
  update(
    chargeId: string,
    chargeData: Types.Charges.IRequest
  ): Promise<Types.Charges.ICharge> {
    return this.client.request<Types.Charges.ICharge, Types.Charges.IRequest>({
      method: 'patch',
      path: `${CHARGES_RESOURCE}/${chargeId}`,
      data: chargeData,
    })
  }

  /**
   * Reverses a charge.
   * @param chargeId
   * @returns Promise<ICharge>
   */
  reverse(chargeId: string): Promise<Types.Charges.ICharge> {
    return this.client.request<Types.Charges.ICharge>({
      method: 'post',
      path: `${CHARGES_RESOURCE}/${chargeId}/reverse`,
    })
  }

  /**
   * Captures an un-captured charge.
   * @param chargeId
   * @returns Promise<ICharge>
   */
  capture(chargeId: string): Promise<Types.Charges.ICharge> {
    return this.client.request<Types.Charges.ICharge>({
      method: 'post',
      path: `${CHARGES_RESOURCE}/${chargeId}/capture`,
    })
  }

  /**
   * Lists all charges.
   * @returns Promise<IChargeList>
   */
  list(): Promise<Types.Charges.IChargeList> {
    return this.client.request<Types.Charges.IChargeList>({
      method: 'get',
      path: CHARGES_RESOURCE,
    })
  }
}
