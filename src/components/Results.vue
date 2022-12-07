<template>
  <div class="main-section">
    <div class="results">
      <h3 class="h3__title">Results</h3>
      <div class="card__section">
        <div class="card__container" v-for="(movie, index) in getMovies" :key="index">
          <img class="card__poster" :src="movie.image" alt="movie.primaryTitle">
          <div class="card__buttons">
            <button class="card__button type">{{movie.titleType}}</button>
            <button class="card__button duration"><i class="uil uil-stopwatch"></i><span class="hidden">{{movie.runtimeMinutes}}<span class="bold">"</span></span></button>
            <button class="card__button year"><i class="uil uil-schedule"></i><span class="hidden">{{movie.startYear}}</span></button>
          </div>
          <div class="card__rating">
            <img draggable="false" class="card__imdb__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="">
            <p class="card__imdb__rating"><span class="bold">{{movie.averageRating}}</span>/10</p>
          </div>
          
            <div class="card__genre">
              <p v-for="(genre, index) in movie.genres" :key="index">{{ genre }}</p>            
            </div>
            
          <div class="card__data">
            <p class="card__title"><span class="bold">{{movie.primaryTitle}}</span></p>
          </div>
        </div>
      </div>
    </div>



    </div>
    <div>
     
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from "vue";
import createStore from "@/store/index";

export default defineComponent({
  name: "Results",
    watch: {
        'createStore.getters.getMovies': {
            immediate: true,
            handler() {
            createStore.dispatch('getMovies');
            }
        }
    },
  computed: {
    getMovies() {
      return createStore.state.movies;
    },
    
  },
});
</script>

<style>
.card__section {
    display: flex;
    margin: auto;
}
.card__container {
    margin: 10px;
    width: 175px;
    height: 250px;
    border-radius: 5px;
    position: relative;
    transition:.6s ease-in-out;
    cursor: pointer;
    margin-bottom: 100px;
}
.card__container:hover {
    box-shadow: 1px 2px 10px var(--light-orange-colour);
    
}
.card__poster {
    width: 175px;
    height: 250px;
    border-radius: 5px;
}
.card__buttons{
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    width: 200px;
}
.card__button {
    text-align: left;
    border: none;
    cursor: pointer;
    color:white;
    border-radius: 25px;
    height: 25px;
    width: 35px;
    background-color: rgba(10,10,10,0.7);
    border: 1px solid white;
    margin: 10px 10px 5px 10px;
    font-size: 1.2rem;
    transition: 0.3s ease-in-out;
}
.hidden {
    opacity: 0;
    position: absolute;
    padding-left: 10px;
    transition: 0.3s ease-in-out;
}

.duration:after{
    padding: 3px;
    font-size: 0.9rem;
    content: "";
    color: white;
    opacity: 0;
    position: absolute;
    font-weight: bold;
}
.duration:hover{
    width: 100px;
    background-color: var(--purple-colour);
}
.year:after{
    padding: 3px;
    font-size: 0.9rem;
    content: "";
    color: white;
    opacity: 0;
    position: absolute;
    font-weight: bold;
}
.year:hover{
    width: 100px;
    background-color: var(--blue-colour);
}
.card__button:hover::after{
    opacity: 1;
}
.type:hover{
    width: 100px;
    background-color: var(--pink-colour);
}
.type{
    font-size: 0.9rem;
    font-weight: 800;
    width: 70px;
}
.year:hover{
    width: 100px;
}

.card__rating {
    display: flex;
    flex-direction: column;
    width: 165px;
    border-radius: 0 0 5px 5px;
    position: absolute;
    bottom: 0;
    padding-left: 10px;
    text-align: left;
    transition: .6s ease-in-out;
    color: white;
    background: rgb(5,4,31);
    background: linear-gradient(180deg, rgba(5,4,31,0) 0%, rgba(33, 33, 38, 0.6) 46%, rgba(5, 5, 42, 0.8) 100%);
    opacity: 0;
}
.card__container:hover > .card__rating{
    opacity: 1;
}
.card__container:hover > .card__genre{
    opacity: 1;
}
.card__button:hover > .hidden{
    opacity: 1;
}
.card__genre{
    position: absolute;
    bottom: 10px;
    right: 0;
    width: 77px;
    background: rgba(39, 38, 38, 0.7);
    color: white;
    margin-right: 10px;
    font-size: 0.8rem;
    border-radius: 10px;
    padding: 5px;
    border: 1px solid white;
    opacity: 0;
    transition: .6s ease-in-out;
    font-weight: bold;
}
.card__genre:hover{
    background-color: var(--light-pink-colour);
}
.card__genre p {
    margin: 0;
}

.card__imdb__icon{
    width: 50px;
}
.card__imdb__rating {
    margin: 5px;
}
.bold {
    font-weight: bold;
    font-size: 1.1rem;
}
.results {
    width: 100vw;
    margin-left: 20px;
}
.main-section {
    display: grid;
    color: white;
    height: 1000px;
}
.card__section {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.hold{
    border: solid 2px var(--lighter-purple-colour);
}
.hovered {
    border-style: dashed;
}
.invisible {
    display: none;
}
</style>