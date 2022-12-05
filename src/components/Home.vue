<template>
    <div class="initial__page" v-if="!isOpen">
        <h1>Pick Your Next <span class="gradient">Favourite</span> Movie</h1>
        <button class="button__start" @click="start(true)">Start</button>
    </div>
    <Mainpage v-else />
</template>

<script>
import Mainpage from './Mainpage.vue'

export default {
components: {
    Mainpage
},
data: function () {
    return {
        isOpen: false,
    };
},
methods: {
    start: function (value) {
        this.isOpen = value;
        this.$store.dispatch('getMovies');
    },
},
};

</script>

<style>
body {
    text-align: center;
    font-family: Helvetica, Arial, sans-serif;
    color: white;
}
h1 {
    font-size: 5rem;
}
.gradient {
    background-image: linear-gradient(135deg, var(--purple-colour), var(--pink-colour), var(--light-pink-colour), var(--orange-colour), var(--light-orange-colour), var(--yellow-colour));
    background-clip: text;
    color: transparent;
}
.button__start {
    position: relative;
    background: linear-gradient(135deg, var(--purple-colour), var(--pink-colour), var(--light-pink-colour), var(--orange-colour));
    border: none;
    padding: 30px 60px;
    border-radius: 10px;
    margin: 2rem;
    font-size: 2rem;
    color: white;
    transition: all 0.3s ease;
    cursor: pointer;
}
.button__start:after {
    position: absolute;
    top: 30%;
    right: 1.3em;
    content: "➜";
    opacity: 0;
    transition: all 0.3s ease;
}
.button__start:hover {
    padding: 30px 80px 30px 40px;
    transform: scale(1.1);
    border: 1px solid var(--orange-colour);

}
.button__start:hover:after {
    right: 0.8em;
    opacity: 1;
}
</style>