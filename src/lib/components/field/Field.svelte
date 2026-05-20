<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		label: string;
		id: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		class?: string;
		children?: Snippet;
	}

	const {
		label,
		id,
		hint,
		error,
		required = false,
		disabled = false,
		class: className,
		children
	}: Props = $props();

	const hintId = $derived(`${id}-hint`);
	const errorId = $derived(`${id}-error`);
</script>

<div class={cx('flex flex-col gap-1.5', className)}>
	<label
		for={id}
		class={cx(
			'text-sm font-medium leading-none text-neutral-700',
			disabled && 'opacity-50 cursor-not-allowed'
		)}
	>
		{label}
		{#if required}
			<span class="ml-0.5 text-red-500" aria-hidden="true">*</span>
		{/if}
	</label>

	<div
		class="[&_input]:w-full [&_textarea]:w-full [&_select]:w-full"
		aria-describedby={error ? errorId : hint ? hintId : undefined}
	>
		{@render children?.()}
	</div>

	{#if hint && !error}
		<p id={hintId} class="text-xs text-neutral-500">{hint}</p>
	{/if}

	{#if error}
		<p id={errorId} class="text-xs text-red-600" role="alert">{error}</p>
	{/if}
</div>
