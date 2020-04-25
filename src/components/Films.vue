<!--

-->


<template>
 <section>
   <h1>MOVIES</h1>
   
   <Loader v-show="this.loading_films"  />
   <div id="container-movies" v-if="!error">
     <div v-for="(film,index) in this.films" :key="index">
       <MovieCard 
       :index="index" 
       :id="film.id"
       :title="film.title"
       :description="film.description"
       :director="film.director" 
       :producer="film.producer"
       :date="film.release_date"
       :handleText="handleText"
       :handleLikeMovie="handleLikeMovie"
       />
    </div>
   </div> 
  <div id="error" v-else>
      <h4>{{error}}</h4>
  </div> 
   
 </section>
</template>

<script>

import Loader from './Loader'
import MovieCard from './MovieCard'
import { mapState, mapActions } from 'vuex'
import { FILMS_ERROR } from '../store/types/fimlsTypes'



export default {
  name: 'Films',
  components: {
    Loader,
    MovieCard
  },
  // props: {
  //   msg: String
  // }
  data: () => ({
  }),
  methods: ({
  handleText(text){
      const textLength = text.length;
      if(textLength > 250){
        const newText = text.slice(0,250).concat('...')
        return newText
      }
      return text
    },

  ...mapActions('filmsStore',['getAllFilmsApi', 'likedMovie']),
  handleLikeMovie(id){
    this.likedMovie(`movie-${id}`)
  },
   

  }),
 computed: {
    ...mapState('filmsStore',['films', 'loading_films', 'error']),
  },

  created(){   
    if(!this.films.length){
      this.getAllFilmsApi()
    }    
  },
  destroyed(){
       this.$store.commit(`filmsStore/${FILMS_ERROR}`, '')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#container-movies{
  display: grid;
  justify-content: center;
  grid-gap: 15px;
  padding: 15px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

@media (min-width: 700px) {
  section{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  section h1{
    align-self: center;
  }
  #container-movies{
    width: 100%;
    grid-template-columns: repeat(2,1fr); 
    width: 80%;
    overflow-y: scroll;
  } 

}
@media (min-width: 1300px) { 
  #container-movies{
    grid-template-columns: repeat(3,1fr); 

  } 
}
</style>
