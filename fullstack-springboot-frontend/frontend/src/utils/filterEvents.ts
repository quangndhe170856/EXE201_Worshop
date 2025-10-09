import { FilterState } from "../components/SearchAndFilters";

export function buildEventQueryParams(filters: FilterState) {
  const params: Record<string, any> = {};

  // Search query
  if (filters.searchQuery?.trim()) {
    params.q = filters.searchQuery.trim();
  }

  if (filters.categories.length > 0) {
    params.categoryIds = filters.categories;
  }

  // Date range
  if (filters.dateRange.from) {
    params.from = filters.dateRange.from.toISOString();
  }
  if (filters.dateRange.to) {
    params.to = filters.dateRange.to.toISOString();
  }

  return params;
}
