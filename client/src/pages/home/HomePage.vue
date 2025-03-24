<script setup lang="ts">
    import Comment from '@/components/post/CommentComponent.vue';
import ProfilePictureComponent from '@/components/profile/ProfilePictureComponent.vue';
import UsernameComponent from '@/components/profile/UsernameComponent.vue';
import { DotIcon, EllipsisVertical } from 'lucide-vue-next';
	import { ref } from 'vue';

    const posts = ref([
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem vitae libero earum quis, aliquam ut cupiditate delectus est iusto quasi eum perspiciatis aspernatur, velit vel amet voluptatem voluptas voluptatum repellat?',
            image: '/images/1.jpg',
			comments: [
				{ id: 1, username: 'JohnDoe', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.' },
				{ id: 2, username: 'JaneDoe', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.' },
			],
			username: 'JohnDoe',
		},
    ]);
</script>

<template>
    <main class="flex flex-col gap-4 items-center">
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
					<div class="post_user">
						<div class="post_user_info">
							<ProfilePictureComponent :src="post.image" />
							<UsernameComponent :username="post.username" />
						</div>
						<EllipsisVertical />
					</div>
					<p>Commentaires</p>
                    <div class="post_comment_section">
                        <Comment v-for="comment in post.comments" :username="comment.username" :content="comment.content" :key="comment.id" />
                    </div>
					<div class="post_comment_form">
						<textarea name="comment" id="comment" cols="30" rows="1" placeholder="Laisse un commentaire.."></textarea>
						<button @click="addComment(post)">Commenter</button>
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

	.post_user {
		display: flex;
		gap: 1rem;
		align-items: center;
		width: 100%;
	}

	.post_user_info {
		display: flex;
		gap: 1rem;
		align-items: center;
		width: 100%;
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

    p {
        margin: 0;
    }
</style>