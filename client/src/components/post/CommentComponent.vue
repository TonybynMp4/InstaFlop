<script setup lang="ts">
	import { defineProps } from 'vue';
	import type { CommentComponent } from '@/types';
	import Username from '@/components/profile/UsernameComponent.vue';

	const props = defineProps<CommentComponent>();

	const { username } = props;
</script>

<template>
	<article class="post_comment">
		<p>
			<Username :username="username" />
			{{ content }}
		</p>
	</article>
</template>

<style scoped>
	.post_comment {
        display: flex;
        gap: 1rem;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid #bbb;
        padding-block: 0.5rem;
        padding-inline: 0.5rem;
    }

	.post_comment p {
		margin: 0;
		overflow: hidden;
	}
</style>