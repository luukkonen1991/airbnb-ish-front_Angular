import { Location } from '../models/Location';

export interface Data {
	total: number;
	success: boolean;
	count: number;
	pagination: object;
	data: Location[];
}
