import type { ComponentType } from 'svelte';

export interface NavbarItemI {
	label?: string;
	icon?: string;
	link?: string;
	action?: () => void;
	component?: ComponentType;
	order: number;
	position?: Position;
	type: 'normal' | 'component';
}

type Position = 'left' | 'center' | 'right';
