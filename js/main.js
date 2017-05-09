/*jslint esversion: 6, browser: true*/
/*global window, $, jQuery, alert*/

// Constants to hold video element, spans that contain the transcript, and an array that holds the transcript timeline
const videoFile = document.getElementById('training-video');
const container = document.querySelector('.inner-container');
const timespans = document.getElementsByClassName('tspan');
const timelines = [
  ['t01', 0.240, 4.130],
  ['t02', 4.130, 7.535],
  ['t03', 7.535, 11.270],
  ['t04', 11.270, 13.960],
  ['t05', 13.960, 17.940],
  ['t06', 17.940, 22.370],
  ['t07', 22.370, 26.880],
  ['t08', 26.880, 30.920],
  ['t09', 32.100, 34.730],
  ['t10', 34.730, 39.430],
  ['t11', 39.430, 41.190],
  ['t12', 42.350, 46.300],
  ['t13', 46.300, 49.270],
  ['t14', 49.270, 53.760],
  ['t15', 53.760, 57.780],
  ['t16', 57.780, 60.150]
];

// Listen for the timeupdate event when video is playing
videoFile.addEventListener('timeupdate', e => {
  let cTime = e.target.currentTime;

  // Use currentTime value to find which timeline corresponds to the video's play position
  timelines.forEach( timeline => {
    let id = timeline[0];
    let span = document.getElementById(id);
    
    // When match is found add hightlight class to apply styles
    if (cTime >= timeline[1] && cTime < timeline[2]) {
      span.className = 'highlight';
    // For timelines that do not match, remove the highlight class
    } else {
      span.className = '';
    }
  });
},false);

// Add a click event to the transcript container and its children. If a span is clicked proceed with code execution, else ignore click event
container.addEventListener('click', e => {
  if (e.target.tagName === 'SPAN') {
    // Find clicked span's id in timelines array and get start time for that segment. Set currentTime equal to segment start time
    timelines.forEach ( timesline => {
      if (e.target.id === timesline[0]) {
        videoFile.currentTime = timesline[1];
        // If video is paused, set video playing at selected segment
        if (!videoFile.play()) {
          videoFile.play();
        }
      }
    });    
  };
});

