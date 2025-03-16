export const Orders = ['asc', 'desc'] as const;

export type Order = typeof Orders[number];
