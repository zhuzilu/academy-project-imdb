<template>
    <div>
        <Header @open-filters="showFilters" />
            <div id="filter__container" v-show="show">

                <div class="slider__controls">
                    <a href="#" :id="n" v-for="n in slides.length" :key="n" class="slider__controls__link"
                        @click="moveSlider(n)">{{n}}</a>
                    </div>
                    
                    <hr/>
                    <div class="slider" ref="slider">
                        <div class="slider__content">
                            <h3>Movies or TV series?<span class="small"> (Choose at least one)</span></h3>
                                <input type="checkbox" @click="filterTypeMovie()" class="checkbox" name="movies" id="movies">
                                <label for="movies" title="Movies">🎬</label>
                                <input type="checkbox" @click="filterTypeTV()" class="checkbox" name="tv" id="tv">
                                <label for="tv" title="TV series">📺</label>
                        </div>

                        <div class="slider__content">
                            <h3>How much time do you have? ⏳</h3>
                                <div class="range__container">
                                    <input type="range" min="0" max="180" step="1" v-model="sliderMinDuration">
                                    <input type="number" min="0" max="180" step="1" v-model="sliderMinDuration">
                                    <input type="range" min="0" max="180" step="1" v-model="sliderMaxDuration">
                                    <input type="number" min="0" max="180" step="1" v-model="sliderMaxDuration">
                                </div>
                        </div>

                        <div class="slider__content"> 
                            <h3>What are you in the mood for?</h3>
                                <input @click="filterMood('Comedy')" class="checkbox" type="checkbox" name="😆" id="Comedy">
                                <label for="Comedy" title="Comedy">😆</label>
                                <input @click="filterMood('Horror')" class="checkbox" type="checkbox" name="😱" id="Horror">
                                <label for="Horror" title="Horror">😱</label>
                                <input @click="filterMood('Drama')" class="checkbox" type="checkbox" name="😭" id="Drama">
                                <label for="Drama" title="Drama">😭</label>
                                <input @click="filterMood('Romance')" class="checkbox" type="checkbox" name="🥰" id="Romance">
                                <label for="Romance" title="Romance">🥰</label>
                                <input @click="filterMood('Documentary')"  class="checkbox" type="checkbox" name="🧠" id="Documentary">
                                <label for="Documentary" title="Documentary">🧠</label>
                                <input @click="filterMood('Fantasy')" class="checkbox" type="checkbox" name="🧝‍♀️" id="Fantasy">
                                <label for="Fantasy" title="Fantasy">🧝‍♀️</label>
                                <input @click="filterMood('Sci-Fi')" class="checkbox" type="checkbox" name="👽" id="scifi">
                                <label for="scifi" title="SciFi">👽</label>
                                <input @click="filterMood('Crime')" class="checkbox" type="checkbox" name="🕵️" id="Crime">
                                <label for="Crime" title="Crime">🕵️</label>
                                <input @click="filterMood('War')" class="checkbox" type="checkbox" name="🪖" id="War">
                                <label for="War" title="War">🪖</label>
                                <input @click="filterMood('Adventure')" class="checkbox" type="checkbox" name="🤠" id="Adventure">
                                <label for="Adventure" title="Adventure">🤠</label>
                        </div>

                        <div class="slider__content">
                            <h3>Rating ⭐</h3>
                                <div class="range__container">
                                    <input type="range" min="0" max="10" step="1" v-model="sliderMinRating" >
                                    <input type="number" min="0" max="10" step="1" v-model="sliderMinRating" >
                                    <input type="range" min="0" max="10" step="1" v-model="sliderMaxRating">
                                    <input type="number" min="0" max="10" step="1" v-model="sliderMaxRating">
                                </div>
                        </div>
                
                        <div class="slider__content">
                            <h3>Year 📅</h3>
                                <div class="range__container">
                                    <input type="range" min="1940" max="2023" step="1" v-model="sliderMinYear">
                                    <input type="number" min="1940" max="2023" step="1" v-model="sliderMinYear">
                                    <input type="range" min="1940" max="2023" step="1" v-model="sliderMaxYear">
                                    <input type="number" min="1940" max="2023" step="1" v-model="sliderMaxYear">
                                </div>
                        </div>
                    </div>
                </div>
            </div>

<Results />
</template>

<script>
import Header from '@/components/Header.vue'
import Results from '@/components/Results.vue'
// import Json from '@/components/Json.vue'

