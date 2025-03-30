import type { serverPost } from "@/types/apiResponses";
import type { PostComponentProps } from "@/types/components";

export default function sanitizePosts(posts: serverPost[]) : PostComponentProps[] {
	console.log(posts[0]);

	return posts.map((post) => ({
		id: post.id,
		content: post.description,
		image: post.media.length > 0 ? post.media[0].media_url : '',
		liked: post.liked,
		username: post.displayname,
		profilePicture: post.profile_picture,
		likes: post.likes,
		createdAt: post.created_at,
		comments: post.comments.map((comment) => ({
			id: comment.id,
			content: comment.comment,
			username: comment.displayname,
			profilePicture: comment.profile_picture,
			createdAt: comment.created_at,
		})),
	}));
}