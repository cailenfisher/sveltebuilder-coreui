<script lang="ts">
	import type { Orientation } from '$lib/types.js';
	import { Separator } from 'bits-ui';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		orientation?: Orientation;
		decorative?: boolean;
		class?: string;
	}

	const { orientation = 'horizontal', decorative = true, class: className }: Props = $props();

	const classes = $derived(
		cx(
			'shrink-0 bg-neutral-200',
			orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
			className
		)
	);
</script>

<Separator.Root {orientation} {decorative} class={classes} />
