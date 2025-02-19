<script setup lang="ts">
    import baseURL from '../baseUrl';
    fetch(baseURL + '/api/user/getUsers')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
</script>

<template>
    <main>
        <h1>Home Page !</h1>
    </main>
</template>

<style scoped>
</style>