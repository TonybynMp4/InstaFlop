interface User {
	id: number;
    username: string;
    email: string;
    role: string;
	profilePicture: string;
}

interface Comment {
	id: number;
	username: string;
	profilePicture: string;
	content: string;
	createdAt: string;
}

export type {
    User,
	Comment
}