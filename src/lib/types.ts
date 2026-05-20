export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant =
	| 'default'
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'ghost'
	| 'outline';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

export type ButtonType = 'button' | 'submit' | 'reset';

export type Orientation = 'horizontal' | 'vertical';

export type Align = 'left' | 'center' | 'right';

export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface RadioOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface AccordionItem {
	value: string;
	title: string;
	content: string;
	disabled?: boolean;
}

export interface TabItem {
	value: string;
	label: string;
	content: string;
	disabled?: boolean;
}

export type MenuItem =
	| { separator: true }
	| {
			separator?: false;
			label: string;
			action?: () => void | Promise<void>;
			disabled?: boolean;
	  };

export interface TableColumn<T = Record<string, unknown>> {
	key: keyof T & string;
	label: string;
	align?: Align;
}
