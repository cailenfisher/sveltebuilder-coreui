<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tooltip } from 'bits-ui';
	import { cx } from '$lib/utils/merge-classes.js';

	type Side = 'top' | 'bottom' | 'left' | 'right';

	interface Props {
		content: string;
		side?: Side;
		sideOffset?: number;
		delay?: number;
		disabled?: boolean;
		class?: string;
		children?: Snippet;
	}

	const {
		content,
		side = 'top',
		sideOffset = 6,
		delay = 500,
		disabled = false,
		class: className,
		children
	}: Props = $props();
</script>

<Tooltip.Provider delayDuration={delay}>
	<Tooltip.Root {disabled}>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<span {...props} style="display: contents">
					{@render children?.()}
				</span>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Portal>
			<Tooltip.Content
				{side}
				{sideOffset}
				class={cx(
					'z-50 overflow-hidden rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm',
					className
				)}
			>
				{content}
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
