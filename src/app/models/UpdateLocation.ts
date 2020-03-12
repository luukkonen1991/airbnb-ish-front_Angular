export interface UpdateLocation {
	_id?: string;
	photo?: string;
	title?: string;
	description?: string;
	address?: string;
	costType?: string;
	costAmount?: number;
	animalTypes?: string[];
	services?: string[];
	phone?: string;
	email?: string;
	user: string;
}
