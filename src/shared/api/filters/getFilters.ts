import filterData from '../../temp/filterData.json'
import { FilterItem } from '../types/Filter'

export const getFilters = async (): Promise<FilterItem[]> =>
	filterData.filterItems as unknown as FilterItem[]
