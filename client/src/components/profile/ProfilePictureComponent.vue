<script setup lang="ts">
	import { defineProps } from 'vue';
	interface ProfilePictureComponent {
		src: string;
	}

	const props = defineProps<ProfilePictureComponent>();
	const { src } = props;
</script>

<template>
	<img class="profile_picture" :src="src" alt="Profile Picture" />
</template>

<style scoped>
	.profile_picture {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid #ffffff;
	}
</style>