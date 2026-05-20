<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'class'> {
		dismissible?: boolean;
		onDismiss?: () => void;
		class?: string;
		children?: Snippet;
	}

	const { dismissible = false, onDismiss, class: className, children, ...rest }: Props = $props();

	const classes = $derived(
		cx(
			'inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-neutral-100',
			'px-2 py-0.5 text-sm font-medium text-neutral-700',
			className
		)
	);
</script>

<span class={classes} {...rest}>
	{@render children?.()}
	{#if dismissible}
		<button
			type="button"
			aria-label="Remove"
			onclick={onDismiss}
			class="ml-0.5 -mr-0.5 inline-flex h-4 w-4 items-center justify-center rounded-sm text-neutral-500
				   hover:bg-neutral-200 hover:text-neutral-700
				   focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500
				   transition-colors duration-100 cursor-pointer"
		>
			<svg aria-hidden="true" class="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
				<path d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" />
			</svg>
		</button>
	{/if}
</span>
