export interface SortConfig<T> {
    key: keyof T | null;
    direction: 'asc' | 'desc';
}