<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { NhostClient } from "@nhost/nhost-js";
import Article from "../components/Article.vue";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// simmulación de una carga de 1 segundo al entrar por primera vez:
await sleep(1000);

// watch route params
const route = useRoute();

const article = ref({});

watch(() => route.params.id, async (newVal) => {
  console.log("route.params.id: " + newVal);
  await load(newVal);
},
   // ejecutar el observer cuando se monta el componente
   { immediate: true }
);


async function load(id){

    if (id === undefined) {
        return;
    }

    const nhost = new NhostClient({
        backendUrl: import.meta.env.VITE_NHOSTS_URL,
    });

    const graphqlEndpoint = nhost.graphql.getUrl();
    console.log(graphqlEndpoint);

    const { data, error } = await nhost.graphql.request(`{
            _helloworld_article_by_pk (id: ${id}){
                id
                rating
                title
                author {
                name
                id
                articles {
                    id
                    title
                    rating
                }
                articles_aggregate {
                    aggregate {
                    avg {
                        rating
                    }
                    }
                }
                }
            }
            }
            `);

    if (error) {
        console.log(error);
    }

    console.log(data);

    // article.value = data._helloworld_article_by_pk;
    article.value = data._helloworld_article_by_pk;
}

</script>

<template>
    <main>
        <!-- {{ article }} -->
        <h1>Articulo</h1>
        <!-- <Article v-for="article in articles" :key="article.id" :article="article" /> -->
        <span class="article-title">
            
            {{ article.title }} 
            </span>
        <span class="badge">
            {{ article.rating }}
        </span>

        <div>
            <h2>Autor</h2>
            <p>{{ article?.author?.name }}</p>

            <h2>Articulos (media: {{article?.author?.articles_aggregate.aggregate.avg.rating}})</h2>
            <!-- <ul>
                <li v-for="article in article?.author?.articles" :key="article.id">
                    <router-link :to="{ name: 'article', params: { id: article.id } }" >
                        {{ article.title }} - {{ article.rating }}
                    </router-link> <br />
                </li>
            </ul> -->
            <Article v-for="article in article?.author?.articles" :key="article.id" :article="article" :selected="article.id === this.article.id" />


        </div>


    </main>
</template>


<style scoped>
    .article-title {
        color:white;
        font-size: 1.5em;
        vertical-align: middle;
    }
    .badge {
        padding: 1px 8px;
        background-color: #807a7a;
        color: rgb(46, 46, 46);
    margin: 0px 20px;
        font-size: .8em;
        border-radius: 4px;
        font-weight: 900;
        vertical-align: middle;
        border: 1px solid #754e4e;
    }
</style>