<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Popover } from 'bits-ui';
	import { cx } from '$lib/utils/merge-classes.js';

	type Side = 'top' | 'bottom' | 'left' | 'right';

	interface Props {
		open?: boolean;
		side?: Side;
		sideOffset?: number;
		trigger?: Snippet;
		children?: Snippet;
		class?: string;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		open = $bindable(false),
		side = 'bottom',
		sideOffset = 8,
		trigger,
		children,
		class: className,
		onOpenChange
	}: Props = $props();
</script>

<Popover.Root
	open={open}
	onOpenChange={(v) => {
		open = v;
		onOpenChange?.(v);
	}}
>
	{#if trigger}
		<Popover.Trigger>
			{#snippet child({ props })}
				<span {...props} style="display: contents">
					{@render trigger()}
				</span>
			{/snippet}
		</Popover.Trigger>
	{/if}

	<Popover.Portal>
		<Popover.Content
			{side}
			{sideOffset}
			class={cx(
				'z-50 min-w-48 rounded-md border border-neutral-200 bg-white p-4 shadow-md outline-none',
				className
			)}
		>
			{@render children?.()}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
