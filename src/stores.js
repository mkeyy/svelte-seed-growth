import {writable} from 'svelte/store';

export const size = writable({x: 50, y: 25});
export const points = writable([]);
export const seeds = writable([]);