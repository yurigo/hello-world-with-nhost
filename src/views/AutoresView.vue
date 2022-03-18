<script setup>
import Author from "../components/Author.vue";
import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
    backendUrl: import.meta.env.VITE_NHOSTS_URL,
});

const graphqlEndpoint = nhost.graphql.getUrl();

const { data, error } = await nhost.graphql.request(`{
            _helloworld_author{
              id
              name
              articles {
                id
                title
                rating
              }
            }
        }`);

if (error) {
    console.log(error);
}

const authors = data._helloworld_author;
</script>

<template>
    <main>
        <h1>Autores</h1>
        <Author v-for="author in authors" :key="author.id" :author="author" />
    </main>
</template>
