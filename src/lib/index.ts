// Foundation
export { cx } from './utils/merge-classes.js';
export { throwError, logError } from './utils/error.js';
export type {
	Size,
	Variant,
	AlertSeverity,
	ButtonType,
	Orientation,
	Align,
	SelectOption,
	RadioOption,
	AccordionItem,
	TabItem,
	MenuItem,
	TableColumn
} from './types.js';

// Button family
export { default as Button } from './components/button/Button.svelte';
export { default as ActionButton } from './components/button/ActionButton.svelte';
export { default as LinkButton } from './components/button/LinkButton.svelte';
export { default as IconButton } from './components/button/IconButton.svelte';

// Presentational
export { default as Card } from './components/card/Card.svelte';
export { default as Badge } from './components/badge/Badge.svelte';
export { default as Tag } from './components/tag/Tag.svelte';
export { default as Alert } from './components/alert/Alert.svelte';
export { default as Spinner } from './components/spinner/Spinner.svelte';
export { default as Skeleton } from './components/skeleton/Skeleton.svelte';

// Bits UI-backed: display
export { default as Divider } from './components/divider/Divider.svelte';
export { default as ProgressBar } from './components/progress-bar/ProgressBar.svelte';
export { default as Avatar } from './components/avatar/Avatar.svelte';

// Bits UI-backed: form
export { default as Label } from './components/label/Label.svelte';
export { default as Checkbox } from './components/checkbox/Checkbox.svelte';
export { default as RadioGroup } from './components/radio-group/RadioGroup.svelte';
export { default as Switch } from './components/switch/Switch.svelte';
export { default as Select } from './components/select/Select.svelte';

// Bits UI-backed: overlays
export { default as Dialog } from './components/dialog/Dialog.svelte';
export { default as Popover } from './components/popover/Popover.svelte';
export { default as Tooltip } from './components/tooltip/Tooltip.svelte';
export { default as Accordion } from './components/accordion/Accordion.svelte';
export { default as Tabs } from './components/tabs/Tabs.svelte';
export { default as Pagination } from './components/pagination/Pagination.svelte';
export { default as Menu } from './components/menu/Menu.svelte';

// Form inputs
export { default as Input } from './components/input/Input.svelte';
export { default as Textarea } from './components/textarea/Textarea.svelte';
export { default as Field } from './components/field/Field.svelte';

// Data
export { default as Table } from './components/table/Table.svelte';
