<script setup>
import Article from "../components/Article.vue";
import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
    backendUrl: import.meta.env.VITE_NHOSTS_URL,
});

const graphqlEndpoint = nhost.graphql.getUrl();

const { data, error } = await nhost.graphql.request(`{
        _helloworld_article{
            id
            title
            rating
        }
    }`);

if (error) {
    console.log(error);
}

const articles = data._helloworld_article;
</script>

<template>
    <main>
        <h1>Articulos</h1>
        <Article
            v-for="article in articles"
            :key="article.id"
            :article="article"
        />

        <!-- Esto es para si hubiera children! -->
        <!-- <router-view></router-view> -->
    </main>
</template>
