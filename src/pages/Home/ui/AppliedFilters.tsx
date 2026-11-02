import { useTranslation } from 'react-i18next'

import { SearchRequestFilter } from '../../../shared/api/types/SearchRequest/SearchRequestFilter'

interface AppliedFiltersProps {
	filters: SearchRequestFilter
}

export const AppliedFilters = ({ filters }: AppliedFiltersProps) => {
	const { t } = useTranslation('filter')

	if (filters.length === 0) {
		return <p className="mt-5 text-base text-[#31393C]/60">{t('empty')}</p>
	}

	return (
		<pre className="mt-5 overflow-x-auto rounded-2xl border border-[#B4B4B4]/40 bg-[#F5F5F5] p-6 text-sm leading-relaxed text-[#31393C]">
			<code>{JSON.stringify(filters, null, 2)}</code>
		</pre>
	)
}
