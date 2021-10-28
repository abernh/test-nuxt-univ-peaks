import Peaks from 'peaks.js'
import Vue from 'vue'

Vue.use((Vue, options) => {
  Vue.prototype.$peaks = Peaks
})
