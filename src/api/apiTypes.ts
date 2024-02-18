export interface MetaDataPageAPI {
  total: number; // 1
  per_page: number; // 10
  current_page: number; // 1
  last_page: number; // 1
  first_page: number; // 1
  first_page_url: string; // "/?page=1"
  last_page_url: string; // "/?page=1"
  next_page_url: string | null; // "/?page=1"
  previous_page_url: string | null; // ""
}

/**
 * @description This interface defines the structure of one page of data from the API
 * @template Data The type of data of the page
 */
export interface PageAPI<Data> {
  meta: MetaDataPageAPI;
  data: Data[];
}

export interface PageParams {
  page?: number;
  per_page?: number;
}
