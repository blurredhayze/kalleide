const audio = document.querySelector('#audio');
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#playButton');
const prevBtn = document.querySelector('#prevButton');
const nextBtn = document.querySelector('#nextButton');
const title = document.querySelector('#title');
const cover = document.querySelector('#coverimg');

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);

function playSong() {
    musicContainer.classList.add('play')
    audio.play()
    isPlaying = true
}

function pauseSong() {
    musicContainer.classList.remove('play')
    audio.pause()
    isPlaying = false
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

function loadSong(songIndex) {    
    title.innerText = songlist.songs[songIndex].name;
    audio.src = songlist.songs[songIndex].url;
    cover.src = songlist.songs[songIndex].cover_art_url;
    audio.volume = 0.5;
}


//Song list
var songlist = {
    "songs": [
    {
        "name": "The Zenith",
        "artist": "Starflyer 59",
        "album": "Starflyer 59",
        "duration": "05:36",
        "url": "https://files.catbox.moe/2zdk3p.mp3",
        "cover_art_url": "https://files.catbox.moe/xlsgds.png"
    },
    {
        "name": "renaissance fair",
        "artist": "Saturnalias",
        "album": "Bugfest",
        "duration": "02:23",
        "url": "https://files.catbox.moe/5986a3.mp3",
        "cover_art_url": "https://files.catbox.moe/pi0xe3.jpg"
    },
    {
        "name": "My Blue Heaven",
        "artist": "Glixen",
        "album": "She Only Said",
        "duration": "05:43",
        "url": "https://files.catbox.moe/1rveiq.mp3",
        "cover_art_url": "https://files.catbox.moe/k4gdur.jpg"
    },
    {
        "name": "Loveley Sewer",
        "artist": "Yves Tumor",
        "album": "Praise A Lord Who Chews But Which Does Not Consume",
        "duration": "03:15",
        "url": "https://files.catbox.moe/j450j1.mp3",
        "cover_art_url": "https://files.catbox.moe/35nfjj.jpeg"
    },
    {
        "name": "Lucky",
        "artist": "VARG2TM, Eartheater, Earth",
        "album": "Lucky",
        "duration": "03:23",
        "url": "https://files.catbox.moe/vrn9tp.mp3",
        "cover_art_url": "https://files.catbox.moe/lwu943.jpeg"
    },
    {
        "name": "Freak",
        "artist": "feeble little horse",
        "album": "Girl with Fish",
        "duration": "01:48",
        "url": "https://files.catbox.moe/ihmnjs.mp3 ",
        "cover_art_url": "https://files.catbox.moe/tds39j.jpg"
    },
    {
        "name": "Blue",
        "artist": "Bluegill",
        "album": "EP",
        "duration": "04:15",
        "url": "https://files.catbox.moe/cg441s.mp3",
        "cover_art_url": "https://files.catbox.moe/l4qr1l.jpeg"
    },
    {
        "name": "kmart amen break",
        "artist": "They Are Gutting A Body of Water",
        "album": "S",
        "duration": "02:40",
        "url": "https://files.catbox.moe/xctvaf.mp3",
        "cover_art_url": "https://files.catbox.moe/iqf3dd.jpg"
    },
    {
        "name": "Twin Flames",
        "artist": "Midrift",
        "album": "Midrift",
        "duration": "01:44",
        "url": "https://files.catbox.moe/wmc50u.mp3",
        "cover_art_url": "https://files.catbox.moe/u8k5l0.jpg"
    }
    ]
  };

JSON.stringify(songlist);

//Keep track of the songs
let songIndex = 0;