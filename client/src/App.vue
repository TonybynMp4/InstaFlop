<template>
    <header>
        <h1>
            InstaFlop
        </h1>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/login">Login</router-link>
            </li>
        </ul>
    </header>
    <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style>
    header {
        background-color: #f1f1f1;
        color: #333;
        width: 100%;
        display: flex;
        padding: 1rem;
        justify-content: space-between;
        align-items: center;
    }
    ul {
        display: flex;
        gap: 1rem;
    }
    li {
        list-style: none;
    }
    a {
        text-decoration: none;
        color: #333;
    }
    a:hover {
        text-decoration: underline;
    }
</style>