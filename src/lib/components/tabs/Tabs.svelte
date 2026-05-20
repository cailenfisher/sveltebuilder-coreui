<script lang="ts">
	import { Tabs } from 'bits-ui';
	import type { TabItem } from '$lib/types.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		items: TabItem[];
		value?: string;
		class?: string;
		onValueChange?: (value: string) => void;
	}

	let {
		items,
		value = $bindable(items[0]?.value ?? ''),
		class: className,
		onValueChange
	}: Props = $props();
</script>

<Tabs.Root
	value={value}
	onValueChange={(v) => {
		value = v;
		onValueChange?.(v);
	}}
	class={cx('w-full', className)}
>
	<Tabs.List
		class="flex h-9 items-center gap-1 rounded-md border border-neutral-200 bg-neutral-100 p-1"
	>
		{#each items as item (item.value)}
			<Tabs.Trigger
				value={item.value}
				disabled={item.disabled}
				class={cx(
					'inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1',
					'text-sm font-medium text-neutral-600 transition-colors duration-150',
					'hover:text-neutral-900',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
					'disabled:pointer-events-none disabled:opacity-50',
					'data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm',
					'cursor-pointer'
				)}
			>
				{item.label}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>

	{#each items as item (item.value)}
		<Tabs.Content
			value={item.value}
			class="mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
		>
			{item.content}
		</Tabs.Content>
	{/each}
</Tabs.Root>
