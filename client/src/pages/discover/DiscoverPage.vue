<script setup lang="ts">
	import { ref, onBeforeMount } from "vue";
	import type { PostComponentProps } from "@/types/components";
	import PostGalleryComponent from "@/components/post/PostGalleryComponent.vue";
	import baseURL from "@/baseUrl";
import { handleAddComment, handleEmitDislikePost, handleEmitEditComment, handleEmitEditPost, handleEmitLikePost } from "@/utils/postUtils";

	const posts = ref<PostComponentProps[]>([]);

	async function fetchData() {
		const fetchedPosts: {
			error: string;
			posts: PostComponentProps[];
		} = await fetch(baseURL+'/api/post/getPosts/', {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		}).then((response) => response.json())

		if (fetchedPosts.error) {
			console.error('Error fetching posts:', fetchedPosts.error);
			return;
		}

		posts.value = fetchedPosts.posts;
	}

	onBeforeMount(fetchData);

	async function editPost(postId: number, newContent: string) {
		const result = await handleEmitEditPost(posts.value, postId, newContent);
		console.log('result', result);
		if (result) {
			const postIndex = posts.value.findIndex((post) => post.id === postId);
			if (postIndex !== -1) {
				posts.value[postIndex].content = newContent;
			}
		} else {
			alert('Error editing post. Please try again later.');
		}
	}

	async function editComment(data: { commentId: number; newContent: string, postId: number }) {
		const result = await handleEmitEditComment(posts.value, data);
		if (result) {
			const postIndex = posts.value.findIndex((post) => post.id === data.postId);
			if (postIndex !== -1) {
				const commentIndex = posts.value[postIndex].comments.findIndex((comment) => comment.comment.id === data.commentId);
				if (commentIndex !== -1) {
					posts.value[postIndex].comments[commentIndex] = result;
					// marche pas alors que ça devrais, flemme de chercher + il est 6h
				} else {
					alert('Comment not found.');
				}
			}
		} else {
			alert('Error editing comment. Please try again later.');
		}
	}
</script>

<template>
	<main>
		<PostGalleryComponent
			v-if="posts.length > 0" :posts="posts.filter(post => post.images.length > 0)"
			@likePost="(postId) => handleEmitLikePost(posts, postId)"
			@dislikePost="(postId) => handleEmitDislikePost(posts, postId)"
			@submitComment="(postId, comment) => handleAddComment(posts, postId, comment)"
			@editComment="editComment"
			@editPost="editPost"
		/>
		<p v-else>No posts available.</p>
	</main>
</template>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin: 2rem auto;
		width: 70%;
	}
	p {
		font-size: 1.5rem;
		color: var(--text-color);
	}

</style>