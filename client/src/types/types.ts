interface User {
	id: number;
    username: string;
	displayname: string;
    email: string;
    role: string;
	profilePicture: string;
}

interface ProfileUser extends User {
	bio: string;
	followers: number;
	following: number;
}

interface Comment {
	user: {
		username: string;
		displayname: string;
		profilePicture: string | null;
	};
	comment: {
		id: number;
		postId: number;
		userId: number;
		content: string;
		createdAt: string;
	};
}

export type {
    User,
	Comment
}