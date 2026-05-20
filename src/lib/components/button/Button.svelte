<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Size, Variant, ButtonType } from '$lib/types.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props extends Omit<HTMLButtonAttributes, 'class' | 'type'> {
		variant?: Variant;
		size?: Size;
		loading?: boolean;
		type?: ButtonType;
		class?: string;
		children?: Snippet;
	}

	const {
		variant = 'default',
		size = 'md',
		loading = false,
		disabled,
		type = 'button',
		class: className,
		children,
		...rest
	}: Props = $props();

	const variantClasses: Record<Variant, string> = {
		default: 'bg-neutral-100 text-neutral-900 border border-neutral-300 hover:bg-neutral-200 active:bg-neutral-300',
		primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
		secondary: 'bg-neutral-700 text-white hover:bg-neutral-800 active:bg-neutral-900',
		success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
		warning: 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700',
		danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
		ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
		outline: 'bg-transparent text-neutral-700 border border-neutral-400 hover:bg-neutral-50 active:bg-neutral-100'
	};

	const sizeClasses: Record<Size, string> = {
		xs: 'h-6 px-2 text-xs gap-1',
		sm: 'h-8 px-3 text-sm gap-1.5',
		md: 'h-9 px-4 text-sm gap-2',
		lg: 'h-10 px-5 text-base gap-2',
		xl: 'h-12 px-6 text-base gap-2.5'
	};

	const classes = $derived(
		cx(
			'inline-flex items-center justify-center rounded-md font-medium',
			'transition-colors duration-150 cursor-pointer select-none whitespace-nowrap',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
			'disabled:opacity-50 disabled:pointer-events-none',
			variantClasses[variant],
			sizeClasses[size],
			loading && 'opacity-75 pointer-events-none',
			className
		)
	);
</script>

<button
	{type}
	class={classes}
	disabled={disabled || loading}
	aria-disabled={disabled || loading}
	aria-busy={loading || undefined}
	{...rest}
>
	{#if loading}
		<span
			class="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
			aria-hidden="true"
		></span>
	{/if}
	{@render children?.()}
</button>
