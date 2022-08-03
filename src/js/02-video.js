import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay,1000));
setVideoTime();


function onPlay(event) {
    localStorage.setItem(STORAGE_KEY, event.seconds);
}


function setVideoTime() {
    const videoPlayerCurrentTime = localStorage.getItem(STORAGE_KEY);

    if (videoPlayerCurrentTime) {
        player.setCurrentTime(videoPlayerCurrentTime).then(function (seconds) {
        // seconds = the actual time that the player seeked to
            }).catch(function(error) {
                switch (error.name) {
                    case 'RangeError':
                        // the time was less than 0 or greater than the video’s duration
                        break;
                default:
                    // some other error occurred
                    break;
                }
            })
    }
}