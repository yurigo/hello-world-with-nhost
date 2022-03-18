<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onErrorCaptured, Suspense } from "vue";

onErrorCaptured(async (error, vm, info) => {
    console.log("App.error: ", error);
    console.log("App.info: ", info);
});
</script>

<template>
    <header>
        <nav>
            <!-- <a href="/">Home</a>
            <a href="/authors">Authors</a>
            <a href="/articles">Articles</a> -->
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/authors">Autores</RouterLink>
            <RouterLink to="/articles">Artículos</RouterLink>
        </nav>
    </header>

    <!-- 
            Utilizamos el RouterView para que el componente hijo se renderice.
            Necesito establecer la key para que re-renderize si cambia el id (pero no la ruta)
            ver: https://stackoverflow.com/questions/45432208/vue-router-same-route-with-different-param
            -->
    <!-- <RouterView :key="useRoute().fullPath" /> -->

    <!--
            Al final (y mucho mejor) se utiliza un watcher para observar los 
            cambios del id de la ruta y se procede a cargar los datos del componente.
            ver: https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes

            -->

    <!-- Para utilizar Suspense se necesita que el componente hijo sea una promesa -->

    <!-- <Suspense timeout="0" >
            <template #default>
                <RouterView  />

            </template>

        <template #fallback >
            <div>Loading...</div>
        </template>

    </Suspense> -->

    <RouterView v-slot="{ Component }">
        <Suspense timeout="200">
            <template #default>
                <Component :is="Component" />
            </template>
            <template #fallback>
                <span>Loading...</span>
            </template>
        </Suspense>
    </RouterView>
</template>

<style>
@import "./assets/base.css";

main {
    padding: 1rem;
}
</style>
