<script setup>
import { ref, toRefs, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { NhostClient } from "@nhost/nhost-js";
import Article from "@/components/Article.vue";

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // simmulación de una carga de 1 segundo al entrar por primera vez:
// await sleep(1000);

// watch route params
const route = useRoute();

const article = ref({});

const name = computed(() => {
  return article?.value?.author?.name;
});

const average = computed(() => {
  return article?.value?.author?.articles_aggregate?.aggregate?.avg?.rating;
});

const articles = computed(() => {
  return article?.value?.author?.articles;
});

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
    // console.log(graphqlEndpoint);

    const { data, error } = await nhost.graphql.request(`
query MyQuery {
  _helloworld_article_by_pk(id: ${id}) {
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
        console.log("error", error);
    }

    article.value =  data._helloworld_article_by_pk
    console.log("article: " , article.value);
}

</script>

<template>

    <main v-if="article">
        <!-- {{ article }} -->
        <h1>Articulo</h1>
        <!-- <Article v-for="article in articles" :key="article.id" :article="article" /> -->
        <span class="article-title">{{ article?.title }} </span>
        <span class="badge">{{ article?.rating }}</span>

        <div>
            <h2>Autor</h2>
            <p>{{ name }}</p>

            <h2>Articulos (media: {{ average }})</h2>
            <!-- <ul>
                <li v-for="article in article?.author?.articles" :key="article.id">
                    <router-link :to="{ name: 'article', params: { id: article.id } }" >
                        {{ article.title }} - {{ article.rating }}
                    </router-link> <br />
                </li>
            </ul> -->
            <div v-if="articles">
            <Article v-for="a in articles" :key="a?.id" :article="a" :selected="a.id === article.id" />
            </div>


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