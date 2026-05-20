<script lang="ts">
	import { Progress } from 'bits-ui';
	import { cx } from '$lib/utils/merge-classes.js';

	interface Props {
		value?: number | null;
		max?: number;
		min?: number;
		label?: string;
		class?: string;
	}

	const { value = 0, max = 100, min = 0, label, class: className }: Props = $props();

	const percentage = $derived(
		value === null ? null : Math.round(((value - min) / (max - min)) * 100)
	);

	const trackClasses = $derived(
		cx('relative h-2 w-full overflow-hidden rounded-full bg-neutral-200', className)
	);
</script>

<div class="w-full">
	{#if label}
		<div class="mb-1 flex items-center justify-between">
			<span class="text-sm font-medium text-neutral-700">{label}</span>
			{#if percentage !== null}
				<span class="text-sm text-neutral-500">{percentage}%</span>
			{/if}
		</div>
	{/if}

	<Progress.Root {value} {max} {min} class={trackClasses}>
		<div
			class="h-full rounded-full bg-blue-600 transition-[width] duration-300 ease-in-out"
			style:width={percentage !== null ? `${percentage}%` : '33%'}
			class:animate-pulse={value === null}
		></div>
	</Progress.Root>
</div>
