<script setup>
const props = defineProps({
    article: Object,
    selected: Boolean,
});
</script>

<template>
    <!-- card -->
    <div class="card">
        <div class="card-body">
            <router-link :to="{ name: 'article', params: { id: article.id } }">
                <h5 class="card-title" :class="{ selected: selected }">
                    <span v-if="selected">😱</span>
                    {{ article.title }}
                    <span class="badge">{{ article.rating }}</span>
                </h5>
                <!-- <h5 class="card-title">{{ article.title }} <span class="badge">{{article.rating}}</span>  </h5> -->
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.selected {
    color: white;
}

.card-title:hover {
    color: white;
}
</style>
