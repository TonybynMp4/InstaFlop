<script setup lang="ts">
	import type { PostComponentProps } from '@/types/components';
	import { ref, useTemplateRef } from 'vue';
	import PostGalleryItemComponent from './PostGalleryItemComponent.vue';
	import { handleAddComment, handleEmitDislikePost, handleEmitEditComment, handleEmitEditPost, handleEmitLikePost } from '@/utils/postUtils';
	import { ExternalLinkIcon, XIcon } from 'lucide-vue-next';
	import PostComponent from './PostComponent.vue';
	import router from '@/router';
	import { watch } from 'vue';
	import { useRoute } from 'vue-router';
	const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef');
	function openDialog (postId: number) {
		dialogRef.value?.showModal();
		dialogPostId.value = postId;
	}
	function closeDialog() {
		dialogRef.value?.close();
	}
	const dialogPostId = ref<number | null>(null);

	defineProps<{
		posts: PostComponentProps[];
	}>();

	const Route = useRoute();
	watch(() => Route, () => {
		closeDialog();
	}, { immediate: true, deep: true });
</script>

<template>
	<section class="gallery">
		<PostGalleryItemComponent
			v-for="post in posts"
			:key="post.id"
			:post="post"
			@openPost="openDialog"
		/>
		<dialog ref="dialogRef" class="dialog" @click.self="closeDialog">
			<div class="dialogActions">
				<ExternalLinkIcon @click="router.push(`/post/${dialogPostId}`)" />
				<XIcon
					class="closeDialog"
					@click="closeDialog"
				/>
			</div>
			<div class="dialogContent">
				<PostComponent
				v-if="dialogPostId"
				:post="posts.find((post) => post.id === dialogPostId) ?? posts[0]"
				@likePost="(postId) => handleEmitLikePost(posts, postId)"
				@dislikePost="(postId) => handleEmitDislikePost(posts, postId)"
				@submitComment="(postId, comment) => handleAddComment(posts, postId, comment)"
				@editComment="(data) => handleEmitEditComment(posts, data)"
				@editPost="(postId, newContent) => handleEmitEditPost(posts, postId, newContent)"
				/>
			</div>
		</dialog>
	</section>
</template>

<style scoped>
	.gallery {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content:space-between;
	}

	.dialog {
		width: 80%;
		height: 90%;
		background-color: transparent;
	}

	.dialogActions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		align-items: center;
	}

	.dialogActions svg {
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		color: #000;
	}

	.dialogActions svg:hover {
		color: white;
	}

	.closeDialog {
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		color: red;
	}

	.dialogContent {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		height: 40%;
	}
</style>