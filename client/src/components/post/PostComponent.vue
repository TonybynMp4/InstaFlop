<script setup lang="ts">
	import ProfilePicture from '@/components/profile/ProfilePictureComponent.vue';
	import Username from '@/components/profile/UsernameComponent.vue';
	import type { PostComponentProps } from '@/types/components';
	import { EllipsisVertical, Heart, Share } from 'lucide-vue-next';
	import { ref } from 'vue';
	import CommentSection from './CommentSectionComponent.vue';
	import useAuthStore from '@/stores/auth-store';
	const authStore = useAuthStore();

	const props = defineProps<{
		post: PostComponentProps;
	}>();

	const playLikeAnimation = ref(false);
	const likePost = () => {
		const post = props.post;
		if (!post) return;
		post.liked = !post.liked;
		post.likes += post.liked ? 1 : -1;

		if (post.liked) {
			playLikeAnimation.value = true;
			setTimeout(() => {
				playLikeAnimation.value = false;
			}, 500);
		}
	};

	const addComment = (commentContent: string) => {
		if (!props.post) return;
		if (!authStore.getUser) return;
		console.log('Comment submitted:', commentContent);
	};

	const sharePost = () => {
		if (!props.post) return;
		const postUrl = `${window.location.origin}/post/${props.post.id}`;
		navigator.share({
			title: props.post.content,
			url: postUrl
		}).catch((error) => console.error('Error sharing:', error));
	};

</script>

<template>
	<article class="post">
		<div class="post_main">
			<div style="position: relative;" v-if="props.post.images && props.post.images.length > 0">
				<img class="post_image" :src="props.post.images[0]" alt="image" /> <!-- TODO: gallery component -->
				<Heart class="heartBurst toggleHeartBurst" v-if="playLikeAnimation" />
			</div>
			<div class="post_details">
				<div class="post_details_upper">
					<div class="post_user">
						<ProfilePicture :src="props.post.user.profilePicture" :fallback="props.post.user.username" />
						<Username :username="props.post.user.username" :displayname="props.post.user.displayname" />
					</div>
					<div class="post_actions">
						<div class="post_like">
							<Heart class="post_action" :class="{ 'liked': props.post.liked }" @click="likePost()" />
							<span>{{ props.post.likes }}</span>
						</div>
						<Share class="post_action" @click="sharePost()"/>
						<EllipsisVertical class="post_action" />
					</div>
				</div>
				<p>{{ props.post.content }}</p>
			</div>
		</div>
		<CommentSection :comments="props.post.comments" @submitComment="addComment" />
	</article>
</template>

<style scoped>
	.post {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		border: 1px solid #a5a5a5;
		border-radius: 1rem;
		width: 100%;
		max-height: 50rem;
	}

	.post_like {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		cursor: pointer;
	}

	.post_user {
		display: flex;
		gap: 1rem;
		align-items: center;
		width: 100%;
	}

	.post_user_info {
		display: flex;
		gap: 1rem;
		align-items: center;
		width: 100%;
	}

	#post-form {
		width: 100%;
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-direction: column;
	}

	.post_main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-items: flex-start;
		width: 70%;
	}

	.post_aside {
		width: 30%;
	}

	.post_image {
		background-color: black;
		width: 100%;
		align-self: center;
		height: fit-content;
		max-height: 40rem;
		height: auto;
		border-radius: 1rem 0 0 0;
		position: relative;
		object-fit: contain;
	}

	.post_details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		width: 100%;
	}
	.post_actions {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.post_action {
		cursor: pointer;
		color: black;
	}

	.liked {
		fill: red;
	}

	.post_action:hover {
		color: #4e4e4e;
	}

	.post_details_upper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	@keyframes heart-burst {
		0% {
			opacity: 0;
			transform: scale(0) translate(-50%, -50%);
		}
		15% {
			opacity: 0.9;
			transform: scale(1.2) translate(-50%, -50%);
		}
		30% {
			opacity: 0.8;
			transform: scale(0.9) translate(-50%, -50%);
		}
		45% {
			opacity: 0.7;
			transform: scale(1) translate(-50%, -50%);
		}
		60% {
			opacity: 0.6;
			transform: scale(0.95) translate(-50%, -50%);
		}
		100% {
			opacity: 0;
			transform: scale(2) translate(-50%, -50%);
		}
	}

	.heartBurst {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100px;
		height: 100px;
		fill: red;
		stroke: red;
		transform: translate(-50%, -50%);
	}

	.toggleHeartBurst {
		display: block;
		animation: heart-burst 0.5s ease forwards;
	}
</style>