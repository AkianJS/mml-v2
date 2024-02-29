import NavigationSearch from '../search-bar/NavigationSearch.svelte';
import type { NavbarItemI } from './navbar.interface';

export function populateNavbarItemI(): NavbarItemI[] {
	const navbarItems: NavbarItemI[] = [
		{
			label: 'Home',
			link: '/',
			position: 'left',
			order: 0,
			type: 'normal'
		},
		{
			label: 'Genre',
			position: 'left',
			order: 1,
			type: 'component'
		},
		{
			label: 'Trending',
			link: '/trending',
			position: 'left',
			order: 2,
			type: 'normal'
		},
		{
			label: 'Coming Soon',
			link: '/coming-soon',
			position: 'left',
			order: 3,
			type: 'normal'
		},
		{
			label: 'Top Rated',
			link: '/top-rated',
			position: 'left',
			order: 4,
			type: 'normal'
		},
		{
			position: 'right',
			order: 0,
			type: 'component',
			component: NavigationSearch
		},
		{
			icon: 'basil:notification-outline',
			link: '/login',
			position: 'right',
			order: 1,
			type: 'normal'
		},
		{
			icon: 'basil:bookmark-outline',
			link: '/favourite',
			position: 'right',
			order: 2,
			type: 'normal'
		}
	];

	return navbarItems.toSorted((a, b) => a.order - b.order);
}
