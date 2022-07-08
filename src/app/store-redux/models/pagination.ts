export interface pagination {
    hasNextPage: boolean,
    hasPrevPage: boolean,
    next: number,
    page: number,
    pagingCounter: number,
    prev: number,
    totalElements: number,
    totalPages: number,
};

export const paginationInit: pagination = {
    hasNextPage: false,
    hasPrevPage: false,
    next: 0,
    page: 0,
    pagingCounter: 0,
    prev: null,
    totalElements: 0,
    totalPages: 0,
}
