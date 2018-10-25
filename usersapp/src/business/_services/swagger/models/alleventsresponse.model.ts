import { EventsResponse } from './eventsresponse.model'

export interface AllEventsResponse {
  status: boolean;
  message: string;
  data: EventsResponse[];
}
