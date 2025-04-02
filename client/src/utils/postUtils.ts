import baseURL from "@/baseUrl";
import useAuthStore from "@/stores/auth-store";
import type { Comment } from "@/types/types";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();

async function likePost(postId: number) {
	if (!postId) return;
	if (!authStore.getUser) return router.push('/login');

	const APIResponse: {
		liked: boolean;
		error?: string;
	} = await fetch(baseURL + '/api/like', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			postId: postId
		})
	}).then((res) => res.json());

	if (!APIResponse) {
		alert('Error liking post. Please try again later.');
		return;
	}

	if ('error' in APIResponse) {
		console.error(APIResponse.error);
		alert(APIResponse.error);
		return;
	}

	return APIResponse.liked;
}

async function dislikePost(postId: number) {
	if (!postId) return;
	if (!authStore.getUser) return router.push('/login');

	const APIResponse: {
		disliked: boolean;
		error?: string;
	} | null = await fetch(baseURL + '/api/like', {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			postId: postId
		})
	}).then((res) => res.json());

	if (!APIResponse) {
		alert('Error liking post. Please try again later.');
		return;
	}

	if ('error' in APIResponse) {
		console.error(APIResponse.error);
		alert(APIResponse.error);
		return;
	}

	return APIResponse.disliked;
}

async function createComment(postId: number, commentContent: string) {
	if (!authStore.getUser) {
		router.push('/login');
		return null;
	}
	if (!commentContent || !postId) return null;

	const APIResponse: {
		comment: Comment;
		error?: string;
	} = await fetch(baseURL+'/api/comment', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			postId: postId,
			content: commentContent
		})
	}).then((res) => res.json());

	if (!APIResponse) {
		alert('Error adding comment. Please try again later.');
		return null;
	}

	if ('error' in APIResponse) {
		console.error(APIResponse.error);
		alert(APIResponse.error);
		return null;
	}

	return APIResponse.comment;
};

async function editComment(commentId: number, newContent: string) {
	if (!authStore.getUser) {
		router.push('/login');
		return null;
	}
	if (!newContent) return null;

	const APIResponse: {
		comment: Comment;
		error?: string;
	} = await fetch(baseURL+'/api/comment/', {
		method: 'PUT',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			commentId: commentId,
			content: newContent,
		}),
	}).then((res) => res.json());

	if (!APIResponse) {
		alert('Error editing comment. Please try again later.');
		return null;
	}

	if ('error' in APIResponse) {
		console.error(APIResponse.error);
		alert(APIResponse.error);
		return null;
	}

	return APIResponse.comment;
}

async function deleteComment(commentId: number) {
	if (!authStore.getUser) {
		router.push('/login');
		return null;
	}

	if (!commentId) return null;

	const APIResponse: {
		deleted: boolean;
		error?: string;
	} = await fetch(baseURL + '/api/comment/' + commentId, {
		method: 'DELETE',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());

	if (!APIResponse) {
		alert('Error deleting comment. Please try again later.');
		return null;
	}

	if ('error' in APIResponse) {
		console.error(APIResponse.error);
		alert(APIResponse.error);
		return null;
	}

	return APIResponse.deleted;
}


export { likePost, dislikePost, createComment, editComment, deleteComment };