<script lang="ts">
	import { Accordion } from 'bits-ui';
	import type { AccordionItem } from '$lib/types.js';
	import { cx } from '$lib/utils/merge-classes.js';

	interface SingleProps {
		type?: 'single';
		value?: string;
		onValueChange?: (value: string) => void;
	}

	interface MultipleProps {
		type: 'multiple';
		value?: string[];
		onValueChange?: (value: string[]) => void;
	}

	type Props = (SingleProps | MultipleProps) & {
		items: AccordionItem[];
		disabled?: boolean;
		class?: string;
	};

	let {
		items,
		type = 'single',
		value = $bindable(type === 'multiple' ? ([] as string[]) : ''),
		disabled = false,
		class: className,
		onValueChange
	}: Props = $props();

	const sharedContentClass = $derived(
		cx('w-full divide-y divide-neutral-200 rounded-md border border-neutral-200', className)
	);

	const triggerClass =
		'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium ' +
		'text-neutral-800 hover:bg-neutral-50 transition-colors duration-150 ' +
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ' +
		'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ' +
		'data-[state=open]:bg-neutral-50';

	const contentClass =
		'overflow-hidden text-sm text-neutral-600 ' +
		'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down';
</script>

{#if type === 'multiple'}
	<Accordion.Root
		type="multiple"
		value={value as string[]}
		onValueChange={(v) => {
			(value as string[]) = v;
			(onValueChange as ((val: string[]) => void) | undefined)?.(v);
		}}
		{disabled}
		class={sharedContentClass}
	>
		{#each items as item (item.value)}
			<Accordion.Item value={item.value} disabled={item.disabled} class="overflow-hidden">
				<Accordion.Header level={3}>
					<Accordion.Trigger class={triggerClass}>
						{item.title}
						<svg
							aria-hidden="true"
							class="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 data-[state=open]:rotate-180"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content class={contentClass}>
					<div class="px-4 pb-4 pt-2">{item.content}</div>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{:else}
	<Accordion.Root
		type="single"
		value={value as string}
		onValueChange={(v) => {
			(value as string) = v;
			(onValueChange as ((val: string) => void) | undefined)?.(v);
		}}
		{disabled}
		class={sharedContentClass}
	>
		{#each items as item (item.value)}
			<Accordion.Item value={item.value} disabled={item.disabled} class="overflow-hidden">
				<Accordion.Header level={3}>
					<Accordion.Trigger class={triggerClass}>
						{item.title}
						<svg
							aria-hidden="true"
							class="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 data-[state=open]:rotate-180"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content class={contentClass}>
					<div class="px-4 pb-4 pt-2">{item.content}</div>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{/if}
