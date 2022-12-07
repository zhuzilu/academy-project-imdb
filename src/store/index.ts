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
      filterGenre: true,
      typeTV: false,
      typeMovie: false,
      mood: ["Comedy", "Drama"] as  string[],
      movie: {},
    },
    /*getters: {
      getFilters(state){  
        let filters = '';
        filters += `&minRating=${state.minRating}&maxRating=${state.maxRating}`
        if(state.mood.length > 0){
          filters += `category=${mood.split().join(',')}`
        }
        
        return filters;
      }
    },*/
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
        },
        mood(state, payload){
          state.mood = payload;
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
      getFilterGenre({ commit, state}, genre) {
        if(state.mood.includes(genre)) {
          const newMood = state.mood.filter(mood => mood!== genre);
          commit("mood", newMood);
          console.log("dentro if getfiltergenre");
          console.log(newMood);
          console.log(state.mood);
        }
        else {
          commit("mood", [...state.mood, genre]);
          console.log("dentro else getfiltergenre");
          console.log(state.mood);
        }
      },
      async getMovies(context) {
        let res;
        //const filters = context.getters.getFilters();
        if ( !this.state.typeTV && !this.state.typeMovie && !this.state.filterGenre) {
            console.log("primer if");
              res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries,movie`);
            console.log(res);

            } else if (this.state.typeTV && !this.state.typeMovie && !this.state.filterGenre) {
            console.log("segundo if");

              res = await fetch(`http://localhost:8080/search/?maxNHits=15&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries`);
            
            } else if (!this.state.typeTV && this.state.typeMovie && !this.state.filterGenre) {
            console.log("tercer if");
              res = await fetch(`http://localhost:8080/search/?maxNHits=12&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=movie`);
            
            }  else if ( !this.state.typeTV && !this.state.typeMovie && this.state.filterGenre) {
              console.log("cuarto if");
              const moodList = this.state.mood.join(",");
              console.log(moodList);
                res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries,movie&genres=${moodList}`);
              console.log(res);
  
            } else if (this.state.typeTV && !this.state.typeMovie && this.state.filterGenre) {
              console.log("segundo if");
  
                res = await fetch(`http://localhost:8080/search/?maxNHits=15&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries&genres=${moodList}`);
              
            } else if (!this.state.typeTV && this.state.typeMovie && this.state.filterGenre) {
              console.log("tercer if");
                res = await fetch(`http://localhost:8080/search/?maxNHits=12&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=movie&genres=${moodList}`);
            }
          
          else {
            res = await fetch(`http://localhost:8080/search/?maxNHits=5&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=movie&genres=${moodList}`);

          }
      
        
        const data = await res.json();
        console.log(data);
        const movies = data.hits;
          
        context.commit("setMovies", movies);

        },
    },
});
