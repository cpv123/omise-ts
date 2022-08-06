import type { Client } from "../Client";
import * as Types from "../types";
import { SCHEDULES_RESOURCE } from "../constants";

export class Schedules {
  protected client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Retrieves a schedule.
   * @param scheduleId
   * @returns Promise<ISchedule>
   */
  retrieve(scheduleId: string): Promise<Types.Schedules.ISchedule> {
    return this.client.request<Types.Schedules.ISchedule>({
      method: "get",
      path: `${SCHEDULES_RESOURCE}/${scheduleId}`,
    });
  }

  /**
   * Creates a schedule.
   * @param scheduleData
   * @returns Promise<ISchedule>
   */
  create(
    scheduleData: Types.Schedules.ICreateSchedule
  ): Promise<Types.Schedules.ISchedule> {
    return this.client.request<Types.Schedules.ISchedule>({
      method: "post",
      path: SCHEDULES_RESOURCE,
      data: scheduleData,
    });
  }

  /**
   * Deletes a schedule.
   * @param scheduleId
   * @returns Promise<IDestroyResponse>
   */
  destroy(scheduleId: string): Promise<Types.IDestroyResponse> {
    return this.client.request<Types.IDestroyResponse>({
      method: "delete",
      path: `${SCHEDULES_RESOURCE}/${scheduleId}`,
    });
  }
}
