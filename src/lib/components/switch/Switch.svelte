<script lang="ts">
	import { Switch } from 'bits-ui';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		checked?: boolean;
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
		id ?? (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)
	);
</script>

<div class={cx('flex items-center gap-2', className)}>
	<Switch.Root
		checked={checked}
		{disabled}
		{required}
		{name}
		{value}
		id={controlId}
		onCheckedChange={(v) => {
			checked = v;
			onCheckedChange?.(v);
		}}
		class={cx(
			'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
			'bg-neutral-300 transition-colors duration-200',
			'data-[state=checked]:bg-blue-600',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
			'disabled:cursor-not-allowed disabled:opacity-50'
		)}
	>
		{#snippet children({ checked: isChecked })}
			<Switch.Thumb
				class={cx(
					'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm',
					'transition-transform duration-200',
					isChecked ? 'translate-x-4' : 'translate-x-0'
				)}
			/>
		{/snippet}
	</Switch.Root>

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
