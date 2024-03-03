import type { ComponentType } from 'svelte';

export interface ChipI {
	label?: string;
	icon?: string;
	component?: ComponentType;
	action: () => void;
}
