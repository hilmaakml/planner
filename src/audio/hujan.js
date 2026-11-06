// Web Audio generator: noise + lowpass filter untuk suara hujan

let audioContext = null
let gainNode = null
let filterNode = null
let noiseSource = null
let isPlaying = false

function createNoiseBuffer(ctx) {
  const bufferSize = ctx.sampleRate * 2
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }
  return buffer
}

export function nyalakan() {
  if (isPlaying) return

  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      gainNode = audioContext.createGain()
      gainNode.gain.value = 0.15
      
      filterNode = audioContext.createBiquadFilter()
      filterNode.type = 'lowpass'
      filterNode.frequency.value = 800
      
      filterNode.connect(gainNode)
      gainNode.connect(audioContext.destination)
    }

    noiseSource = audioContext.createBufferSource()
    noiseSource.buffer = createNoiseBuffer(audioContext)
    noiseSource.loop = true
    noiseSource.connect(filterNode)
    noiseSource.start(0)
    
    isPlaying = true
    return true
  } catch (err) {
    console.error('Audio gagal:', err)
    return false
  }
}

export function matikan() {
  if (!isPlaying) return

  if (noiseSource) {
    noiseSource.stop()
    noiseSource.disconnect()
    noiseSource = null
  }
  
  isPlaying = false
}

export function statusNyala() {
  return isPlaying
}
