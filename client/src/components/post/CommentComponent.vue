<script setup lang="ts">
	import { defineProps } from 'vue';
	import type { CommentComponentProps } from '@/types/components';
	import Username from '@/components/profile/UsernameComponent.vue';
	import ProfilePicture from '../profile/ProfilePictureComponent.vue';

	const props = defineProps<CommentComponentProps>();
	const { username, profilePicture, content, createdAt } = props.comment;

	const date = new Date(createdAt);
	const dateDiff = date.getTime() - Date.now();
	if (isNaN(dateDiff)) {
		throw new Error("Date invalide");
	} else if (dateDiff > 0) {
		throw new Error("Tu viens du futur mon reuf?");
	}

	const MINUTE = 60 * 1000;
	const HOUR = 60 * MINUTE;
	const DAY = 24 * HOUR;
	const WEEK = 7 * DAY;
	const MONTH = 30 * DAY;
	let value: number;
	let unit: Intl.RelativeTimeFormatUnit;

	// si ça fais moins de [unitée] alors on l'utilise
	if (Math.abs(dateDiff) < HOUR) {
		value = Math.ceil(dateDiff / MINUTE) - 1; // minimum il y a 1 minute (sinon ça affiche "Cette minute-ci, Chelou..")
		unit = "minute";
	} else if (Math.abs(dateDiff) < DAY) {
		value = Math.round(dateDiff / HOUR);
		unit = "hour";
	} else if (Math.abs(dateDiff) < WEEK) {
		value = Math.round(dateDiff / DAY);
		unit = "day";
	} else if (Math.abs(dateDiff) < MONTH) {
		value = Math.round(dateDiff / WEEK);
		unit = "week";
	} else {
		value = Math.round(dateDiff / MONTH);
		unit = "month";
	}

	const timeAgo = new Intl.RelativeTimeFormat("fr", { numeric: "auto" }).format(value, unit);
</script>

<template>
	<article class="post_comment">
		<span class="post_comment_user">
			<ProfilePicture :src="profilePicture" :fallback="username" />
			<Username :username="username" />
			<time class="post_comment_time" datetime={createdAt}>{{
				timeAgo
			}}</time>
		</span>
		<p>
			{{ content }}
		</p>
	</article>
</template>

<style scoped>
	.post_comment {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-bottom: 1px solid #bbb;
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
</style>