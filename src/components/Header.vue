<template>
    <header v-bind:class="{'menu-open': menuHandle}">
        <div id="container-search">
            <img src="../assets/studig.png" alt="logo">
            <input type="text" />
        </div>
        <nav> 
            <div id="profile-info">
                <img id="icon-close-menu" src="../assets/close-24px.svg" alt="icon close">
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
             <router-link to='/'>
                <img src="../assets/incon-nav-home.svg" alt="icon">
                Home
            </router-link>
            <router-link to='/favorites'>
                <img src="../assets/icon-nav-favorite.svg" alt="icon">
                Favorites
            </router-link>
        </nav>
    </header>

</template>


<script>
export default {
    name: "Header",
    data: () => ({
        menuHandle: true
    }),
    mounted(){
        setTimeout(() => {
            this.menuHandle = true
        }, 3000);
    }
}
</script>

<style  scoped>
    header{
        height: 100vh;
        /* display: grid;
        grid-template-rows: 10% 90%; */
      
        
        width: 100%;
        transform: translateX(0%);
        transition: transform .6s;
    
    }
    #container-search{
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 8px;

    }
    #container-search img{
        width: 80px;
        border-radius: 5px;
        margin-bottom: 8px;
    }
    #container-search input{
        margin-left: 8px;
    }
    nav{
        position: absolute;
        background-color: #0093E9;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        /* margin-top: 50px; */
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        transform: translateX(-100%);
    }

    nav a{
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
    #profile-info #icon-close-menu{
        position: absolute;
        right: 0;
        top: 0;
        padding: 15px;
        cursor: pointer;
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
</style>