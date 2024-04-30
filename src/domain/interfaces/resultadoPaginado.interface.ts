export interface ResultadoPaginado {
  totalDocs: number
  limit: number
  totalPages: number
  page: number | undefined
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null | undefined
  nextPage: number | null | undefined
}
