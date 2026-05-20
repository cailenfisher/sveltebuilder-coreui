<script lang="ts">
	import { Avatar } from 'bits-ui';
	import type { Size } from '$lib/types.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		src?: string;
		alt?: string;
		fallback?: string;
		size?: Size;
		class?: string;
	}

	const {
		src,
		alt = '',
		fallback = '',
		size = 'md',
		class: className
	}: Props = $props();

	const sizeClasses: Record<Size, string> = {
		xs: 'h-6 w-6 text-xs',
		sm: 'h-8 w-8 text-xs',
		md: 'h-10 w-10 text-sm',
		lg: 'h-12 w-12 text-base',
		xl: 'h-16 w-16 text-lg'
	};

	const rootClasses = $derived(
		cx(
			'relative flex shrink-0 overflow-hidden rounded-full bg-neutral-200',
			sizeClasses[size],
			className
		)
	);
</script>

<Avatar.Root class={rootClasses}>
	{#if src}
		<Avatar.Image {src} {alt} class="h-full w-full object-cover" />
	{/if}
	<Avatar.Fallback
		class="flex h-full w-full items-center justify-center font-medium text-neutral-600 uppercase"
	>
		{#if fallback}
			{fallback}
		{:else}
			<svg aria-hidden="true" class="h-1/2 w-1/2 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
			</svg>
		{/if}
	</Avatar.Fallback>
</Avatar.Root>
