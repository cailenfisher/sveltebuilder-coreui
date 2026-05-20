<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Size, Variant } from '$lib/types.js';
	import { throwError } from '$lib/utils/error.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props extends Omit<HTMLAnchorAttributes, 'class'> {
		href: string;
		variant?: Variant;
		size?: Size;
		disabled?: boolean;
		class?: string;
		children?: Snippet;
	}

	const {
		href,
		variant = 'default',
		size = 'md',
		disabled = false,
		class: className,
		children,
		...rest
	}: Props = $props();

	$effect(() => {
		if (!href) {
			throwError('LinkButton', 'init', `'href' prop is required`);
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
		xs: 'h-6 px-2 text-xs gap-1',
		sm: 'h-8 px-3 text-sm gap-1.5',
		md: 'h-9 px-4 text-sm gap-2',
		lg: 'h-10 px-5 text-base gap-2',
		xl: 'h-12 px-6 text-base gap-2.5'
	};

	const classes = $derived(
		cx(
			'inline-flex items-center justify-center rounded-md font-medium',
			'transition-colors duration-150 cursor-pointer select-none whitespace-nowrap no-underline',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
			variantClasses[variant],
			sizeClasses[size],
			disabled && 'opacity-50 pointer-events-none',
			className
		)
	);
</script>

<a
	href={disabled ? undefined : href}
	class={classes}
	aria-disabled={disabled || undefined}
	tabindex={disabled ? -1 : undefined}
	{...rest}
>
	{@render children?.()}
</a>
