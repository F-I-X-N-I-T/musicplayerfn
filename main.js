let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  {
    name: "Reckless With My Heart",
    artist: "LEC",
    image: "./Music/track_a/LEC.jpg",
    path: "./Music/track_a/LEC Reckless with my heart.mp3"
  },
  {
    name: "Opening 1",
    artist: "Code Geass",
    image: "./Music/track_b/Code.jpg",
    path: "./Music/track_b/Code Geass Opening 1.mp3"
  },
  {
    name: "Continued Story",
    artist: "Code Geass",
    image: "./Music/track_c/Code.jpg",
    path: "./Music/track_c/Code Geass - Continued Story.mp3"
  },
  {
    name: "The Weight Of The World",
    artist: "Nier Automata",
    image: "./Music/track_d/Nier.jpg",
    path: "./Music/track_d/NieR Automata - OST - The Weight of the World.mp3"
  },
  {
    name: "The Interim",
    artist: "Nioh",
    image: "./Music/track_e/Nioh.jpg",
    path: "./Music/track_e/Nioh 2 - The Interim.mp3"
  },
  {
    name: "Age Of Extinction EP",
    artist: "Transformers",
    image: "./Music/track_f/Autobots.jpg",
    path: "./Music/track_f/Autobots Reunite (Transformers Age of Extinction EP).mp3"
  },
  {
    name: "Gol",
    artist: "Cali & El Dandee",
    image: "./Music/track_g/gol.jpg",
    path: "./Music/track_g/Cali Y El Dandee - Gol.mp3"
  },
  {
    name: "Die For You",
    artist: "Grabbitz",
    image: "./Music/track_h/valorant.jpg",
    path: "./Music/track_h/Die For You ft. Grabbitz.mp3"
  },
  {
    name: "Counting Stars",
    artist: "One Republic",
    image: "./Music/track_j/oneRepublic.jpg",
    path: "./Music/track_j/OneRepublic - Counting Stars.mp3"
  },
  {
    name: "Birds",
    artist: "Imagine Dragons",
    image: "./Music/track_k/birds.jpg",
    path: "./Music/track_k/Imagine Dragons - Birds.mp3"
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage =
     "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
     "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  updateTimer = setInterval(seekUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

  document.body.style.background = bgColor;
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;

  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;

  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index);
