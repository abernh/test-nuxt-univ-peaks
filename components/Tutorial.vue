<template>
  <div>
    <div>{{some}}</div>
    <div>{{peaksInfo}}</div>

    <div id="waveform-container">
      <div id="zoomview-container" ref="zoom"></div>
      <div id="overview-container" ref="view"></div>
    </div>
    <div id="demo-controls">
      <audio id="audio" controls="controls" ref="audio">
        <source :src="require('@/static/TOL_6min_720p_download.mp3').default" type="audio/mpeg">
        <source :src="require('@/static/TOL_6min_720p_download.ogg').default" type="audio/ogg">
        Your browser does not support the audio element.
      </audio>

      <div id="controls">
        <button data-action="zoom-in">Zoom in</button>
        <button data-action="zoom-out">Zoom out</button>
        <button data-action="add-segment">Add a Segment at current time</button>
        <button data-action="add-point">Add a Point at current time</button>
        <button data-action="log-data">Log segments/points</button>
        <input type="text" id="seek-time" value="0.0">
        <button data-action="seek">Seek</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){ return {
    peaks: null,
    some: 'x',
    peaksInfo: null
  }},
  mounted(){

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    const audioElement = this.$refs.audio; // document.getElementById('audio');

    const options = {
      containers: {
        zoomview: this.$refs.zoom, // document.getElementById('zoomview-container'),
        overview: this.$refs.view // document.getElementById('overview-container')
      },
      mediaElement: audioElement,
      webAudio: {
        audioContext,
        scale: 128,
        multiChannel: false
      },
      keyboard: true,
      pointMarkerColor: '#006eb0',
      showPlayheadTime: true,
      zoomLevels: [128, 256, 512, 1024, 2048, 4096]
    };

    this.some = typeof this.$peaks.init
    this.peaksInfo = Object.keys(this.$peaks || {})
    // this.x = options;
    const p1 = this.$peaks.init(options, (err, peaks) => {
      console.log(err, peaks)

      this.peaks = peaks;
    })

    console.log('p1', p1)
  }
}

</script>
<style>
body {
  font-family: 'Helvetica neue', Helvetica, Arial, sans-serif;
}

#titles, #waveform-container {
  margin: 24px auto;
  width: 1000px;
}

#zoomview-container, #overview-container {
  margin: 0 0 24px 0;
  line-height: 0;
  -moz-box-shadow: 3px 3px 20px #919191;
  -webkit-box-shadow: 3px 3px 20px #919191;
  box-shadow: 3px 3px 20px #919191;
}

#zoomview-container {
  height: 200px;
}

#overview-container {
  height: 85px;
}

#demo-controls {
  margin: 0 auto 24px auto;
  width: 1000px;
  display: flex;
  align-items: center;
}

#demo-controls button {
  background: #fff;
  border: 1px solid #919191;
  cursor: pointer;
}

#audio {
  flex: 0 0 30%;
}

#controls {
  flex: 1;
  margin-left: 1em;
}

#seek-time {
  width: 4em;
}

.log {
  margin: 0 auto 24px auto;
  width: 1000px;
}

table {
  width: 100%;
}

table th {
  text-align: left;
}

table th, table td {
  padding: 0.5em;
}

.hide {
  display: none;
}
</style>
