<script lang="ts">
	import { RadioGroup } from 'bits-ui';
	import type { RadioOption, Orientation } from '$lib/types.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		items: RadioOption[];
		value?: string;
		name?: string;
		disabled?: boolean;
		required?: boolean;
		orientation?: Orientation;
		class?: string;
		onValueChange?: (value: string) => void;
	}

	let {
		items,
		value = $bindable(''),
		name,
		disabled = false,
		required = false,
		orientation = 'vertical',
		class: className,
		onValueChange
	}: Props = $props();
</script>

<RadioGroup.Root
	value={value}
	{name}
	{disabled}
	{required}
	{orientation}
	onValueChange={(v) => {
		value = v;
		onValueChange?.(v);
	}}
	class={cx(
		'flex gap-2',
		orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
		className
	)}
>
	{#each items as item (item.value)}
		{@const itemId = `radio-${name ?? 'group'}-${item.value}`}
		<div class="flex items-center gap-2">
			<RadioGroup.Item
				id={itemId}
				value={item.value}
				disabled={item.disabled}
				class={cx(
					'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-neutral-400 bg-white',
					'data-[state=checked]:border-blue-600',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
					'disabled:cursor-not-allowed disabled:opacity-50',
					'transition-colors duration-150 cursor-pointer'
				)}
			>
				{#snippet children({ checked })}
					{#if checked}
						<div class="h-2 w-2 rounded-full bg-blue-600"></div>
					{/if}
				{/snippet}
			</RadioGroup.Item>
			<label
				for={itemId}
				class={cx(
					'text-sm text-neutral-700 cursor-pointer select-none',
					(disabled || item.disabled) && 'opacity-50 cursor-not-allowed'
				)}
			>
				{item.label}
			</label>
		</div>
	{/each}
</RadioGroup.Root>
