<template>
  <div class="app">
  <!--<img alt="Vue logo" src="./assets/logo.png">-->
  <Home />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Home from '@/components/Home.vue';

export default defineComponent({
  name: 'App',
  components: { 
    Home,
  },
});
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width:100vw;
  height: 200vh;
}
:root {
    --dark-purple-colour: #160b29;
    --medium-purple-colour: #30155c;
    --purple-colour: #44227a;
    --light-purple-colour: #594477;
    --lighter-purple-colour: #FBEAFF;
    --dark-blue-colour: #183E74;
    --medium-blue-colour: #183E74;
    --blue-colour: #008EB6;
    --turquoise: #00B6C3;
    --pink-colour: #712B5C;
    --light-pink-colour: #B34950;
    --orange-colour: #E4795A;
    --light-orange-colour: #FDB557;
    --yellow-colour: #F9F871;
}
html{
  background: linear-gradient(135deg, var(--dark-purple-colour), var(--medium-purple-colour), var(--purple-colour));

}
</style>

