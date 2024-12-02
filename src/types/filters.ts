export interface FilterType<T> {
    eq?: T;
    gt?: T;
    lt?: T;
    gte?: T;
    lte?: T;
    neq?: T;
}

export type FilterOperators = 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'neq';
