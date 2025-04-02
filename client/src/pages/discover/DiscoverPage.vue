<script setup lang="ts">
	import { ref, onBeforeMount } from "vue";
	import type { PostComponentProps } from "@/types/components";
	import PostGalleryComponent from "@/components/post/PostGalleryComponent.vue";
	import baseURL from "@/baseUrl";
	import { handleAddComment, handleEmitDislikePost, handleEmitEditComment, handleEmitEditPost, handleEmitLikePost } from "@/utils/postUtils";
import ProfilePictureComponent from "@/components/profile/ProfilePictureComponent.vue";

	const posts = ref<PostComponentProps[]>([]);

	async function fetchData() {
		const fetchedPosts: {
			error: string;
			posts: PostComponentProps[];
		} = await fetch(baseURL + '/api/post/getPosts/', {
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

	type fetchedUser = {
		id: number;
		username: string;
		displayname: string;
		profile_picture: string;
	}
	const fetchedUsers = ref<fetchedUser[]>([]);
	async function fetchUsers(event: Event) {
		const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
		if (!searchTerm || searchTerm.length < 3) {
			fetchedUsers.value = [];
			return;
		}

		const {
			error,
			users
		}: {
			error: string;
			users: {
				id: number;
				username: string;
				displayname: string;
				profile_picture: string;
			}[];
		} = await fetch(baseURL + '/api/user/searchUsers/' + searchTerm, {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		}).then((response) => response.json());

		if (error) {
			alert('Error fetching users: ' + error);
			console.error('Error fetching users:', error);
			return;
		}

		fetchedUsers.value = users;
	}

</script>

<template>
	<main>
		<h2>Posts récents:</h2>
		<div class="search-bar">
			<input type="text" placeholder="Search profiles..." @input="fetchUsers" />
			<div v-if="fetchedUsers.length > 0" class="search-results">
				<ul>
					<li v-for="user in fetchedUsers"
						:key="user.id">
						<router-link class="search-result" :to="`/profile/${user.username}`">
							<ProfilePictureComponent :src="user.profile_picture" :fallback="user.username" />
							<p>{{ user.displayname }}</p>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
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

	.search-bar {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 1rem;
	}

	.search-results {
		position: absolute;
		top: 125%;
		width: 40%;
		background-color: white;
		max-height: 16rem;
		border-radius: 0.25rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		z-index: 1;
		overflow-y: auto;
	}

	.search-result{
		display: flex;
		gap: 1rem;
		font-size: 1rem;
		list-style-type: none;
		padding: 0.25rem 1rem;
		border-bottom: 1px solid #a5a5a5;
	}

	.search-result:hover {
		background-color: #f0f0f0;
		cursor: pointer;
	}

	.search-result img, .search-result div {
		font-size: 0.75rem;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
	}

	.search-result p {
		margin: 0;
		font-size: 1rem;
	}

	.search-bar input {
		width: 50%;
		background-color: white;
		border: 1px solid #a5a5a5;
		border-radius: 0.25rem;
		padding: 0.25rem;
		font-size: small;
		max-height: 8em;
		min-height: 2em;
		resize: vertical;
	}

</style>