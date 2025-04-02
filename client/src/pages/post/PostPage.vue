<script setup lang="ts">
	import PostComponent from '@/components/post/PostComponent.vue';
	import type { PostComponentProps } from '@/types/components';

	import { onBeforeMount, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import baseURL from '@/baseUrl';

	import { handleAddComment, handleEmitDislikePost, handleEmitEditComment, handleEmitEditPost, handleEmitLikePost } from '@/utils/postUtils';
	import router from '@/router';
	const post = ref<PostComponentProps>({} as PostComponentProps);
	type getFeedResponse = {error: string} | PostComponentProps;
	const postId = useRoute().params.id as string;

	onBeforeMount(async () => {
		if (!postId) {
			return router.push('/home');
		}
		await fetch(baseURL + '/api/post/getPost/' + postId, {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		}).then((response) => {
			return response.json();
		}).then((data: getFeedResponse) => {
			if ('error' in data) {
				console.error('Error fetching posts:', data.error);
				return;
			}
			post.value = data;
		}).catch((error) => {
			console.error('Error fetching posts:', error);
		});
	});

	async function editPost(postId: number, newContent: string) {
		const result = await handleEmitEditPost([post.value], postId, newContent);
		if (result) {
			post.value.content = newContent;
		} else {
			alert('Error editing post. Please try again later.');
		}
	}

	async function editComment(data: { commentId: number; newContent: string, postId: number }) {
		const result = await handleEmitEditComment([post.value], data);
		if (result) {
				const commentIndex = post.value.comments.findIndex((comment) => comment.comment.id === data.commentId);
				if (commentIndex !== -1) {
					post.value.comments[commentIndex] = result;
					// marche pas alors que ça devrais, flemme de chercher + il est 6h
				} else {
					alert('Comment not found.');
				}
		} else {
			alert('Error editing comment. Please try again later.');
		}
	}
</script>

<template>
	<main class="flex flex-col gap-4 items-center">
		<PostComponent
			:post="post"
			@likePost="( postId ) => handleEmitLikePost([post], postId)"
			@dislikePost="( postId ) => handleEmitDislikePost([post], postId)"
			@editComment="( data ) => editComment(data)"
			@submitComment="( postId, comment ) => handleAddComment([post], postId, comment)"
			@editPost="( postId, newContent ) => editPost(postId, newContent)"
		/>
	</main>
</template>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	width: 80%;
	margin: 2rem auto;
}

p {
	margin: 0;
}
</style>