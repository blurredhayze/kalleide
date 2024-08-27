var audio = document.getElementById('background-audio');
var muteButton = document.getElementById('mute-button');
function toggleMute() {
    if (audio.muted) {
        audio.muted = false;
        muteButton.className = 'fa fa-deaf fa-2x'; // Image for unmuted state
    } else {
        audio.muted = true;
        muteButton.className = 'fa fa-music fa-2x'; // Image for muted state
    }
}
