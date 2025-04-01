import type { serverPost } from "@/types/apiResponses";
import type { PostComponentProps } from "@/types/components";

export default function sanitizePosts(posts: serverPost[]) : PostComponentProps[] {
	return posts.map((post) => ({
		id: post.id,
		content: post.description,
		images: post.medias.map((image) => image.media_url),
		user: {
			username: post.username,
			displayname: post.displayname,
			profilePicture: post.profile_picture,
		},
		liked: post.liked,
		likes: post.likes,
		createdAt: post.created_at,
		comments: post.comments
	}));
}