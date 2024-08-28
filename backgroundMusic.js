var audio = document.getElementById('background-audio');
var muteButton = document.getElementById('mute-button');
audio.volume = 0.2;
function toggleMute() {
    if (audio.muted) {
        audio.muted = false;
        muteButton.className = 'fa fa-volume-mute fa-2x'; // Image for unmuted state
    } else {
        audio.muted = true;
        muteButton.className = 'fa fa-music fa-2x'; // Image for muted state
    }
}
