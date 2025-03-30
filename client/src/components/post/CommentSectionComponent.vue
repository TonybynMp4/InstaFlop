<script setup lang="ts">
	import { defineProps } from 'vue';
	import type { Comment } from '@/types';
	import CommentComponent from './CommentComponent.vue';

	const props = defineProps<{
		comments: Comment[];
	}>();

	const emit = defineEmits(['submitComment']);

	const onSubmit = (event: Event) => {
		event.preventDefault();
		const commentInput = (event.target as HTMLFormElement).comment.value;
		if (!commentInput) return;
		if (commentInput.length > 200) {
			alert('Le commentaire ne doit pas dépasser 200 caractères.');
			return;
		}

		emit('submitComment', commentInput);
		(event.target as HTMLFormElement).reset();
	};
</script>

<template>
	<div class="post_aside">
		<p>Commentaires</p>
		<div class="post_comment_section">
			<CommentComponent v-for="comment in props.comments" :comment="comment" :key="comment.id" />
		</div>
		<form v-on:submit="onSubmit" class="post_comment_form">
			<textarea name="comment" id="comment" cols="30" rows="1" placeholder="Laisser un commentaire.."></textarea>
			<button type="submit">Commenter</button>
		</form>
	</div>
</template>

<style scoped>
	.post_aside {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 70%;
		padding: 1rem;
	}

	.post_comment_section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: smaller;
		height: auto;
		overflow-y: auto;
		max-height: 20rem;
	}

	.post_comment_form {
		display: flex;
		gap: 1rem;
		align-items: center;
		width: 100%;
	}

	.post_comment_form textarea {
		resize:vertical;
		max-height: 7.5rem;
	}
</style>