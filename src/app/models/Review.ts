export interface Review {
	success?: boolean;
	_id?: string;
	title: string;
	text: string;
	rating: number;
	createdAt?: string;
	user?: string;
	location?: string;
}
