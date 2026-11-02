import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'

import { FilterModal } from '../../../features/filter-modal'
import { getFilters } from '../../../shared/api/filters'
import { SearchRequestFilter } from '../../../shared/api/types/SearchRequest/SearchRequestFilter'
import { useFiltersStore } from '../../../shared/store/filtersStore'
import { AppliedFilters } from './AppliedFilters'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterOpen, setFilterOpen] = useState(false)

	const appliedFilters = useFiltersStore(state => state.filters)
	const setFilters = useFiltersStore(state => state.setFilters)

	const {
		data: groups = [],
		isLoading,
		isError
	} = useQuery({
		queryKey: ['filters'],
		queryFn: getFilters
	})

	const openFilters = () => {
		setFilterOpen(true)
	}

	const closeFilters = () => {
		setFilterOpen(false)
	}

	const applyFilters = (filters: SearchRequestFilter) => {
		setFilters(filters)
	}

	return (
		<main className="min-h-dvh bg-white text-[#31393C]">
			<div className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-9 sm:py-14">
				<header className="flex flex-wrap items-end justify-between gap-8 border-b border-[#B4B4B4] pb-8">
					<div>
						<p className="text-sm font-medium text-[#FF5F00]">{t('eyebrow')}</p>
						<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
							{t('homeTitle')}
						</h1>
						<p className="mt-3 max-w-xl text-base leading-6 text-[#31393C]/70">
							{t('homeSubtitle')}
						</p>
					</div>
					<button
						type="button"
						onClick={openFilters}
						disabled={groups.length === 0}
						className="inline-flex h-14 items-center gap-2 rounded-xl bg-[#FF5F00] px-7 text-base font-medium text-white transition hover:bg-[#E85600] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5F00] disabled:cursor-not-allowed disabled:bg-[#B4B4B4]"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							aria-hidden="true"
							className="size-5"
						>
							<path d="M4 6h16M7 12h10M10 18h4" />
						</svg>
						{t('open')}
					</button>
				</header>

				<section
					aria-labelledby="applied-filters-title"
					className="pt-10"
				>
					<div className="flex flex-wrap items-baseline justify-between gap-2">
						<h2
							id="applied-filters-title"
							className="text-2xl font-medium leading-8"
						>
							{t('currentTitle')}
						</h2>
						<p className="text-sm text-[#31393C]/60">{t('currentHint')}</p>
					</div>

					{isLoading && (
						<p className="mt-4 text-base text-[#31393C]/60">{t('loading')}</p>
					)}
					{isError && (
						<p className="mt-4 text-base text-[#C0392B]">{t('error')}</p>
					)}

					<AppliedFilters filters={appliedFilters} />
				</section>
			</div>

			<FilterModal
				isOpen={isFilterOpen}
				groups={groups}
				appliedFilters={appliedFilters}
				onClose={closeFilters}
				onApply={applyFilters}
			/>
		</main>
	)
}
