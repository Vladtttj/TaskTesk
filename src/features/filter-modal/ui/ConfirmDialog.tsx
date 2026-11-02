import { useTranslation } from 'react-i18next'

interface ConfirmDialogProps {
	isOpen: boolean
	onClose: () => void
	onUseOldFilters: () => void
	onApply: () => void
}

export const ConfirmDialog = ({
	isOpen,
	onClose,
	onUseOldFilters,
	onApply
}: ConfirmDialogProps) => {
	const { t } = useTranslation('filter')

	if (!isOpen) {
		return null
	}

	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-8">
			<div
				className="fixed inset-0 bg-[#31393C]/10 backdrop-blur-sm"
				onClick={onClose}
				aria-hidden="true"
			/>
			<div
				role="alertdialog"
				aria-modal="true"
				aria-labelledby="filter-confirm-title"
				className="relative w-full max-w-[1280px] bg-white px-5 pb-8 pt-10 text-[#31393C] shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:px-9 sm:pb-9 sm:pt-12"
			>
				<div className="flex items-center gap-4">
					<h3
						id="filter-confirm-title"
						className="flex-1 text-2xl font-semibold leading-9 sm:text-4xl sm:leading-[44px]"
					>
						{t('confirmTitle')}
					</h3>
					<button
						type="button"
						onClick={onClose}
						aria-label={t('closeConfirm')}
						className="rounded-full p-2 transition hover:bg-[#31393C]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5F00]"
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
							<path d="M6 6l12 12M18 6L6 18" />
						</svg>
					</button>
				</div>

				<div className="mt-14 flex flex-col items-center gap-4 sm:mt-28 sm:flex-row sm:justify-center sm:gap-8">
					<button
						type="button"
						onClick={onUseOldFilters}
						className="h-16 w-full rounded-xl border border-[#D9D9D9] bg-white text-base font-medium transition hover:border-[#B4B4B4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31393C] sm:w-[280px]"
					>
						{t('useOldFilter')}
					</button>
					<button
						type="button"
						onClick={onApply}
						className="h-16 w-full rounded-xl bg-[#FF5F00] text-base font-medium text-white transition hover:bg-[#E85600] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5F00] sm:w-[280px]"
					>
						{t('applyNewFilter')}
					</button>
				</div>
			</div>
		</div>
	)
}
