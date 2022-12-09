import { createStore } from 'vuex';

export default createStore({
    state: {
      movies: [] as any[],
      minRating: 3,
      maxRating: 9,
      minYear: 1999,
      maxYear: 2023,
      minDuration: 90,
      maxDuration: 120,
      filterYear: true,
      filterDuration: true,
      filterRating: true,
      typeTV: false,
      typeMovie: false,
      mood: [] as  string[],
      movie: {},
    },
    mutations: {
        setMovies(state, payload) {
          state.movies = payload;
        },
        setMinYear(state, payload){
          state.minYear = payload;
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
        },
        typeTv(state, payload){
          state.typeTV = payload;
        },
        typeMovie(state, payload){
          state.typeMovie = payload;
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
      getTypeTv(context, payload) {
        context.commit("typeTv", payload);
      },
      getTypeMovie(context, payload) {
        context.commit("typeMovie", payload);
      },
      getFilterGenre({ commit, state}, genre) {
        if(state.mood.includes(genre)) {
          const newMood = state.mood.filter(mood => mood!== genre);
          commit("mood", newMood);
        }
        else {
          commit("mood", [...state.mood, genre]);
        }
      },
      async getMovies(context) {
        let res;
       
        if (this.state.mood.length > 0){
          if ( !this.state.typeTV && !this.state.typeMovie ) {
            let moodList = this.state.mood.join(",");
              res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries,movie&genres=${moodList}`);
            } else if (this.state.typeTV && !this.state.typeMovie) {
            const moodList = this.state.mood.join(",");
              res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries&genres=${moodList}`);
            } else if (!this.state.typeTV && this.state.typeMovie) {
            let moodList = this.state.mood.join(",");
              res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=movie&genres=${moodList}`);
            }  
        } else if (!this.state.typeTV && this.state.typeMovie) {
         
            let res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=movie`);

          } else if (!this.state.typeTV && !this.state.typeMovie) {
              res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=movie,tvSeries`);
            }  
            else if (this.state.typeTV && !this.state.typeMovie) {
                res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries`);
              }             
            else if (this.state.typeTV && this.state.typeMovie) {
              res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=tvSeries,movie`);
            }  
        else {
            res = await fetch(`http://localhost:8080/search/?maxNHits=20&minYear=${this.state.minYear}&maxYear=${this.state.maxYear}&minScore=${this.state.minRating}&maxScore=${this.state.maxRating}&minMinutes=${this.state.minDuration}&maxMinutes=${this.state.maxDuration}&type=movie,tvSeries`);
        }
      

      if(res){
        const data = await res.json();
        
        const movies = data.hits;
      

        for (let movie of movies) {

          const posterRequest = await fetch("https://www.omdbapi.com/?apikey=bffa80ef&t="+movie.primaryTitle);
          const posterData = await posterRequest.json();
          movie.image = posterData.Poster;
          
        };
        
        context.commit("setMovies", movies);
        
      }
  
      },
    },
});
