import { create } from 'zustand'

import { SearchRequestFilter } from '../api/types/SearchRequest/SearchRequestFilter'

interface FiltersState {
	filters: SearchRequestFilter
	setFilters: (filters: SearchRequestFilter) => void
}

export const useFiltersStore = create<FiltersState>(set => ({
	filters: [],
	setFilters: filters => set({ filters })
}))
