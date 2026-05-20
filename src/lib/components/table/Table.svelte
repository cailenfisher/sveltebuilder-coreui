<script lang="ts" generics="T extends Record<string, unknown>">
	import type { TableColumn, Align } from '$lib/types.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		columns: TableColumn<T>[];
		rows: T[];
		caption?: string;
		striped?: boolean;
		class?: string;
	}

	const {
		columns,
		rows,
		caption,
		striped = false,
		class: className
	}: Props = $props();

	const alignClasses: Record<Align, string> = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};
</script>

<div class={cx('w-full overflow-x-auto rounded-lg border border-neutral-200', className)}>
	<table class="min-w-full divide-y divide-neutral-200 text-sm">
		{#if caption}
			<caption class="sr-only">{caption}</caption>
		{/if}

		<thead class="bg-neutral-50">
			<tr>
				{#each columns as col (col.key)}
					<th
						scope="col"
						class={cx(
							'px-4 py-3 font-medium text-neutral-600 whitespace-nowrap',
							alignClasses[col.align ?? 'left']
						)}
					>
						{col.label}
					</th>
				{/each}
			</tr>
		</thead>

		<tbody class="divide-y divide-neutral-100 bg-white">
			{#if rows.length === 0}
				<tr>
					<td
						colspan={columns.length}
						class="px-4 py-8 text-center text-neutral-400"
					>
						No data
					</td>
				</tr>
			{:else}
				{#each rows as row, i (i)}
					<tr class={cx(striped && i % 2 !== 0 && 'bg-neutral-50', 'hover:bg-neutral-50 transition-colors duration-100')}>
						{#each columns as col (col.key)}
							<td
								class={cx(
									'px-4 py-3 text-neutral-800',
									alignClasses[col.align ?? 'left']
								)}
							>
								{row[col.key] ?? ''}
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
