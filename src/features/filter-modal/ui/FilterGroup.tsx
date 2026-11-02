import { FilterItem } from '../../../shared/api/types/Filter'

interface FilterGroupProps {
	group: FilterItem
	selectedIds: string[]
	onToggle: (groupId: string, optionId: string) => void
}

export const FilterGroup = ({
	group,
	selectedIds,
	onToggle
}: FilterGroupProps) => {
	const headingId = `filter-group-${group.id}`

	return (
		<div
			role="group"
			aria-labelledby={headingId}
			className="border-b border-[#B4B4B4] pb-8 last:border-b-0 [&:not(:first-child)]:pt-8"
		>
			<h3
				id={headingId}
				className="text-xl font-medium leading-8 sm:text-2xl"
			>
				{group.name}
			</h3>
			<div className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
				{group.options.map(option => {
					const isSelected = selectedIds.includes(option.id)

					return (
						<label
							key={option.id}
							className="group flex cursor-pointer items-start gap-4"
						>
							<input
								type="checkbox"
								name={group.id}
								value={option.id}
								checked={isSelected}
								onChange={() => onToggle(group.id, option.id)}
								className="peer sr-only"
							/>
							<span
								aria-hidden="true"
								className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[3px] border-2 transition peer-focus-visible:ring-2 peer-focus-visible:ring-[#FF5F00]/40 peer-focus-visible:ring-offset-2 ${
									isSelected
										? 'border-[#FF5F00] bg-[#FF5F00]'
										: 'border-[#31393C] bg-white group-hover:border-[#FF5F00]'
								}`}
							>
								{isSelected && (
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
										className="size-3.5 text-white"
									>
										<path d="M5 13l4 4L19 7" />
									</svg>
								)}
							</span>
							<span className="text-base leading-6 sm:text-lg">
								{option.name}
							</span>
						</label>
					)
				})}
			</div>
		</div>
	)
}
