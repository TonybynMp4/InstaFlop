type serverComment = {
	id: number;
	comment: string;
	displayname: string;
	profile_picture: string;
	post_id: number;
	user_id: number;
	created_at: string;
}

type serverMedia = {
	id: number;
	media_url: string;
	post_id: number;
	user_id: number;
	createdAt: string;
	created_at: string;
}

type serverPost = {
	id: number;
	user_id: number;
	description: string;
	created_at: string;
	username: string;
	displayname: string;
	profile_picture?: string;
	liked: boolean;
	medias: serverMedia[];
	likes: number;
	comments: serverComment[];
}

export type {
	serverComment,
	serverMedia,
	serverPost
}