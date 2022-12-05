<template>
  <header>
    <h2>Next <span class="gradient">Favourite</span> Movie</h2>
    <input id="input__search" type="text" placeholder="Open Filters or Insert API" @click="openSearch">
    <button class="filters__button" @click="openSearch">FILTERS <span class="arrow"><i id="uil" class="uil-angle-down"></i></span></button>
  </header>
</template>

<script>

export default {
    data () {
        return {
            show: false
        }
    },
    methods: {
        openSearch: function() {
            this.show = !this.show
            this.$emit("open-filters", this.show)

            let icon = document.querySelector('#uil')
            let iconAttribute = icon.getAttribute('class')
        
            if (iconAttribute == 'uil-angle-down'){
                icon.removeAttribute("class")
                icon.setAttribute("class", "uil-angle-up")
            } else if (iconAttribute == 'uil-angle-up') {
                icon.removeAttribute("class")
                icon.setAttribute("class", "uil-angle-down")
            }
        }
    }
}
</script>

<style>
h2{
    font-size: 2rem;
}
#input__search{
    width: 400px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 0;
}
.filters__button {
    width: 120px;
    margin: 0 2px;
    padding-bottom: 10px;
    border-radius: 10px;
    height: 40px;
    border: none;
    background-color: var(--orange-colour);
    color: white;
    font-weight: 800;
    cursor: pointer;
}
.filters__button:hover{
    background-color: var(--light-orange-colour);
}
.arrow{
   font-size:1.5rem;
}
</style>