<script setup lang="ts">
	import { UploadButton } from '@/uploadthing';
	import ProfilePictureComponent from '../profile/ProfilePictureComponent.vue';
	import useAuthStore from '@/stores/auth-store';
	const authStore = useAuthStore();

	const publishPost = () => {
		if (!authStore.getUser) return;
	};
</script>

<template>
	<form class="post-composer" @submit.prevent="publishPost">
		<div class="post-composer__input">
			<ProfilePictureComponent :src="authStore.getUser?.profilePicture" :fallback="authStore.getUser?.username" />
			<textarea name="post" id="post" cols="30" rows="3" placeholder="What's on your mind?"></textarea>
		</div>
		<UploadButton :config="{
				config: {
					mode: 'manual',
					appendOnPaste: true,
				},
				endpoint: 'videoAndImage',
				onClientUploadComplete: (file) => {
					console.log('uploaded', file);
					alert('Upload complete');
				},
				onUploadAborted: () => {
					alert('Upload Aborted');
				},
				onUploadError: (error) => {
					console.error(error, error.cause);
					alert('Upload failed');
				},
			}" />
		<button>Publier</button>
	</form>
</template>

<style scoped>
.post-composer {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	width: 50%;
	padding: 1rem;
	border-radius: 1rem;
	background-color: #fff;
	border: 1px solid #a5a5a5;
}

.post-composer__input {
	display: flex;
	gap: 1rem;
	width: 100%;
}

.post-composer__input textarea {
	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	resize: none;
	padding: 0.5rem;
	border-radius: 1rem;
	background-color: #f0f0f0;
}
</style>