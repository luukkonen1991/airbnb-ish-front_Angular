export interface User {
	success: boolean;
	data: {
		_id?: string;
		role: string;
		name: string;
		email: string;
		password: string;
		createdAt?: string;
	};
}
