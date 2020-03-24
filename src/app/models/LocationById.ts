import { Coordinates } from './Coordinates';

export interface LocationById {
	success: boolean;
	count: number;
	data: {
		location: Coordinates;
		_id: string;
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
		user: string;
		phone: string;
		email: string;
		averageRating?: number;
	};
}
