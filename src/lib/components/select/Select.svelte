<script lang="ts">
	import { Select } from 'bits-ui';
	import type { SelectOption } from '$lib/types.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		items: SelectOption[];
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		class?: string;
		onValueChange?: (value: string) => void;
	}

	let {
		items,
		value = $bindable(''),
		placeholder = 'Select an option',
		disabled = false,
		required = false,
		name,
		class: className,
		onValueChange
	}: Props = $props();

	const selectedLabel = $derived(items.find((i) => i.value === value)?.label ?? '');
</script>

<Select.Root
	type="single"
	{items}
	value={value}
	{disabled}
	{required}
	{name}
	onValueChange={(v: string) => {
		value = v;
		onValueChange?.(v);
	}}
>
	<Select.Trigger
		class={cx(
			'flex h-9 w-full items-center justify-between rounded-md border border-neutral-300 bg-white px-3 py-2',
			'text-sm text-neutral-900',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
			'disabled:cursor-not-allowed disabled:opacity-50',
			'transition-colors duration-150 cursor-pointer',
			className
		)}
		aria-label={placeholder}
	>
		<Select.Value {placeholder}>
			{selectedLabel || placeholder}
		</Select.Value>
		<svg
			aria-hidden="true"
			class="ml-2 h-4 w-4 shrink-0 text-neutral-500"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	</Select.Trigger>

	<Select.Portal>
		<Select.Content
			class={cx(
				'z-50 min-w-32 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-md'
			)}
			sideOffset={4}
		>
			<Select.Viewport class="p-1">
				{#each items as item (item.value)}
					<Select.Item
						value={item.value}
						label={item.label}
						disabled={item.disabled}
						class={cx(
							'relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none',
							'text-neutral-700 transition-colors duration-100',
							'data-highlighted:bg-neutral-100',
							'data-disabled:pointer-events-none data-disabled:opacity-50'
						)}
					>
						{#snippet children({ selected })}
							{item.label}
							{#if selected}
								<svg
									aria-hidden="true"
									class="ml-auto h-4 w-4 text-blue-600"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2.5"
								>
									<polyline points="20 6 9 17 4 12" />
								</svg>
							{/if}
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
