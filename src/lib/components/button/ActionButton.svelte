<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Size, Variant, ButtonType } from '$lib/types.js';
	import { throwError, logError } from '$lib/utils/error.js';
	import Button from './Button.svelte';

	interface Props {
		action: () => void | Promise<void>;
		variant?: Variant;
		size?: Size;
		loading?: boolean;
		disabled?: boolean;
		type?: ButtonType;
		class?: string;
		onerror?: (error: unknown) => void;
		children?: Snippet;
		[key: string]: unknown;
	}

	const {
		action,
		variant,
		size,
		loading = false,
		disabled,
		type,
		class: className,
		onerror,
		children,
		...rest
	}: Props = $props();

	$effect(() => {
		if (typeof action !== 'function') {
			throwError('ActionButton', 'init', `'action' prop must be a function, received ${typeof action}`);
		}
	});

	let pending = $state(false);

	async function handleClick() {
		if (pending) return;
		pending = true;
		try {
			await action();
		} catch (error) {
			logError('ActionButton', 'handleClick', String(error));
			onerror?.(error);
		} finally {
			pending = false;
		}
	}
</script>

<Button
	{variant}
	{size}
	loading={loading || pending}
	{disabled}
	{type}
	class={className}
	onclick={handleClick}
	{...rest}
>
	{@render children?.()}
</Button>
