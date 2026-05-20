<script lang="ts">
	import type { Snippet } from 'svelte';
	import { DropdownMenu } from 'bits-ui';
	import type { MenuItem } from '$lib/types.js';
	import { logError } from '$lib/utils/error.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		items: MenuItem[];
		trigger?: Snippet;
		side?: 'top' | 'bottom' | 'left' | 'right';
		sideOffset?: number;
		open?: boolean;
		class?: string;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		items,
		trigger,
		side = 'bottom',
		sideOffset = 6,
		open = $bindable(false),
		class: className,
		onOpenChange
	}: Props = $props();

	async function handleItemAction(item: MenuItem) {
		if (item.separator) return;
		if (!item.action) return;
		try {
			await item.action();
		} catch (error) {
			logError('Menu', 'handleItemAction', String(error));
		}
	}
</script>

<DropdownMenu.Root
	open={open}
	onOpenChange={(v) => {
		open = v;
		onOpenChange?.(v);
	}}
>
	{#if trigger}
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<span {...props} style="display: contents">
					{@render trigger()}
				</span>
			{/snippet}
		</DropdownMenu.Trigger>
	{/if}

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			{side}
			{sideOffset}
			class={cx(
				'z-50 min-w-40 overflow-hidden rounded-md border border-neutral-200 bg-white p-1 shadow-md',
				className
			)}
		>
			{#each items as item, i (i)}
				{#if item.separator}
					<DropdownMenu.Separator class="my-1 h-px bg-neutral-200" />
				{:else}
					<DropdownMenu.Item
						disabled={item.disabled}
						onclick={() => handleItemAction(item)}
						class={cx(
							'relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-1.5',
							'text-sm text-neutral-700 outline-none transition-colors duration-100',
							'data-highlighted:bg-neutral-100',
							'data-disabled:pointer-events-none data-disabled:opacity-50'
						)}
					>
						{item.label}
					</DropdownMenu.Item>
				{/if}
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
