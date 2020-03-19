export interface ContactMessage {
	success: boolean;
	data: {
		name: string;
		email: any;
		phone?: any;
		message: string;
	}
}