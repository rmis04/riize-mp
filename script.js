/* =====================================================
   Apple Music Player
   Cleaned & Optimized
===================================================== */

// ===========================
// Elements
// ===========================

const trackName = document.querySelector(".songtitle");
const playButton = document.querySelector(".playpause-track");

const seekSlider = document.querySelector(".seek_slider");
const currentTimeText = document.querySelector(".current-time");
const durationText = document.querySelector(".total-duration");

const audio = document.getElementById("music");

// ===========================
// Playlist
// ===========================

const trackList = [

{
    name: "Odyssey - 라이즈",
    path: "https://files.catbox.moe/vd78ja.mp3"
},
  
{
    name: "Memories - 라이즈",
    path: "https://files.catbox.moe/mt8ssj.mp3"
},

{
    name: "In A Loop - 라이즈",
    path: "https://files.catbox.moe/uwdsvl.mp3"
},
  {
    name: "Sticky Like - 라이즈",
    path: "https://files.catbox.moe/ji9vqe.mp3"
},
    {
    name: "Get A Guitar - 라이즈",
    path: "https://files.catbox.moe/0bp66f.mp3"
}

];

// ===========================
// Variables
// ===========================

let trackIndex = 0;
let isPlaying = false;

// ===========================
// Load Track
// ===========================

function loadTrack(index){

    const track = trackList[index];

    audio.src = track.path;

    trackName.textContent = track.name;

    currentTimeText.textContent = "0:00";
    durationText.textContent = "0:00";

    seekSlider.value = 0;

}

loadTrack(trackIndex);

// ===========================
// Play
// ===========================

function playTrack(){

    audio.play();

    isPlaying = true;

    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");

}

// ===========================
// Pause
// ===========================

function pauseTrack(){

    audio.pause();

    isPlaying = false;

    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");

}

// ===========================
// Toggle
// ===========================

function playpauseTrack(){

    if(isPlaying){

        pauseTrack();

    }else{

        playTrack();

    }

}

// ===========================
// Next
// ===========================

function nextTrack(){

    trackIndex++;

    if(trackIndex >= trackList.length){

        trackIndex = 0;

    }

    loadTrack(trackIndex);

    if(isPlaying){

        playTrack();

    }

}

// ===========================
// Previous
// ===========================

function prevTrack(){

    trackIndex--;

    if(trackIndex < 0){

        trackIndex = trackList.length - 1;

    }

    loadTrack(trackIndex);

    if(isPlaying){

        playTrack();

    }

}

// ===========================
// Volume
// ===========================

function volumeUp(){

    audio.volume = Math.min(
        1,
        audio.volume + 0.1
    );

}

function volumeDown(){

    audio.volume = Math.max(
        0,
        audio.volume - 0.1
    );

}

// ===========================
// Seek
// ===========================

function seekTo(){

    if(audio.duration){

        audio.currentTime =
            audio.duration *
            (seekSlider.value / 100);

    }

}

// ===========================
// Update Progress
// ===========================

function updateProgress(){

    if(isNaN(audio.duration)) return;

    const progress =
        (audio.currentTime / audio.duration) * 100;

    seekSlider.value = progress;

    currentTimeText.textContent =
        formatTime(audio.currentTime);

    durationText.textContent =
        formatTime(audio.duration);

}

// ===========================
// Format Time
// ===========================

function formatTime(seconds){

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2,"0")}`;

}

// ===========================
// Events
// ===========================

audio.addEventListener(
    "timeupdate",
    updateProgress
);

audio.addEventListener(
    "ended",
    nextTrack
);

audio.addEventListener(
    "loadedmetadata",
    updateProgress
);

seekSlider.addEventListener(
    "input",
    seekTo
);
