<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		checked?: boolean;
		indeterminate?: boolean;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		value?: string;
		label?: string;
		id?: string;
		class?: string;
		onCheckedChange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(false),
		indeterminate = $bindable(false),
		disabled = false,
		required = false,
		name,
		value,
		label,
		id,
		class: className,
		onCheckedChange
	}: Props = $props();

	const controlId = $derived(
		id ?? (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)
	);

	const rootClasses = cx(
		'peer flex h-4 w-4 shrink-0 items-center justify-center rounded border border-neutral-400 bg-white',
		'data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600',
		'data-[state=indeterminate]:bg-blue-600 data-[state=indeterminate]:border-blue-600',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
		'disabled:cursor-not-allowed disabled:opacity-50',
		'transition-colors duration-150 cursor-pointer'
	);
</script>

<div class={cx('flex items-center gap-2', className)}>
	<Checkbox.Root
		checked={checked}
		indeterminate={indeterminate}
		{disabled}
		{required}
		{name}
		{value}
		id={controlId}
		class={rootClasses}
		onCheckedChange={(v) => {
			checked = v;
			onCheckedChange?.(v);
		}}
		onIndeterminateChange={(v) => {
			indeterminate = v;
		}}
	>
		{#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
			{#if isIndeterminate}
				<svg
					aria-hidden="true"
					class="h-3 w-3 text-white"
					viewBox="0 0 12 12"
					fill="currentColor"
				>
					<rect x="2" y="5" width="8" height="2" rx="1" />
				</svg>
			{:else if isChecked}
				<svg
					aria-hidden="true"
					class="h-3 w-3 text-white"
					viewBox="0 0 12 12"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<polyline points="2,6 5,9 10,3" />
				</svg>
			{/if}
		{/snippet}
	</Checkbox.Root>

	{#if label}
		<label
			for={controlId}
			class={cx(
				'text-sm text-neutral-700 cursor-pointer select-none',
				disabled && 'opacity-50 cursor-not-allowed'
			)}
		>
			{label}
		</label>
	{/if}
</div>
