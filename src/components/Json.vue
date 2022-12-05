<template>
    <div class="main-section">
        <div class="results">
            <h3 class="h3__title">Results from downloaded JSON</h3>
            <div class="card__section">
                <div class="card__container"  id="{{data.hits[0].id}}" @onclick="dragStart" @dragend="dragEnd" draggable="true" >
                    <img class="card__poster" src="http://image.tmdb.org/t/p/w500//gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg" alt="">
                    
                    <div class="card__buttons">
                        <button href="#" class="card__button save"><i class="uil uil-bookmark-full"></i></button>
                        <button href="#" class="card__button seen"><i class="uil uil-check"></i></button>
                    </div>
                    <div class="card__rating">
                        <img draggable="false" class="card__imdb__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="">
                        <p class="card__imdb__rating"><span class="bold">{{data.hits[0].averageRating}}</span>/10</p>
                    </div>
                    <div class="card__type">
                        <p>{{data.hits[0].titleType}}</p>
                    </div>
                    <div class="card__data">
                        <p class="card__title">{{data.hits[0].primaryTitle}}</p>
                    </div>
                </div>

                <div class="card__container"  id="{{data.hits[1].id}}" @onclick="dragStart" @dragend="dragEnd" draggable="true" >
                    <img class="card__poster" src="https://m.media-amazon.com/images/M/MV5BMTczNTQ4OTEyNV5BMl5BanBnXkFtZTgwNDgyMDI3NjE@._V1_.jpg" alt="">
                    
                    <div class="card__buttons">
                        <button href="#" class="card__button save"><i class="uil uil-bookmark-full"></i></button>
                        <button href="#" class="card__button seen"><i class="uil uil-check"></i></button>
                    </div>
                    <div class="card__rating">
                        <img draggable="false" class="card__imdb__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="">
                        <p class="card__imdb__rating"><span class="bold">{{data.hits[1].averageRating}}</span>/10</p>
                    </div>
                    <div class="card__type">
                        <p>{{data.hits[1].titleType}}</p>
                    </div>
                    <div class="card__data">
                        <p class="card__title">{{data.hits[1].primaryTitle}}</p>
                    </div>
                </div>

                <div class="card__container"  id="{{data.hits[2].id}}" @onclick="dragStart" @dragend="dragEnd" draggable="true" >
                    <img class="card__poster" src="https://i.pinimg.com/474x/fc/06/1f/fc061f21426f19d4da73be8d961d2e33.jpg" alt="">
                    
                    <div class="card__buttons">
                        <button href="#" class="card__button save"><i class="uil uil-bookmark-full"></i></button>
                        <button href="#" class="card__button seen"><i class="uil uil-check"></i></button>
                    </div>
                    <div class="card__rating">
                        <img draggable="false" class="card__imdb__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="">
                        <p class="card__imdb__rating"><span class="bold">{{data.hits[2].averageRating}}</span>/10</p>
                    </div>
                    <div class="card__type">
                        <p>{{data.hits[2].titleType}}</p>
                    </div>
                    <div class="card__data">
                        <p class="card__title">{{data.hits[2].primaryTitle}}</p>
                    </div>
                </div>
            </div>
        </div>
                   
        <div 
            class="dragdrop"
            @dragover="dragOver" 
            @dragenter="dragEnter" 
            @dragleave="dragLeave" 
            @drop="dragDrop" 
        >
            <h3 class="h3__title"><i class="uil uil-bookmark-full"></i> Drag & Drop from Downloaded JSON</h3>
        </div>
        <!-- <Card v-for="result in results" :result="result" /> -->
    
        <!--
        <RangeFilter :min="1940" :max="2023" :type="date" />
        <RangeFilter :min="0" :max="10" :type="rating" />
        -->

    </div>
    <div>
     
    </div>
    
</template>

<script>
import jsonData from './jsonData.json'


export default {
    data () {
        return {
            data: jsonData,
    
        }
    },
    methods: {
    dragStart: function() {
        this.className += ' hold';
        console.log("start");
    },

    dragEnd: function() {
        const imgDraggable = document.querySelector('.card__container');

        imgDraggable.className = 'card__container';
    },

    dragOver: function(e) {
        const dragdrop = document.querySelector('.dragdrop');
        e.preventDefault();
    },
    dragEnter: function() {
        const dragdrop = document.querySelector('.dragdrop');
        dragdrop.className += ' hovered';
    },
    dragDrop: function() {
        const imgDraggable = document.querySelector('.card__container');


        const dragdrop = document.querySelector('.dragdrop');
        dragdrop.append(imgDraggable);
    }
        }

}
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
}
.card__container:hover {
    box-shadow: 1px 2px 10px var(--light-orange-colour);
    
}
.card__poster {
    width: 175px;
    height: 250px;
    border-radius: 5px;
}
/*
.overlay {
    position: absolute;
    opacity: 0;
    bottom:0;
    width: 175px;
    height: 250px;
    border-radius: 5px;
    background: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.2),rgba(0,0,0,0.7));
    transition: .5s ease-in-out;
}
.overlay:hover {
    opacity: 1;
} */
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
.save:after{
    padding: 3px;
    font-size: 0.9rem;
    content: "Save";
    color: white;
    opacity: 0;
    position: absolute;
    font-weight: bold;
}
.save:hover{
    width: 100px;
    background-color: var(--purple-colour);
}
.seen:after{
    padding: 3px;
    font-size: 0.9rem;
    content: "Seen";
    color: white;
    opacity: 0;
    position: absolute;
    font-weight: bold;
}
.seen:hover{
    width: 100px;
    background-color: var(--blue-colour);
}
.card__button:hover::after{
    opacity: 1;
}
.seen:hover{
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
.card__container:hover > .card__type{
    opacity: 1;
}
.card__type{
    position: absolute;
    bottom: 30px;
    right: 0;
    width: 60px;
    background: rgba(39, 38, 38, 0.7);
    color: white;
    margin-right: 10px;
    font-size: 0.8rem;
    border-radius: 25px;
    padding: 5px;
    border: 1px solid white;
    opacity: 0;
    transition: .6s ease-in-out;
    font-weight: bold;
}
.card__type:hover{
    background-color: var(--light-pink-colour);
}
.card__type p {
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

.main-section {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    color: white;
    height: 700px;
}


.dragdrop{
    border: 1px solid var(--light-purple-colour);
    display: flex;
    flex-direction: column;
    border-radius: 10px;
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