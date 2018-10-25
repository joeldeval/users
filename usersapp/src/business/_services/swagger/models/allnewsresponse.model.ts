import { NewsResponse } from './newsresponse.model'

export interface AllNewsResponse {
  status: boolean;
  message: string;
  data: NewsResponse[];
}
