// GeminiLive.js
// Browser-side Gemini Live API demo: streams 16kHz mic audio + 1 FPS screen frames.
(function () {
  'use strict';

  const statusEl = document.getElementById('gemini-live-status');
  const ui = buildUi();

  const STORAGE_KEY = 'google_ai_studio_api_key';
  const MODEL = 'models/gemini-live-2.5-flash-preview';
  const WS_BASE =
    'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';

  let ws;
  let audioContext;
  let micStream;
  let screenStream;
  let processor;
  let screenTimer;
  let sourceNode;

  function setStatus(message) {
    if (statusEl) statusEl.textContent = message;
    ui.status.textContent = message;
  }

  function buildUi() {
    const wrap = document.createElement('section');
    wrap.style.marginTop = '1rem';

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start Gemini Live Session';
    startBtn.style.marginRight = '0.5rem';

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop Session';
    stopBtn.disabled = true;

    const status = document.createElement('p');
    status.textContent = 'Ready';

    wrap.appendChild(startBtn);
    wrap.appendChild(stopBtn);
    wrap.appendChild(status);
    document.body.appendChild(wrap);

    startBtn.addEventListener('click', startSession);
    stopBtn.addEventListener('click', stopSession);

    return { startBtn, stopBtn, status };
  }

  function pcm16ToBase64(float32) {
    const pcm = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i += 1) {
      const s = Math.max(-1, Math.min(1, float32[i]));
      pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const bytes = new Uint8Array(pcm.buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i += 1) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function downsampleTo16k(float32Samples, inputRate) {
    if (inputRate === 16000) return float32Samples;
    const ratio = inputRate / 16000;
    const outLength = Math.round(float32Samples.length / ratio);
    const result = new Float32Array(outLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
      let accum = 0;
      let count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < float32Samples.length; i += 1) {
        accum += float32Samples[i];
        count += 1;
      }
      result[offsetResult] = accum / Math.max(1, count);
      offsetResult += 1;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }

  async function startSession() {
    try {
      ui.startBtn.disabled = true;
      let apiKey = sessionStorage.getItem(STORAGE_KEY);
      if (!apiKey) {
        apiKey = window.prompt('Enter your Google AI Studio API key:');
        if (!apiKey) throw new Error('No API key entered.');
        sessionStorage.setItem(STORAGE_KEY, apiKey.trim());
      }

      setStatus('Requesting microphone and screen permissions...');
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });

      setStatus('Opening Gemini Live WebSocket...');
      ws = new WebSocket(`${WS_BASE}?key=${encodeURIComponent(apiKey)}`);

      ws.onopen = async () => {
        ws.send(
          JSON.stringify({
            setup: {
              model: MODEL,
              generation_config: { response_modalities: ['TEXT'] }
            }
          })
        );

        await startAudioStreaming();
        await startScreenStreaming();

        ui.stopBtn.disabled = false;
        setStatus('Live session started. Streaming audio (16kHz) + screen (1fps).');
      };

      ws.onmessage = (event) => {
        console.debug('Gemini Live message:', event.data);
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setStatus('WebSocket error. See console for details.');
      };

      ws.onclose = () => {
        stopSession();
      };
    } catch (err) {
      console.error(err);
      setStatus(`Failed to start session: ${err.message}`);
      ui.startBtn.disabled = false;
    }
  }

  async function startAudioStreaming() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    sourceNode = audioContext.createMediaStreamSource(micStream);
    processor = audioContext.createScriptProcessor(4096, 1, 1);

    processor.onaudioprocess = (event) => {
      if (!ws || ws.readyState !== WebSocket.OPEN) return;
      const input = event.inputBuffer.getChannelData(0);
      const downsampled = downsampleTo16k(input, audioContext.sampleRate);
      const payload = {
        realtime_input: {
          media_chunks: [
            {
              mime_type: 'audio/pcm;rate=16000',
              data: pcm16ToBase64(downsampled)
            }
          ]
        }
      };
      ws.send(JSON.stringify(payload));
    };

    sourceNode.connect(processor);
    processor.connect(audioContext.destination);
  }

  async function startScreenStreaming() {
    const videoTrack = screenStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoTrack);

    screenTimer = window.setInterval(async () => {
      if (!ws || ws.readyState !== WebSocket.OPEN) return;
      try {
        const frameBitmap = await imageCapture.grabFrame();
        const canvas = document.createElement('canvas');
        canvas.width = frameBitmap.width;
        canvas.height = frameBitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(frameBitmap, 0, 0);

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.6));
        const buf = await blob.arrayBuffer();

        ws.send(
          JSON.stringify({
            realtime_input: {
              media_chunks: [
                {
                  mime_type: 'image/jpeg',
                  data: arrayBufferToBase64(buf)
                }
              ]
            }
          })
        );
      } catch (error) {
        console.warn('Screen frame capture error:', error);
      }
    }, 1000);
  }

  function stopSession() {
    if (screenTimer) {
      clearInterval(screenTimer);
      screenTimer = null;
    }

    if (processor) {
      processor.disconnect();
      processor = null;
    }

    if (sourceNode) {
      sourceNode.disconnect();
      sourceNode = null;
    }

    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }

    if (micStream) {
      micStream.getTracks().forEach((t) => t.stop());
      micStream = null;
    }

    if (screenStream) {
      screenStream.getTracks().forEach((t) => t.stop());
      screenStream = null;
    }

    if (ws && ws.readyState === WebSocket.OPEN) ws.close();
    ws = null;

    ui.startBtn.disabled = false;
    ui.stopBtn.disabled = true;
    setStatus('Session stopped.');
  }

  setStatus('GeminiLive.js loaded. Click start to begin.');
})();
