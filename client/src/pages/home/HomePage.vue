<script setup lang="ts">
    import { ref } from 'vue';

    const posts = ref([
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem vitae libero earum quis, aliquam ut cupiditate delectus est iusto quasi eum perspiciatis aspernatur, velit vel amet voluptatem voluptas voluptatum repellat?',
            image: '/images/kyoto.jpg',
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem vitae libero earum quis, aliquam ut cupiditate delectus est iusto quasi eum perspiciatis aspernatur, velit vel amet voluptatem voluptas voluptatum repellat?',
            image: '/images/newyork.jpg',
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem vitae libero earum quis, aliquam ut cupiditate delectus est iusto quasi eum perspiciatis aspernatur, velit vel amet voluptatem voluptas voluptatum repellat?',
            image: '/images/logo.png',
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem vitae libero earum quis, aliquam ut cupiditate delectus est iusto quasi eum perspiciatis aspernatur, velit vel amet voluptatem voluptas voluptatum repellat?',
            image: '/images/logo.png',
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem vitae libero earum quis, aliquam ut cupiditate delectus est iusto quasi eum perspiciatis aspernatur, velit vel amet voluptatem voluptas voluptatum repellat?',
            image: '/images/logo.png',
        },
    ]);
</script>

<template>
    <main>
        <section id="feed">
            <h2>Suivis</h2>
            <div id="post-form">
                <textarea name="post" id="post" cols="30" rows="3" placeholder="Raconte ta vie.."></textarea>
                <button>Publier</button>
            </div>
            <article v-for="post in posts" :key="post.content">
                <div class="post_main">
                    <img class="post_image" :src="post.image" alt="post image" />
                    <p>{{ post.content }}</p>
                </div>
                <div class="post_aside">
                    <div class="post_comment_section">
                        <article class="post_comment">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.</p>
                        </article>
                        <article class="post_comment">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.</p>
                        </article>
                        <article class="post_comment">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.</p>
                        </article>
                        <article class="post_comment">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.</p>
                        </article>
                    </div>
                </div>
            </article>
        </section>
        <section>

        </section>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    #feed {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        width: 80%;
    }

    #post-form {
        width: 100%;
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-direction: column;
    }

    #feed > article {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        width: 90%;
        border: 1px solid #000;
        padding: 1rem;
        background-color: #0f0f0f;
        border-radius: 1rem;
    }

    .post_main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-items: flex-start;
        width: 100%;
    }

    .post_aside {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 70%;
    }

    .post_image {
        width: 100%;
        height: auto;
    }

    .post_comment_section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: smaller;
    }

    .post_comment {
        display: flex;
        gap: 1rem;
        align-items: center;
        width: 100%;
        border: 1px solid #fff;
        padding-block: 0.5rem;
        padding-inline: 0.5rem;
        background-color: #3f3f3f;
        border-radius: 1rem;
    }

    p {
        margin: 0;
    }
</style>