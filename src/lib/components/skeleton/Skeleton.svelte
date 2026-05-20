<script lang="ts">
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		width?: string;
		height?: string;
		rounded?: boolean | 'sm' | 'md' | 'lg' | 'full';
		class?: string;
	}

	const {
		width = '100%',
		height = '1rem',
		rounded = 'md',
		class: className
	}: Props = $props();

	const roundedClasses: Record<string, string> = {
		true: 'rounded',
		false: 'rounded-none',
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		full: 'rounded-full'
	};

	const roundedKey = $derived(String(rounded));

	const classes = $derived(
		cx('block animate-pulse bg-neutral-200', roundedClasses[roundedKey] ?? 'rounded-md', className)
	);
</script>

<span
	role="status"
	aria-busy="true"
	aria-label="Loading"
	class={classes}
	style:width
	style:height
	style:display="block"
></span>
