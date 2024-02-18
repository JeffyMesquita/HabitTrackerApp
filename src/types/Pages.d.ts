export interface MetaDataPage {
  total: number; // 1
  perPage: number; // 10
  currentPage: number; // 1
  lastPage: number; // 1
  firstPage: number; // 1
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Page<Data> {
  meta: MetaDataPage;
  data: Data[];
}
