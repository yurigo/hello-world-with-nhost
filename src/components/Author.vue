<script setup>
import Article from "../components/Article.vue";
const props = defineProps( {author: Object} );
</script>

<template>

<!-- {{ author.articles }} -->

<!-- card -->
<div class="card">
    <div class="card-body">
        <h5 class="card-title">{{ author.name }}</h5>
        <p class="card-text">
            <!-- <ul>
                <li v-for="article in author.articles" :key="article.id">
                    {{ article.title }} - {{ article.rating }}
                </li>
            </ul> -->
            <Article v-for="article in author.articles" :key="article.id" :article="article" />               
        </p>
    </div>
</div>


</template>