<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from 'bits-ui';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
		trigger?: Snippet;
		footer?: Snippet;
		children?: Snippet;
		class?: string;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		open = $bindable(false),
		title,
		description,
		trigger,
		footer,
		children,
		class: className,
		onOpenChange
	}: Props = $props();
</script>

<Dialog.Root
	open={open}
	onOpenChange={(v) => {
		open = v;
		onOpenChange?.(v);
	}}
>
	{#if trigger}
		<Dialog.Trigger>
			{#snippet child({ props })}
				<span {...props} style="display: contents">
					{@render trigger()}
				</span>
			{/snippet}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm
				   data-[state=open]:animate-in data-[state=closed]:animate-out
				   data-open:animate-in data-closed:animate-out
				   data-closed:fade-out-0 data-open:fade-in-0"
		/>
		<Dialog.Content
			class={cx(
				'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
				'rounded-lg border border-neutral-200 bg-white shadow-xl',
				'focus:outline-none',
				className
			)}
		>
			{#if title || description}
				<div class="border-b border-neutral-200 px-6 py-4">
					{#if title}
						<Dialog.Title class="text-lg font-semibold text-neutral-900">{title}</Dialog.Title>
					{/if}
					{#if description}
						<Dialog.Description class="mt-1 text-sm text-neutral-500"
							>{description}</Dialog.Description
						>
					{/if}
				</div>
			{/if}

			{#if children}
				<div class="px-6 py-4">
					{@render children()}
				</div>
			{/if}

			{#if footer}
				<div class="flex items-center justify-end gap-2 border-t border-neutral-200 px-6 py-4">
					{@render footer()}
				</div>
			{/if}

			<Dialog.Close
				class="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-md
					   text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100
					   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
					   transition-colors duration-100 cursor-pointer"
				aria-label="Close dialog"
			>
				<svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
					<path
						d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z"
					/>
				</svg>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
