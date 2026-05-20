<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Size } from '$lib/types.js';
	import { cx } from '$lib/utils/merge-classes.js';

	type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary';

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'class'> {
		variant?: BadgeVariant;
		size?: Extract<Size, 'sm' | 'md' | 'lg'>;
		class?: string;
		children?: Snippet;
	}

	const { variant = 'default', size = 'md', class: className, children, ...rest }: Props = $props();

	const variantClasses: Record<BadgeVariant, string> = {
		default: 'bg-neutral-100 text-neutral-800 border border-neutral-300',
		primary: 'bg-blue-100 text-blue-800 border border-blue-200',
		secondary: 'bg-neutral-200 text-neutral-700 border border-neutral-300',
		success: 'bg-green-100 text-green-800 border border-green-200',
		warning: 'bg-amber-100 text-amber-800 border border-amber-200',
		danger: 'bg-red-100 text-red-800 border border-red-200'
	};

	const sizeClasses: Record<Extract<Size, 'sm' | 'md' | 'lg'>, string> = {
		sm: 'h-4 px-1.5 text-xs',
		md: 'h-5 px-2 text-xs',
		lg: 'h-6 px-2.5 text-sm'
	};

	const classes = $derived(
		cx(
			'inline-flex items-center rounded-full font-medium',
			variantClasses[variant],
			sizeClasses[size],
			className
		)
	);
</script>

<span class={classes} {...rest}>
	{@render children?.()}
</span>
