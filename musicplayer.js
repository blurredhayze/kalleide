const playBtn = document.querySelector('#playButton');
const musicContainer = document.querySelector('.music-container');
const audio = document.querySelector('#audio');

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

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