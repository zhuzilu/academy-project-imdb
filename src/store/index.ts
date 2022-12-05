import { createStore } from 'vuex';

export default createStore({
    state: {
      movies: [] as any[],
      minRating: 1,
      maxRating: 7,
      minYear: 1999,
      maxYear: 2023,
      minDuration: 91,
      maxDuration: 120,
      filterYear: true,
      filterDuration: true,
      filterRating: true,
      filterGenre: false,
      typeTV: true,
      typeMovie: true,
      mood: [] as any [],
      movie: {},
    },
    getters: {
      getFilters({ state }){  
        let filters = '';
        filters += `minRating=${state.rating.minRating}&maxRat`
        if(state.mood.length > 0){
          filters += `category=${mood.split().join(',')}`
        }
        
        return filters;
      }
    },
    mutations: {
        setMovies(state, payload) {
          console.log("setmovies");
          state.movies = payload;
        },
        setMinYear(state, payload){
          console.log("setminyear");

          state.minYear = payload;
          console.log(payload);
        },
        setMaxYear(state, payload){
          state.maxYear = payload;
        },
        setMinRating(state, payload){
          state.minRating = payload;
        },
        setMaxRating(state, payload){
          state.maxRating = payload;
        },
        setMinDuration(state, payload){
          state.minDuration = payload;
        },
        setMaxDuration(state, payload){
          state.maxDuration = payload;
        },
        setMovie(state, payload){
          state.movie = payload;
        }
    },
    actions: {
      getMinYear (context, payload){
        context.commit("setMinYear", payload);
      },
      getMaxYear (context, payload){
        context.commit("setMaxYear", payload);
      },
      getMinRating (context, payload){
        context.commit("setMinRating", payload);
      },
      getMaxRating (context, payload){
        context.commit("setMaxRating", payload);
      },
      getMinDuration (context, payload){
        context.commit("setMinDuration", payload);
      },
      getMaxDuration (context, payload){
        context.commit("setMaxDuration", payload);
      },
      getMovie(context, payload) {
        context.commit("setMovie", payload);
      },
      async getMovies(context) {
        let res;
        const filters = context.getters.getFilters();
        if (this.state.filterYear && this.state.filterDuration && this.state.filterRating && !this.state.typeTV && !this.state.typeMovie && !this.state.filterGenre) {
            console.log("primer if");
              res = await fetch(`http://localhost:8080/search/?maxNHits=10&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minRating=${this.state.minRating}&maxRating=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries,movie`);
        
            } else if (this.state.filterYear && this.state.filterDuration && this.state.filterRating && this.state.typeTV && !this.state.typeMovie && !this.state.filterGenre) {
              res = await fetch(`http://localhost:8080/search/?maxNHits=15&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minRating=${this.state.minRating}&maxRating=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries`);
            
            } else if (this.state.filterYear && this.state.filterDuration && this.state.filterRating && this.state.typeTV && !this.state.typeMovie && !this.state.filterGenre) {
              res = await fetch(`http://localhost:8080/search/?maxNHits=12&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minRating=${this.state.minRating}&maxRating=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=movie`);
             
            }
          
          else {
            res = await fetch(`http://localhost:8080/search/?maxNHits=12&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minRating=${this.state.minRating}&maxRating=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=movie`);

          }
      
        
        const data = await res.json();
        const movies = data.hits;
          
        context.commit("setMovies", movies);

        },
    },
});
