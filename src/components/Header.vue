<template>
    <header>
        <div id="container-search">
            <img src="../assets/studig.png" id="logo" alt="logo">
            <div id="searcher">
                <input type="text" :value="search_movie" @keyup="handleChangeSearch($event)" placeholder="Search movie" />
                <div v-if="search_movie">
                    <p v-for="(movie, index) of resultSearch" :key="index" @click="handleClickSearch(movie.id)"> 
                        <!-- <router-link :to="`movie/${movie.id}`"> -->
                            {{movie.title}}
                        <!-- </router-link> -->
                    </p>
                    <p v-if="loading_search">cargando...</p>
                </div>
            </div>
            
            <img @click="handleMenu" class="icon-menu" src="../assets/menu-24px.svg" alt="icon open">
         
        </div>
        <nav :class="{'menu-open': menuHandle}"> 
            <div id="profile-info">
                <img @click="handleMenu" class="icon-menu" src="../assets/close-24px.svg" alt="icon close">
                <figure>
                    <img src="../assets/profile.jpg" alt="profile image">
                </figure>
                <p>
                    Rumi Hîragi
                </p>
            </div>
            <!-- <figure>
                <img src="../assets/studig.png" alt="photo app">
            </figure> -->
             <router-link to='/' >
                <div @click="handleMenu">
                    <img  src="../assets/incon-nav-home.svg" alt="icon">
                    Home
                </div>
            </router-link>
            <router-link to='/favorites'>
                <div @click="handleMenu">
                    <img src="../assets/icon-nav-favorite.svg" alt="icon">
                    Favorites   
                </div>
           
            </router-link>
        </nav>
    </header>

</template>


<script>
import { mapState } from "vuex"
export default {
    name: "Header",
    data: () => ({
        menuHandle: false,
        resultSearch: []
    }),
    methods: {
        handleMenu(){
            this.menuHandle = !this.menuHandle
        },
        handleChangeSearch: function(event){
            let value = event.target.value
            this.$store.dispatch("filmsStore/changeValueSearch", value)            
        },
        handleClickSearch(id){
            
            if(this.$router.app._route.name == "movie"){
                if(id != this.$route.params.id){
                    this.$router.replace({params: {id: id}})
                }
                
            }else{
                this.$router.push({ path: `movie/${id}` })
            }
          this.$store.dispatch("filmsStore/changeValueSearch", "")   
        }
    },

    computed: {
        ...mapState("filmsStore",["search_movie", "loading_search"]),
    },
    watch: {
        "search_movie": function(){
            if(this.search_movie != ""){
               const result = this.$store.getters["filmsStore/getMovieSearchState"](this.search_movie)              
               this.resultSearch = result  
            }
            
        },
    }
}
</script>

<style  scoped> 
    header{

        width: 100%;
        transform: translateX(0%);
        transition: transform .6s;
    
    }
    #container-search #searcher{
        position: relative;
        width: 60%;
        display: flex;
        justify-content: center;
    }
    #container-search #searcher div{
        background: aliceblue;
        position: absolute;
        width: 90%;
        top: 100%;
        margin-left: 3px;
    }
    #container-search #searcher div p{
        cursor: pointer;
    }

    #container-search #searcher div p:hover{
        color: navy;
        transition: .3s;
    }
    #container-search{
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 8px;

    }
    #container-search #logo{
        width: 80px;
        border-radius: 5px;
        margin-bottom: 8px;
    }
    #container-search input{
        margin-left: 8px;
        outline: none;
    }
    nav{
        position: absolute;
        background-color: #0093E9;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        transition: transform .6s;
        /* margin-top: 50px; */
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        transform: translateX(-100%);
    }

    nav a{
        color: whitesmoke;
        text-decoration: none;
    }
    nav a div{
        padding: 8px;
        color: whitesmoke;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
    #profile-info{
        padding: 8px;
        display: flex;
    }
    .icon-menu{
        position: absolute;
        right: 0;
        top: 0;
        padding: 15px;
        cursor: pointer;
        width: 25px;
    }
    #profile-info p{
        margin-left: 8px;
        color: whitesmoke
    }
    
     #profile-info figure{
        margin: 0;
        padding: 0;
        width: 45px;
        height: 60px;
    }

     #profile-info figure img {
        width: 100%;
        border-radius: 50%;
    }
 
    .menu-open{
        transform: translateX(0);
    }

    @media (min-width: 700px) { 
        nav{
            background-color: #0093E9;
            background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            transform: none;
            position: fixed;
            width: 15%;
            /* display: none; */
            
        }
        #profile-info{
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 0;
        }
        .icon-menu{
            display: none;
        }
        #container-search #searcher div{
            width: 50%;
        }
        #container-search{
            flex-direction: row;
            justify-content: center;

        }
       
        
        #container-search input{
            width: 50%;
            height: 25px;

        }   
        nav a {
            width: 100%;
        } 
        nav a div{
            width: 100%;
            padding: 0;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
        } 
        nav a.router-link-exact-active::before{
            content: '▪';
            color: navy;
            width: 15px;
 
        }
    }
</style>