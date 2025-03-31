<script setup lang="ts">
	import { UploadButton } from '@/uploadthing';
	import ProfilePictureComponent from '../profile/ProfilePictureComponent.vue';
	import useAuthStore from '@/stores/auth-store';
	import { ref } from 'vue';
	import baseURL from '@/baseUrl';
	import { XIcon } from 'lucide-vue-next';
	const authStore = useAuthStore();

	const mediaUrls = ref<string[]>([]);
	const isUploading = ref(false);

	const emit = defineEmits(['postPublished']);

	const publishPost = (data: Event) => {
		if (!authStore.getUser) return;
		if (isUploading.value) {
			return;
		}
		const requestBody = JSON.stringify({
			content: (data.target as HTMLFormElement).post.value,
			mediaUrls: mediaUrls.value,
		});


		fetch(baseURL + '/api/post', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: requestBody,
		})
		.then(response => {
			if (!response.ok) throw new Error('Network response was not ok');
			return response.json();
		})
		.then(post => {
			alert('Post publié avec succès !');
			emit('postPublished', post);
		})
		.catch(error => {
			console.error('Error publishing post:', error);
			alert('Error publishing post. Please try again later.');
		});
		mediaUrls.value = []; // Clear media URLs after publishing

		(data.target as HTMLFormElement).reset(); // Reset the form
	};

	function alert(message: string) {
		window.alert(message);
	}
</script>

<template>
	<form class="post-composer" @submit.prevent="publishPost">
		<div class="post-composer__input">
			<ProfilePictureComponent :src="authStore.getUser?.profilePicture" :fallback="authStore.getUser?.username || '?'" />
			<textarea name="post" id="post" cols="30" rows="3" placeholder="What's on your mind?"></textarea>
		</div>
		<div class="post-composer__media-preview">
			<div v-for="url in mediaUrls" class="relative">
				<img :src="url" :key="url" alt="Uploaded media"
					style="max-width: 100px; max-height: 100px;" />
				<XIcon @click="mediaUrls = mediaUrls.filter(mediaUrl => mediaUrl !== url)"
					style="cursor: pointer; color: red; height: 100%; width: 100%;" class="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2" />
			</div>
		</div>
		<UploadButton :config="{
			headers: {
				credentials: 'include',
			},
			endpoint: 'videoAndImage',
			onClientUploadComplete: (files) => {
				files.forEach(file => mediaUrls.push(file.ufsUrl));
				isUploading = false;
			},
			onBeforeUploadBegin: (file) => {
				isUploading = true;
				return file
			},
			onUploadAborted: () => {
				alert('Upload Aborted');
			},
			onUploadError: (error) => {
				console.error(error, error.cause);
				alert('Upload failed');
			},
		}" />
		<div class="flex gap-2 ml-auto">
			<button type="reset" @click="mediaUrls = []" class="bg-red-500 h-10 text-white rounded-md px-4 py-2">Reinitialiser</button>
			<button class="h-10" :disabled="isUploading">Publier</button>
		</div>
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

.post-composer__media-preview {
	display: flex;
	gap: 1rem;
	width: 100%;
	overflow-x: auto;
}
</style>