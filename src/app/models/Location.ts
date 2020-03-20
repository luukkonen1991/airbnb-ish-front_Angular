import { Coordinates } from './Coordinates';

export interface Location {
	_id: string;
	location: Coordinates;
	slug: string;
	title: string;
	description: string;
	address: string;
	costType: string;
	costAmount: number;
	animalTypes: string[];
	services: string[];
	photo?: string;
	createdAt: string;
}
