<script lang="ts">
	import { Pagination } from 'bits-ui';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		count: number;
		perPage?: number;
		siblingCount?: number;
		page?: number;
		class?: string;
		onPageChange?: (page: number) => void;
	}

	const {
		count,
		perPage = 10,
		siblingCount = 1,
		page = $bindable(1),
		class: className,
		onPageChange
	}: Props = $props();

	const buttonBase = cx(
		'inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-neutral-200 px-2',
		'text-sm font-medium text-neutral-700 transition-colors duration-150',
		'hover:bg-neutral-100 hover:text-neutral-900',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
		'disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
	);
</script>

<Pagination.Root
	{count}
	{perPage}
	{siblingCount}
	{page}
	{onPageChange}
	class={cx('flex items-center gap-1', className)}
>
	{#snippet children({ pages, currentPage })}
		<Pagination.PrevButton class={buttonBase} aria-label="Previous page">
			<svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</Pagination.PrevButton>

		{#each pages as pageItem (pageItem.key)}
			{#if pageItem.type === 'ellipsis'}
				<span class="flex h-8 w-8 items-center justify-center text-sm text-neutral-400">…</span>
			{:else}
				<Pagination.Page
					page={pageItem}
					class={cx(
						buttonBase,
						pageItem.value === currentPage &&
							'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:text-white'
					)}
				>
					{pageItem.value}
				</Pagination.Page>
			{/if}
		{/each}

		<Pagination.NextButton class={buttonBase} aria-label="Next page">
			<svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</Pagination.NextButton>
	{/snippet}
</Pagination.Root>
