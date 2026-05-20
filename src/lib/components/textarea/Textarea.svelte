<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props extends Omit<HTMLTextareaAttributes, 'class'> {
		value?: string;
		error?: string;
		resize?: 'none' | 'vertical' | 'horizontal' | 'both';
		class?: string;
	}

	let {
		value = $bindable(''),
		error,
		resize = 'vertical',
		disabled,
		class: className,
		...rest
	}: Props = $props();

	const resizeClasses: Record<string, string> = {
		none: 'resize-none',
		vertical: 'resize-y',
		horizontal: 'resize-x',
		both: 'resize'
	};

	const classes = $derived(
		cx(
			'flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm text-neutral-900',
			'placeholder:text-neutral-400',
			'transition-colors duration-150',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
			'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50',
			error ? 'border-red-400 focus-visible:ring-red-400' : 'border-neutral-300 hover:border-neutral-400',
			resizeClasses[resize],
			className
		)
	);
</script>

<textarea bind:value class={classes} {disabled} aria-invalid={error ? true : undefined} {...rest}
></textarea>

{#if error}
	<p class="mt-1 text-xs text-red-600" role="alert">{error}</p>
{/if}
