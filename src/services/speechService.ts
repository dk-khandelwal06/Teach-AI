export class SpeechService {
  private static instance: SpeechService;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isMuted: boolean = false;
  private onWordCallback: ((word: string, index: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;
  private audioCtx: AudioContext | null = null;
  private oscillatorNode: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isSynthesizingTone: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public speak(
    text: string,
    language: 'en' | 'hi' | 'hinglish' = 'en',
    onWord?: (word: string, index: number) => void,
    onEnd?: () => void
  ) {
    this.stop();

    this.onWordCallback = onWord || null;
    this.onEndCallback = onEnd || null;

    if (this.isMuted) {
      // Simulate reading duration for subtitles if muted
      this.simulateSpeechPacing(text, onWord, onEnd);
      return;
    }

    if (!this.synth) {
      this.simulateSpeechPacing(text, onWord, onEnd);
      return;
    }

    // Cancel any stuck utterances
    this.synth.cancel();

    // Clean text for speech synthesis (strip markdown and LaTeX symbols)
    const cleanSpeechText = text
      .replace(/\\\w+/g, '') // remove latex commands
      .replace(/[\$\*\#\_\[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    this.currentUtterance = utterance;

    // Pick best matching voice
    const voices = this.synth.getVoices();
    let targetLang = 'en-US';
    if (language === 'hi') {
      targetLang = 'hi-IN';
    } else if (language === 'hinglish') {
      targetLang = 'en-IN';
    }

    const matchedVoice = voices.find(v => v.lang.startsWith(targetLang) || (language === 'hi' && v.lang.includes('hi')) || (language === 'hinglish' && v.lang.includes('en-IN')));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.rate = language === 'hi' ? 0.95 : 1.02;
    utterance.pitch = 1.05;

    // Word boundary event for live karaoke-style highlighting
    const words = text.split(/\s+/);
    let wordIdx = 0;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const currentWord = words[wordIdx] || '';
        if (this.onWordCallback) {
          this.onWordCallback(currentWord, wordIdx);
        }
        wordIdx++;
      }
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    try {
      this.synth.speak(utterance);
    } catch {
      this.simulateSpeechPacing(text, onWord, onEnd);
    }
  }

  private simulateSpeechPacing(
    text: string,
    onWord?: (word: string, index: number) => void,
    onEnd?: () => void
  ) {
    const words = text.split(/\s+/);
    let currentIdx = 0;
    const intervalMs = 280; // approximate speaking pace

    const timer = setInterval(() => {
      if (currentIdx < words.length) {
        if (onWord) {
          onWord(words[currentIdx], currentIdx);
        }
        currentIdx++;
      } else {
        clearInterval(timer);
        if (onEnd) {
          onEnd();
        }
      }
    }, intervalMs);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
    this.stopTone();
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  private stopTone() {
    if (this.gainNode && this.audioCtx) {
      try {
        this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.05);
      } catch {
        // ignore
      }
    }
    this.isSynthesizingTone = false;
  }
}

export const speechService = SpeechService.getInstance();