export default {
    components: {
        Header,
        Results,
        //Json,
    },
    mounted () {
        this.slider = this.$refs.slider;
        this.height = this.slider.offsetHeight;
    },
    data() {
        return {
            slider: null,
            width: null,
            slides: [
                1, 2, 3, 4, 5
            ],
            movie: {movies: []},
            minDuration: 90,
            maxDuration: 120,
            minRating: 3,
            maxRating: 9,
            minYear: 1999,
            maxYear: 2023,
            show: false,
            typeTv: false,
            typeMovie: false,
        }
    },

    methods: {
        filterTypeTV: function() {
            if(this.typeTv == true) {
                this.typeTv = false;
                this.$store.dispatch("getTypeTv", false);
            } else {
                this.typeTv = true;
                this.$store.dispatch("getTypeTv", true);
            }
            this.$store.dispatch('getMovies');
        },
        filterTypeMovie: function() {
            if(this.typeMovie == true) {
                this.typeMovie = false;
                this.$store.dispatch("getTypeMovie", false);
            } else {
                this.typeMovie = true;
                this.$store.dispatch("getTypeMovie", true);
            }
            this.$store.dispatch('getMovies');
        },
        filterMood: function(mood) {
            this.$store.dispatch("getFilterGenre", mood);
            this.$store.dispatch('getMovies');
        },
        showFilters: function(payload) {
            this.show = payload;
        },
        moveSlider(n) {
            const element = document.querySelector('.slider__content');
                this.slider.scrollTo({
                    top: element.offsetHeight * (n-1),
                    behavior: 'smooth'
                })
        },
        minRating: function() {
        },
        save: function (value) {
        this.$store.dispatch('getMovies');
    },
    },
    computed: {
        getMovies() {
         return createStore.state.movies;
        },
        sliderMinDuration: {
            get: function() {
                let value = parseInt(this.minDuration)
                return value
            },
            set: function(value) {
                value = parseInt(value)
                if(value > this.maxDuration) {
                    this.maxDuration = value
                    this.$store.dispatch("getMaxDuration", this.maxDuration)
                    this.$store.dispatch('getMovies')
                }
                this.minDuration = value
                this.$store.dispatch("getMinDuration", this.minDuration)
                this.$store.dispatch('getMovies')
            }
        },
        sliderMaxDuration: {
            get: function() {
                let value = parseInt(this.maxDuration)
                return value
            },
            set: function(value) {
                value = parseInt(value)
                if(value < this.minDuration) {
                    this.minDuration = value
                    this.$store.dispatch("getMinDuration", this.minDuration)
                    this.$store.dispatch('getMovies')

                }
                this.maxDuration = value
                this.$store.dispatch("getMaxDuration", this.maxDuration)
                this.$store.dispatch('getMovies')

            }
        },
        sliderMinRating: {
            get: function() {
                let value = parseInt(this.minRating)
                return value
            },
            set: function(value) {
                value = parseInt(value)
                if(value > this.maxRating) {
                    this.maxRating = value
                    this.$store.dispatch("getMaxRating", this.maxRating)
                    this.$store.dispatch('getMovies')
                }
                this.minRating = value
                this.$store.dispatch("getMinRating", this.minRating)
                this.$store.dispatch('getMovies')
            }
        },
        sliderMaxRating: {
            get: function() {
                let value = parseInt(this.maxRating)
                return value
            },
            set: function(value) {
                value = parseInt(value)
                if(value < this.minRating) {
                    this.minRating = value
                    this.$store.dispatch("getMinRating", this.minRating)
                    this.$store.dispatch('getMovies')

                }
                this.maxRating = value
                this.$store.dispatch("getMaxRating", this.maxRating)
                this.$store.dispatch('getMovies')

            }
        },
        sliderMinYear: {
            get: function() {
                let value = parseInt(this.minYear)
                return value
            },
            set: function(value) {
                value = parseInt(value)
                if(value > this.maxYear) {
                    this.maxYear = value
                    this.$store.dispatch("getMaxYear", this.maxYear)
                this.$store.dispatch('getMovies')
                }
                this.minYear = value
                this.$store.dispatch("getMinYear", this.minYear)
                this.$store.dispatch('getMovies')

                     
            }
        },
        sliderMaxYear: {
            get: function() {
                let value = parseInt(this.maxYear)
                return value
            },
            set: function(value) {
                value = parseInt(value)
                if(value < this.minYear) {
                    this.minYear = value;
                    this.$store.dispatch("getMinYear", this.minYear);
                    this.$store.dispatch('getMovies')

                }
                this.maxYear = value;
                this.$store.dispatch("getMaxYear", this.maxYear);
                this.$store.dispatch('getMovies')
            }
        },
    }
}
</script>

