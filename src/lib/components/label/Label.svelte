<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Label } from 'bits-ui';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		for?: string;
		required?: boolean;
		disabled?: boolean;
		class?: string;
		children?: Snippet;
	}

	const { for: htmlFor, required = false, disabled = false, class: className, children }: Props = $props();

	const classes = $derived(
		cx(
			'text-sm font-medium leading-none text-neutral-700',
			disabled && 'opacity-50 cursor-not-allowed',
			className
		)
	);
</script>

<Label.Root for={htmlFor} class={classes}>
	{@render children?.()}
	{#if required}
		<span class="ml-0.5 text-red-500" aria-hidden="true">*</span>
	{/if}
</Label.Root>
