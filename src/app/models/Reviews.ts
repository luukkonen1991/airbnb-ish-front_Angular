import { Review } from './Review';

export interface Reviews {
	success: boolean;
	count?: number;
	data: Review[];
}
