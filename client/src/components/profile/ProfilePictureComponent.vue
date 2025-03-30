<script setup lang="ts">
	import { defineProps } from 'vue';
	interface ProfilePictureComponent {
		src?: string;
		fallback: string;
	}

	const props = defineProps<ProfilePictureComponent>();
	const { src, fallback } = props;
</script>

<template>
	<img v-if="src" class="profile_picture" :src="src" alt="Profile Picture" />
	<div v-else class="profile_picture">
		{{ fallback ? fallback.slice(0, 1).toUpperCase() : '?' }}
	</div>
</template>

<style scoped>
	.profile_picture {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid #e4e4e7;
		align-content: center;
		text-align: center;
	}
</style>