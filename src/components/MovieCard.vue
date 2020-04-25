
<template>

    <div class="frame-movie" >
       <router-link :to="`movie/${id}`">
          <div class="frame-movie-head">
            <h2>{{title}}</h2>
          </div>
          <div class="frame-movie-body">
            <p id="description">{{handleText(description)}}</p>
          </div>
          
        <div class="frame-movie-body-footer">
            <div class="frame-movie-body-footer-info">
              <p>{{director}}</p>
              <p>{{producer}}</p>
            </div>
            <div class="frame-movie-body-footer-date">
            <p>{{date}}</p>
            <div v-if="idLike">
                <img @click="likeMovie" alt="like" src="../assets/favorite-24px.svg">
            </div>
            <div v-else>
                <img @click="likeMovie" alt="like" src="../assets/favorite_border-24px.svg">
            </div>
            </div>
        </div>
      </router-link>
    </div> 

 
</template>

<script>

export default {
  name: 'MovieCard',
  data: () => ({
      idLike: false
  }),
  props: {
    index: Number,
    id: String,
    title: String,
    description: String,
    director: String,
    producer: String,
    date: String,
    handleText: Function,
    handleLikeMovie: Function,
    handleImgLike: Function
  },

  methods: {
      likeMovie(){
          this.handleLikeMovie(this.id)
          this.idLike = !this.idLike
      }
  },

  mounted(){
    if(localStorage.getItem(`movie-${this.id}`) == 'false' || localStorage.getItem(`movie-${this.id}`) == null){
      this.idLike = false
    } else{
      this.idLike = true
    }    
  } 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.frame-movie{
    margin-bottom: 15px;
}
.frame-movie a{
    text-decoration: none;
    color: #2d3e4f;
    width: 260px;
    min-width: 260px;
    box-shadow: 0px 5px 9px rgba(0,0,0,.6);
    height: 365px;
    display: grid;
    grid-template-rows: 20% 50% 30%;
    cursor: pointer;
    transition: .4s;
    background-color: white;
  }
.frame-movie a:hover{
  transform: scale(1.1);
}  
 #description{
    text-align: justify;
    margin: 10px;
  } 
  .frame-movie-body-footer-info{
    display: flex;
    justify-content: space-evenly;
  }
  .frame-movie-body-footer-date p {
    margin: 0;
  }
  .frame-movie-body-footer-date img {
    float: right;
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
</style>
