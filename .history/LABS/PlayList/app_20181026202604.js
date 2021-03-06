===================== Snippet 1

--------------------- song.js

function Song(title, artist, duration) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.isPlaying = false;
}

Song.prototype.play = function(){
    this.isPlaying = true;
}
Song.prototype.stop = function(){
    this.isPlaying = false;
}



Song.prototype.html = function(){
    return `<div class="row py-3 ${this.isPlaying ? 'current': ''}">
    <div class="col-sm-9">${this.title} - ${this.artist}</div>
    <div class="col-sm-3">${this.duration}</div>
</div>`
}


------------------------------ playlist.js

function PlayList(){
    this.songs = []
    this.currentIndex = 0;
}

PlayList.prototype.add = function(song){
    this.songs.push(song);
}
PlayList.prototype.play = function(){
    let song = this.songs[this.currentIndex];
    song.play();
}
PlayList.prototype.stop = function(){
    let song = this.songs[this.currentIndex];
    song.stop();
}
PlayList.prototype.next = function(){
    this.stop();
    this.currentIndex++;
    if(this.currentIndex === this.songs.length){
        this.currentIndex  = 0;
    }
    let song = this.songs[this.currentIndex];
    song.play();
}

PlayList.prototype.render = function(list){
    list.innerHTML  = '';
    return this.songs.forEach(song => {
        list.innerHTML += song.html();
    })
}

----------------------------------------- app.js

const playList = new PlayList();
const s1 = new Song('TEST', 'Tom', '03:12')
const s2 = new Song('TEST 1', 'Bill', '05:22')


playList.add(s1)
playList.add(s2)


const list = document.getElementById('list')
playList.render(list)


const play = document.getElementById('btn-play')
const stop = document.getElementById('btn-stop')
const next = document.getElementById('btn-next')

play.onclick = function(){
    playList.play();
    playList.render(list)
}

stop.onclick = function(){
    playList.stop();
    playList.render(list)
}

next.onclick = function(){
    playList.next();
    playList.render(list)
}






===================== Snippet 2


--------------------- media.js

function Media(title, duration) {
    this.title = title;
    this.duration = duration;
    this.isPlaying = false;
}
Media.prototype.play = function(){
    this.isPlaying = true;
}

Media.prototype.stop = function(){
    this.isPlaying = false;
}


-------------------------- movie.js

function Movie(title, year, duration) {
    this.year = year;
    Media.call(this, title, duration)
}
Movie.prototype = Object.create(Media.prototype)
Movie.prototype.constructor = Movie;

Movie.prototype.html = function(){
    return `<div class="row py-3 ${this.isPlaying ? 'current': ''}">
    <div class="col-sm-9">${this.title} - ${this.year}</div>
    <div class="col-sm-3">${this.duration}</div>
</div>`
}


--------------------- song.js
function Song(title, artist, duration) {
    this.artist = artist;
    Media.call(this, title, duration)
}
Song.prototype = Object.create(Media.prototype)
Song.prototype.constructor = Song;

Song.prototype.html = function(){
    return `<div class="row py-3 ${this.isPlaying ? 'current': ''}">
    <div class="col-sm-9">${this.title} - ${this.artist}</div>
    <div class="col-sm-3">${this.duration}</div>
</div>`
}


--------------------- index.html
// добавляем новій файлы media.js и  movie.js

<script src="playlist.js"></script>

<script src="media.js"></script>
<script src="movie.js"></script>

<script src="song.js"></script>
<script src="app.js"></script>


--------------------- playlist.js
//  Добавляем объект Movie

const playList = new PlayList();
const s1 = new Song('TEST', 'Tom', '03:12')
const s2 = new Song('TEST 1', 'Bill', '05:22')
const m1 = new Movie('Man of steel', 2012, '02:33:15')

playList.add(s1)
playList.add(s2)
playList.add(m1)


.......
// остальной код - без изменений




