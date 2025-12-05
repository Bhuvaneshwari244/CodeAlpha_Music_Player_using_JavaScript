// Songs Array
const songs = [
    { title: "Song 1", artist: "Artist 1", src: "songs/song1.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "songs/song2.mp3" },
    { title: "Song 3", artist: "Artist 3", src: "songs/song3.mp3" }
];

let currentSongIndex = 0;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

// Initialize Playlist
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong();
        playSong();
    });
    playlistEl.appendChild(li);
});

// Load Song
function loadSong() {
    const song = songs[currentSongIndex];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    updateActivePlaylist();
}

// Play / Pause Toggle
function playSong() {
    audio.play();
    playBtn.textContent = '⏸️';
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
    if(audio.paused){
        playSong();
    } else {
        pauseSong();
    }
});

// Previous / Next
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
    playSong();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
    playSong();
});

// Update Progress
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;

    // Update Time
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Format Time
function formatTime(time) {
    if(isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Auto Next Song
audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Highlight Active Song
function updateActivePlaylist() {
    const items = playlistEl.querySelectorAll('li');
    items.forEach((li, index) => {
        li.classList.toggle('active', index === currentSongIndex);
    });
}

// Initial Load
loadSong();
