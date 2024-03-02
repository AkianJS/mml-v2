import { gsap } from 'gsap';
import { Flip } from 'gsap/dist/Flip';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(Flip);
}

export * from 'gsap';
export { Flip, ScrollTrigger };
