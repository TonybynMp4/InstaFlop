<script setup lang="ts">
	import { ref, computed } from "vue";
	import useAuthStore from "@/stores/auth-store";
	import ProfilePicture from "@/components/profile/ProfilePictureComponent.vue";
import { BookText, GalleryHorizontalEnd, Settings } from "lucide-vue-next";

	const authStore = useAuthStore();
	const user = computed(() => authStore.getUser);

	const userData = ref({
		username: user.value?.username ?? "Username",
		displayname: user.value?.displayname ?? "Display Name",
		bio: user.value?.bio ?? "Photographer | Traveler | Coffee Enthusiast",
		profilePicture: user.value?.profilePicture ?? authStore.getUser?.profilePicture,
		posts: user.value?.posts ?? 0,
		followers: user.value?.followers ?? 0,
		following: user.value?.following ?? 0,
		website: user.value?.website ?? "https://example.com",
	});

	const dialogRef = ref<HTMLDialogElement | null>(null);
	const openDialog = () => dialogRef.value?.showModal();
	const closeDialog = () => dialogRef.value?.close();

	const currentTab = ref("gallery");
	const setTab = (tab: string) => {
		currentTab.value = tab;
	};
</script>

<template>
	<main class="profile-container">
		<section class="profile-header">
			<ProfilePicture
				class="profile-picture"
				:src="userData.profilePicture"
				:fallback="userData.username"
			/>
			<div class="profile-info">
				<div class="profile-info-top">
					<h2 style="font-size: larger; font-weight: bold;">{{ userData.username }}</h2>
					<div class="buttons">
						<button class="follow-btn" v-if="false">Follow</button>
						<!-- v-if TODO: boutons de SON propre profil différent des autres!!! -->
						<button @click="openDialog" v-else><Settings /></button>
					</div>
				</div>
				<div class="profile-info-bottom">
					<h2>{{ userData.displayname }}</h2>
					<div class="stats">
						<span><strong>{{ userData.posts }}</strong> posts</span>
						<span><strong>{{ userData.followers }}</strong> followers</span>
						<span><strong>{{ userData.following }}</strong> following</span>
					</div>
				</div>
				<p class="bio">{{ userData.bio }}</p>
			</div>
		</section>

		<section>
			<div class="tabs">
				<div class="tab" @click="setTab('gallery')" :class="{ active: currentTab === 'gallery' }">
					<GalleryHorizontalEnd /> Galerie
				</div>
				<div class="tab" @click="setTab('feed')" :class="{ active: currentTab === 'feed' }">
					<BookText /> Feed
				</div>
			</div>
			<div class="gallery">
				<div v-if="currentTab === 'gallery'" class="gallery-item" v-for="n in 6" :key="n"></div>
				<div v-if="currentTab === 'feed'" class="feed-item" v-for="n in 6" :key="n">Feed Item {{ n }}</div>
			</div>

		</section>
	</main>

	<dialog ref="dialogRef" class="settings-dialog">
		<h2>Profile Settings</h2>
		<button @click="closeDialog">Close</button>
	</dialog>
</template>

<style scoped>

.tabs {
	display: flex;
	justify-content: center;
	gap: 1rem;
	margin-top: 1rem;
	width: 100%;
	padding: 0.25rem;
	background-color: #e0e0e0;
}
.tab {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	cursor: pointer;
	padding: 0.5rem;
	width: 50%;
	border-radius: 5px;
}

.tabs .active {
	background-color: #fff;
	border: 1px solid #a5a5a5;
}

.profile-info-top {
	display: flex;
	gap: 1rem;
	align-items: center;
	margin-bottom: 0.5rem;
}

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
	display: flex;
	justify-content: space-between;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
}
.follow-btn {
	background-color: #e1306c;
	color: white;
}

.follow-btn:hover {
	background-color: #c6286b;
}

.message-btn {
	background-color: #f0f0f0;
}

.stats {
	display: flex;
	gap: 1rem;
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

