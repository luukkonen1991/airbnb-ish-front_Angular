export interface LocationById {
	success: boolean;
	data: {
		_id: string;
		slug: string;
		title: string;
		description: string;
		address: string;
		costType: string;
		costAmount: number;
		animalTypes: string[];
		service: string[];
		photo?: string;
		createdAt: string;
	};
}
