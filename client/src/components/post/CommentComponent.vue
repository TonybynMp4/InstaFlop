<script setup lang="ts">
	import { defineProps } from 'vue';
	import type { CommentComponentProps } from '@/types/components';
	import Username from '@/components/profile/UsernameComponent.vue';
	import ProfilePicture from '../profile/ProfilePictureComponent.vue';
	import getRelativeTime from '@/utils/getRelativeTime';
	import useAuthStore from '@/stores/auth-store';
	import { ref } from 'vue';
	import { CheckIcon, CircleOff } from 'lucide-vue-next';

	const props = defineProps<CommentComponentProps>();
	const emit = defineEmits(['editComment']);
	const {
		user: { profilePicture, username },
		comment: { userId, content, createdAt },
	} = props.comment;

	const timeAgo = getRelativeTime(createdAt);
	const authStore = useAuthStore();

	const isEditing = ref(false);
	const setIsEditing = () => isEditing.value = !isEditing.value;
	const editComment = () => {
		if (!props.comment) return;
		if (!authStore.getUser) return;

		const newContent = editCommentContent.value.trim();

		if (newContent.length > 200) {
			alert('Le commentaire ne doit pas dépasser 200 caractères.');
			return;
		}
		if (newContent === content) {
			setIsEditing();
			return;
		}

		if (newContent === '') {
			alert('Le commentaire ne peut pas être vide.');
			return;
		}

		emit('editComment', {
			commentId: props.comment.comment.id,
			newContent,
		});

		setIsEditing();
	};
	const editCommentContent = ref(content);
	const deleteComment = () => {
		if (!props.comment) return;
		if (!authStore.getUser) return;

		if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
			emit('editComment', {
				commentId: props.comment.comment.id,
				newContent: null,
			});
		}
	};
</script>

<template>
	<article class="post_comment">
		<span class="post_comment_user">
			<ProfilePicture :src="profilePicture" :fallback="username" />
			<Username :username="username" />
			<time class="post_comment_time" datetime={createdAt}>{{
				timeAgo
			}}</time>
			<div class="comment_actions">
				<button class="comment_action" :disabled="isEditing" v-if="userId === authStore.getUser?.id" @click="setIsEditing">Modifier</button>
				<button class="comment_action destructive" v-if="userId === authStore.getUser?.id" @click="deleteComment">Supprimer</button>
			</div>
		</span>
		<p v-if="!isEditing">
			{{ content }}
		</p>
		<div v-if="isEditing" class="post_comment_edit">
			<textarea v-model="editCommentContent" />
			<div class="post_comment_edit_actions">
				<CircleOff class="comment_action destructive" @click="setIsEditing" />
				<CheckIcon class="comment_action" @click="editComment()" />
			</div>
		</div>
	</article>
</template>

<style scoped>
	.post_comment_edit {
		display: flex;
		margin-top: 0.25rem;
		gap: 1ch;
		align-items: center;
	}

	.post_comment_edit textarea {
		width: 100%;
		background-color: white;
		border: 1px solid #a5a5a5;
		border-radius: 0.25rem;
		padding: 0.25rem;
		font-size: small;
		max-height: 8em;
		min-height: 2em;
		resize: vertical;
	}

	.post_comment_edit_actions {
		display: flex;
		gap: 0.5rem;
	}

	.post_comment {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-bottom: 1px solid #a5a5a5;
		padding-block: 0.5rem;
		padding-inline: 0.5rem;
		border-radius: 0;
	}

	.post_comment p {
		font-size: small;
		margin-left: 4ch;
		overflow: hidden;
	}

	.post_comment_user {
		display: flex;
		gap: 1ch;
		align-items: center;
	}

	.post_comment_time {
		font-size: smaller;
		color: #888;
	}

	.comment_actions {
		display: flex;
		gap: 0.5rem;
		margin-left: auto;
	}

	.comment_action {
		cursor: pointer;
		color: black;
		font-size: smaller;
		margin-left: auto;
		padding: 0.25rem;
		border-radius: 0.25rem;
		border: 1px solid #a5a5a5;
	}

	.comment_action:hover {
		color: white;
		background-color: black
	}

	.destructive {
		color: white;
		background-color: red;
	}

	.destructive:hover {
		color: white;
		background-color: darkred;
	}
</style>