<style scoped>
body {
    color: var(--main-colour);
    margin: 0;
    padding: 0;
}
.slider {
    position: relative;
    height: 35vh;
    overflow: scroll;
    scroll-snap-type: y mandatory;
}
.slider__controls {
    padding: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.slider__controls__link {
    width: 2.4rem;
    height: 2.4rem;
    background-color: rgba(255, 167, 108, 0.7);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    margin: 0.5rem 0;
    color: white;
}
.slider__controls__link:hover{
    background-color: rgba(255, 167, 108, 1);
}
.slider__controls__link:focus{
    background-color: var(--orange-colour);
}
.slider__content {
    height: 30vh;
    background-position: center;
    background-size: cover;
    scroll-snap-align: center;
}
#filter__container{
    padding: 10px;
    margin: auto;
    width: 80%;
    background-color: white;
    color: black;
    height: 50vh;
    border-radius: 10px;
    border: 1px solid rgb(213, 213, 213);
    box-shadow: 3px 5px 10px 3px rgba(79, 79, 79, 0.3);
}
hr {
    margin-top: 0;
    padding-top: 0;
}
/* Checkboxes */
.checkbox{
    display:none;
}
label {
    padding: 10px;
    display: inline-block;
    font-size: 2.5rem;
    margin-right: 10px;
    cursor: pointer;
}
label:before{
    background-color: #fff;
    color: #fff;
    content: " ";
    display: block;
    border-radius: 50%;
    border: 1px solid rgb(150, 149, 149);
    top: -5px;
    left: -5px;
    width: 25px;
    height: 25px;
    text-align: center;
    transition-duration: 0.4s;
    transform: scale(0);
}
label img {
    height: 70px;
    width: 70px;
    transition-duration: 0.2s;
    transform-origin: 50% 50%;
}
:checked + label {
    border-color: #ddd;
}
:checked + label:before {
    content: "✓";
    font-size: 1.3rem;
    background-color: var(--purple-colour);
    transform: scale(1);
}
:checked + label img{
    transform: scale(0.9);
    z-index:3;
}
/* Dual range */
.range__container {
  width: 300px;
  margin: auto;
  text-align: center;
  position: relative;
  height: 6em;
}
.range__container input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}
input[type=number] {
  margin: 20px;
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 1.4em;
  -moz-appearance: textfield;
}
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type=number]:invalid,
input[type=number]:out-of-range {
  border: 2px solid #ff6347;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: linear-gradient(255deg, var(--dark-purple-colour), var(--purple-colour), var(--pink-colour), var(--light-pink-colour), var(--orange-colour), var(--light-orange-colour));
}

input[type=range]:focus::-ms-fill-lower {
  background: linear-gradient(255deg, var(--dark-purple-colour), var(--purple-colour), var(--pink-colour), var(--light-pink-colour), var(--orange-colour), var(--light-orange-colour));
}
input[type=range]:focus::-ms-fill-upper {
  background: linear-gradient(255deg, var(--dark-purple-colour), var(--purple-colour), var(--pink-colour), var(--light-pink-colour), var(--orange-colour), var(--light-orange-colour));
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  transition: 0.2s;
  background: linear-gradient(255deg, var(--dark-purple-colour), var(--purple-colour), var(--pink-colour), var(--light-pink-colour), var(--orange-colour), var(--light-orange-colour));
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}
input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid var(--pink-colour);
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: rgba(179, 73, 80,0.9);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
.small {
    font-size: 0.8rem;
}
@media only screen and (max-width: 768px) {
    #filter__container{
    padding: 5px;
    margin: auto;
    width: 80%;
    background-color: white;
    color: black;
    height: 50vh;
    border-radius: 10px;
    border: 1px solid rgb(213, 213, 213);
    box-shadow: 3px 5px 10px 3px rgba(79, 79, 79, 0.3);

}
label {
    padding: 5px;
    display: inline-block;
    font-size: 1.5rem;
    margin-right: 5px;
    cursor: pointer;
}

}
</style>