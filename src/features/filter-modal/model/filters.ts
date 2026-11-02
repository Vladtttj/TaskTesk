import { FilterType } from '../../../shared/api/types/Filter'
import { SearchRequestFilter } from '../../../shared/api/types/SearchRequest/SearchRequestFilter'

export type FilterDraft = Record<string, string[]>

export const createDraft = (filters: SearchRequestFilter): FilterDraft =>
	filters.reduce<FilterDraft>((draft, filter) => {
		draft[filter.id] = filter.optionsIds
		return draft
	}, {})

export const buildSearchRequest = (draft: FilterDraft): SearchRequestFilter =>
	Object.entries(draft)
		.filter(([, optionIds]) => optionIds.length > 0)
		.map(([id, optionIds]) => ({
			id,
			type: FilterType.OPTION,
			optionsIds: optionIds
		}))
