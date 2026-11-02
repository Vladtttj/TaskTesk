import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterItem } from '../../../shared/api/types/Filter'
import { SearchRequestFilter } from '../../../shared/api/types/SearchRequest/SearchRequestFilter'
import { FilterDraft, buildSearchRequest, createDraft } from '../model/filters'
import { ConfirmDialog } from './ConfirmDialog'
import { FilterGroup } from './FilterGroup'

interface FilterModalProps {
	isOpen: boolean
	groups: FilterItem[]
	appliedFilters: SearchRequestFilter
	onClose: () => void
	onApply: (filters: SearchRequestFilter) => void
}

export const FilterModal = ({
	isOpen,
	groups,
	appliedFilters,
	onClose,
	onApply
}: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const [draft, setDraft] = useState<FilterDraft>({})
	const [isConfirmOpen, setConfirmOpen] = useState(false)

	useEffect(() => {
		if (!isOpen) {
			return
		}
		setDraft(createDraft(appliedFilters))
		setConfirmOpen(false)
	}, [isOpen, appliedFilters])

	useEffect(() => {
		if (!isOpen) {
			return
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') {
				return
			}

			if (isConfirmOpen) {
				setConfirmOpen(false)
				return
			}

			onClose()
		}

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		document.addEventListener('keydown', onKeyDown)

		return () => {
			document.body.style.overflow = previousOverflow
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, isConfirmOpen, onClose])

	if (!isOpen) {
		return null
	}

	const toggleOption = (groupId: string, optionId: string) => {
		setDraft(previous => {
			const selectedIds = previous[groupId] ?? []
			const isSelected = selectedIds.includes(optionId)

			return {
				...previous,
				[groupId]: isSelected
					? selectedIds.filter(id => id !== optionId)
					: [...selectedIds, optionId]
			}
		})
	}

	const clearAll = () => {
		setDraft({})
	}

	const confirmApply = () => {
		onApply(buildSearchRequest(draft))
		setConfirmOpen(false)
		onClose()
	}

	const useOldFilters = () => {
		setConfirmOpen(false)
		onClose()
	}

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-8">
			<div
				className="fixed inset-0 bg-[#31393C]/15 backdrop-blur-[6px]"
				onClick={onClose}
				aria-hidden="true"
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="filter-modal-title"
				className="relative flex max-h-full w-full max-w-[1280px] flex-col bg-white text-[#31393C] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
			>
				<header className="relative flex h-20 shrink-0 items-center justify-center border-b border-[#B4B4B4] px-5 sm:h-[118px] sm:px-9">
					<h2
						id="filter-modal-title"
						className="text-2xl font-medium sm:text-[32px] sm:leading-10"
					>
						{t('title')}
					</h2>
					<button
						type="button"
						onClick={onClose}
						aria-label={t('close')}
						className="absolute right-3 rounded-full p-2 transition hover:bg-[#31393C]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5F00] sm:right-7"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							aria-hidden="true"
							className="size-5 sm:size-6"
						>
							<path d="M6 6l12 12M18 6L6 18" />
						</svg>
					</button>
				</header>

				<div className="flex-1 overflow-y-auto px-5 pb-8 pt-10 sm:px-9 sm:pt-16">
					{groups.map(group => (
						<FilterGroup
							key={group.id}
							group={group}
							selectedIds={draft[group.id] ?? []}
							onToggle={toggleOption}
						/>
					))}
				</div>

				<footer className="relative flex shrink-0 flex-col items-center gap-3 border-t border-[#B4B4B4] px-5 py-6 sm:h-[130px] sm:flex-row sm:justify-center sm:gap-0 sm:px-9 sm:py-0">
					<button
						type="button"
						onClick={() => setConfirmOpen(true)}
						className="h-16 w-full rounded-xl bg-[#FF5F00] text-base font-medium text-white transition hover:bg-[#E85600] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5F00] sm:w-[184px]"
					>
						{t('apply')}
					</button>
					<button
						type="button"
						onClick={clearAll}
						className="text-base text-[#078691] underline underline-offset-2 transition hover:text-[#056F78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078691] sm:absolute sm:right-9"
					>
						{t('clearAll')}
					</button>
				</footer>

				<ConfirmDialog
					isOpen={isConfirmOpen}
					onClose={() => setConfirmOpen(false)}
					onUseOldFilters={useOldFilters}
					onApply={confirmApply}
				/>
			</div>
		</div>
	)
}
