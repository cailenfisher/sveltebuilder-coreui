<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { AlertSeverity } from '$lib/types.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'role'> {
		severity?: AlertSeverity;
		title?: string;
		dismissible?: boolean;
		onDismiss?: () => void;
		class?: string;
		children?: Snippet;
	}

	const {
		severity = 'info',
		title,
		dismissible = false,
		onDismiss,
		class: className,
		children,
		...rest
	}: Props = $props();

	const severityClasses: Record<AlertSeverity, string> = {
		info: 'bg-blue-50 border-blue-300 text-blue-900',
		success: 'bg-green-50 border-green-300 text-green-900',
		warning: 'bg-amber-50 border-amber-300 text-amber-900',
		error: 'bg-red-50 border-red-300 text-red-900'
	};

	const iconClasses: Record<AlertSeverity, string> = {
		info: 'text-blue-500',
		success: 'text-green-500',
		warning: 'text-amber-500',
		error: 'text-red-500'
	};

	const iconPaths: Record<AlertSeverity, string> = {
		info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
		error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
	};

	const classes = $derived(
		cx('flex gap-3 rounded-lg border p-4', severityClasses[severity], className)
	);
</script>

<div role="alert" class={classes} {...rest}>
	<svg
		aria-hidden="true"
		class={cx('mt-0.5 h-5 w-5 shrink-0', iconClasses[severity])}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d={iconPaths[severity]} />
	</svg>

	<div class="flex-1 min-w-0">
		{#if title}
			<p class="mb-1 font-semibold">{title}</p>
		{/if}
		{#if children}
			<div class="text-sm">
				{@render children()}
			</div>
		{/if}
	</div>

	{#if dismissible}
		<button
			type="button"
			aria-label="Dismiss"
			onclick={onDismiss}
			class="shrink-0 -mt-0.5 -mr-0.5 h-6 w-6 inline-flex items-center justify-center rounded
				   opacity-60 hover:opacity-100 transition-opacity duration-100
				   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current
				   cursor-pointer"
		>
			<svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
				<path d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" />
			</svg>
		</button>
	{/if}
</div>
