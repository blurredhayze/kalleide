const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');

const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const album = document.querySelector('#album');
const duration = document.querySelector('#duration');

const cover = document.querySelector('#cover');
const tracklist = document.querySelector('.playlist');

//Song list
var songlist = {
                "songs": [
                {
                    "name": "Supersonic",
                    "artist": "Bad Religion",
                    "album": "The Process Of Belief",
                    "duration": "01:47",
                    "url": "https://files.catbox.moe/yheyac.mp3",
                    "cover_art_url": "https://sugarforbrains.neocities.org/frame/10_ds.png"
                },
                {
                    "name": "Bottom Line",
                    "artist": "Lemon Demon",
                    "album": "Damn Skippy",
                    "duration": "04:43",
                    "url": "https://files.catbox.moe/3eokoy.mp3",
                    "cover_art_url": "https://sugarforbrains.neocities.org/frame/1_ds.png"
                },
                {
                    "name": "HAPPY☆ANGEL",
                    "artist": "jun with TAHIRIH",
                    "album": "Unreleased",
                    "duration": "01:55",
                    "url": "https://files.catbox.moe/gbosvb.mp3",
                    "cover_art_url": "https://sugarforbrains.neocities.org/frame/2_ds.png"
                },
                {
                    "name": "Drown",
                    "artist": "F-777",
                    "album": "Unreleased",
                    "duration": "02:41",
                    "url": "https://files.catbox.moe/yq93qt.mp3",
                    "cover_art_url": "https://sugarforbrains.neocities.org/frame/3_ds.png"
                },
                {
                    "name": "barbarian",
                    "artist": "B.A.A.D.D.D",
                    "album": "demo",
                    "duration": "02:23",
                    "url": "https://files.catbox.moe/8vniix.mp3",
                    "cover_art_url": "https://sugarforbrains.neocities.org/frame/4_ds.png"
                },
                {
                    "name": "Crutch",
                    "artist": "Rabbit Junk",
                    "album": "Reframe",
                    "duration": "03:58",
                    "url": "https://files.catbox.moe/8ah79b.mp3",
                    "cover_art_url": "https://sugarforbrains.neocities.org/frame/5_ds.png"
                },
                {
                    "name": "Rainbow In The Sky",
                    "artist": "DJ Paul Elstak",
                    "album": "Rainbow In The Sky",
                    "duration": "03:39",
                    "url": "https://files.catbox.moe/u6062x.mp3",
                    "cover_art_url": "https://sugarforbrains.neocities.org/frame/6_ds.png"
                },
                {
                    "name": "Ringe Dinge Ding",
                    "artist": "DJ Splash",
                    "album": "Ringe Dinge Ding",
                    "duration": "03:03",
                    "url": "https://files.catbox.moe/w4g3ny.mp3",
                    "cover_art_url": "https://sugarforbrains.neocities.org/frame/7_ds.png"
                },
                {
                    "name": "Dance Commander",
                    "artist": "Electric Six",
                    "album": "Fire",
                    "duration": "02:37",
                    "url": "https://files.catbox.moe/4txaym.mp3",
                    "cover_art_url": "https://sugarforbrains.neocities.org/frame/8_ds.png"
                }
                ]
              };

JSON.stringify(songlist);

//Keep track of the songs
let songIndex = 0;

//Initially load song info DOM
loadSong(songIndex)

//Update song details
function loadSong(songIndex) {
    title.innerText = songlist.songs[songIndex].name;
    artist.innerText = songlist.songs[songIndex].artist;
    album.innerText = songlist.songs[songIndex].album;
    duration.innerText = songlist.songs[songIndex].duration;
    
    audio.src = songlist.songs[songIndex].url;
    cover.src = songlist.songs[songIndex].cover_art_url;
    audio.volume = 0.5;
}

function playSong() {
    musicContainer.classList.add('play')
    
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    
    audio.pause()
}

function prevSong() {
    songIndex--
    
    if(songIndex < 0) {
        songIndex = songlist.songs.length - 1
    }
    
    loadSong(songIndex)
    
    playSong()
}

function nextSong() {
    songIndex++
    
    if(songIndex > songlist.songs.length - 1) {
        songIndex = 0
    }
    
    loadSong(songIndex)
    
    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    console.log(width)
    const clickX = e.offsetX
    const duration = audio.duration
    
    audio.currentTime = (clickX / width) * duration
    console.log(e.srcElement)
}

function setTrack(index) {
    loadSong(index);
    playSong();
    songIndex = index;
    
    //Update the highlighted track
    let tracklistItems = tracklist.getElementsByTagName('li');
    for(i = 0; i < songlist.songs.length; i++) {
        let trackIndex = tracklistItems[i].getAttribute('data-index');
        if(trackIndex == songIndex) {
            tracklistItems[i].className += " activeSong";
        } else {
            tracklistItems[i].className = tracklistItems[i].className.replace(" activeSong", "");
        }
    }
}

// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('playButton')
    
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

//Tracklist
let tracklistItems = tracklist.getElementsByTagName('li');
for(i = 0; i < songlist.songs.length; i++) {
    let trackIndex = tracklistItems[i].getAttribute('data-index');
    
    let tracklistItemTitle = tracklistItems[i].getElementsByClassName('trackTitle');
    let tracklistItemArtist = tracklistItems[i].getElementsByClassName('trackArtist');
    let tracklistItemDuration = tracklistItems[i].getElementsByClassName('trackDuration');
    
    tracklistItemTitle[0].innerHTML = songlist.songs[trackIndex].name;
    tracklistItemArtist[0].innerHTML = songlist.songs[trackIndex].artist;
    tracklistItemDuration[0].innerText = songlist.songs[trackIndex].duration;
    
    if(trackIndex == songIndex) {
        tracklistItems[i].className += " activeSong";
    } else {
        tracklistItems[i].className = tracklistItems[i].className.replace(" activeSong", "");
    }
}
