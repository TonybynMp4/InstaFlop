<script setup lang="ts">
import { ref, computed } from "vue";
import useAuthStore from "@/stores/auth-store";
import ProfilePicture from "@/components/profile/ProfilePictureComponent.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.getUser);

const userData = ref({
	username: user.value?.username ?? "Username",
	displayname: user.value?.displayname ?? "Display Name",
	bio: user.value?.bio ?? "Photographer | Traveler | Coffee Enthusiast",
	profilePicture:
		user.value?.profilePicture ?? authStore.getUser.profilePicture,
	posts: user.value?.posts ?? 0,
	followers: user.value?.followers ?? 0,
	following: user.value?.following ?? 0,
	website: user.value?.website ?? "https://example.com",
});

const dialogRef = ref<HTMLDialogElement | null>(null);
const openDialog = () => dialogRef.value?.showModal();
const closeDialog = () => dialogRef.value?.close();
</script>

<template>
	<main class="profile-container">
		<section class="profile-header">
			<ProfilePicture
				class="profile-picture"
				:src="userData.profilePicture"
				:fallback="userData.username"
			></ProfilePicture>
			<div class="profile-info">
				<h1>{{ userData.username }}</h1>
				<h2>{{ userData.displayname }}</h2>
				<div class="buttons">
					<button class="follow-btn">Follow</button>
					<button class="settings-btn" @click="openDialog">⚙️</button>
				</div>
				<p class="stats">
					<span
						><strong>{{ userData.posts }}</strong> posts</span
					>
					<span
						><strong>{{ userData.followers }}</strong>
						followers</span
					>
					<span
						><strong>{{ userData.following }}</strong>
						following</span
					>
				</p>
				<p class="full-name">{{}}</p>
				<p class="bio">{{ userData.bio }}</p>
				<a :href="userData.website" target="_blank" class="website">{{
					userData.website
				}}</a>
			</div>
		</section>

		<section class="gallery">
			<div class="gallery-item" v-for="n in 6" :key="n"></div>
		</section>
	</main>

	<dialog ref="dialogRef" class="settings-dialog">
		<h2>Profile Settings</h2>
		<button @click="closeDialog">Close</button>
	</dialog>
</template>

<style scoped>
.profile-container {
	max-width: 800px;
	margin: 50px auto;
	padding: 20px;
	text-align: center;
}

.profile-header {
	display: flex;
	align-items: center;
	gap: 20px;
}

.profile-picture {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	cursor: pointer;
}

.profile-info {
	text-align: left;
}

.buttons {
	margin: 10px 0;
}

.follow-btn .settings-btn {
	padding: 8px 15px;
	margin: 5px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.follow-btn {
	background-color: #e1306c;
	color: white;
}

.message-btn {
	background-color: #f0f0f0;
}

.stats span {
	margin-right: 15px;
}

.gallery {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
	margin-top: 20px;
}

.gallery-item {
	width: 100%;
	height: 200px;
	background: #eee;
}

.settings-dialog {
	padding: 20px;
	border-radius: 10px;
	text-align: center;
}
</style>

