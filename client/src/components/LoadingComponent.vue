<script setup lang="ts">
	import { LoaderCircleIcon } from "lucide-vue-next";
</script>

<template>
	<div class="loading">
		<LoaderCircleIcon class="spinner" /><p><slot>Chargement...</slot></p>
	</div>
</template>

<style scoped>
.loading {
	display: flex;
	gap: 0.5rem;
	align-items: center;
}
</style>