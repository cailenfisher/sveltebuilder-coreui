<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
		class?: string;
	}

	const { header, footer, children, class: className, ...rest }: Props = $props();

	const classes = $derived(
		cx(
			'rounded-lg border border-neutral-200 bg-white shadow-sm overflow-hidden',
			className
		)
	);
</script>

<div class={classes} {...rest}>
	{#if header}
		<div class="border-b border-neutral-200 px-5 py-4">
			{@render header()}
		</div>
	{/if}

	{#if children}
		<div class="px-5 py-4">
			{@render children()}
		</div>
	{/if}

	{#if footer}
		<div class="border-t border-neutral-200 bg-neutral-50 px-5 py-3">
			{@render footer()}
		</div>
	{/if}
</div>
