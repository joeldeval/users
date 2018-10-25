import { MenuResponse } from './menuresponse.model'

export interface AllMenuResponse {
  status: boolean;
  message: string;
  data: MenuResponse[];
}
