<script setup lang="ts">
    import { ref } from 'vue';

    //calculer le temps restant avant le 2 avril 2025 14h
    const timeLeft = ref('');

    const calculateTimeLeft = () => {
        const difference = +new Date('2025-04-02 14:00') - +new Date();

        if (difference <= 0) {
            timeLeft.value = 'C\'est toujours là? Oh la sauce..';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        timeLeft.value = `${days} jours, ${hours} heures, ${minutes} minutes, ${seconds} secondes`;
    };

    calculateTimeLeft();
    setInterval(calculateTimeLeft, 1000);

</script>

<template>
    <main>
        <h1>Bienvenue sur le pire réseau social du monde</h1>

        <p>
            WIP: ce projet est encore en cours de développement!
        </p>
        <p style="font-size: 1.5rem; font-weight: bold;">
            Temps restant avant qu'on flop le cours de Node.js:
        </p>
        <time style="font-size: 2rem; font-weight: bold;">{{ timeLeft }}</time>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
</style>