import { Pagination } from '../models/Pagination';
import { Location } from '../models/Location';

export interface Locations {
	success: boolean;
	total: number;
	count: number;
	pagination: Pagination;
	data: Location[];
}
