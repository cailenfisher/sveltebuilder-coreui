<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Size, Variant, ButtonType } from '$lib/types.js';
	import { throwError } from '$lib/utils/error.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props extends Omit<HTMLButtonAttributes, 'class' | 'type'> {
		'aria-label': string;
		variant?: Variant;
		size?: Size;
		type?: ButtonType;
		class?: string;
		children?: Snippet;
	}

	const {
		'aria-label': ariaLabel,
		variant = 'ghost',
		size = 'md',
		disabled,
		type = 'button',
		class: className,
		children,
		...rest
	}: Props = $props();

	$effect(() => {
		if (!ariaLabel) {
			throwError('IconButton', 'init', `'aria-label' prop is required for accessibility`);
		}
	});

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
		xs: 'h-6 w-6 text-xs',
		sm: 'h-8 w-8 text-sm',
		md: 'h-9 w-9 text-sm',
		lg: 'h-10 w-10 text-base',
		xl: 'h-12 w-12 text-base'
	};

	const classes = $derived(
		cx(
			'inline-flex items-center justify-center rounded-md',
			'transition-colors duration-150 cursor-pointer shrink-0',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
			'disabled:opacity-50 disabled:pointer-events-none',
			variantClasses[variant],
			sizeClasses[size],
			className
		)
	);
</script>

<button
	{type}
	class={classes}
	aria-label={ariaLabel}
	{disabled}
	aria-disabled={disabled || undefined}
	{...rest}
>
	{@render children?.()}
</button>
