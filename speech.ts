// Thin wrapper around the Web Speech API so components don't repeat
// feature-detection everywhere. Works with zero backend / API key.
export function speak(text: string, lang = "en-US", rate = 0.95) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  } catch {
    /* speech synthesis unavailable - fail silently */
  }
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// Web Speech API speech-to-text (SpeechRecognition). Returns a controller
// with start/stop, since browser support/vendor-prefixing varies.
export interface RecognitionController {
  start: () => void;
  stop: () => void;
  supported: boolean;
}

export function createRecognizer(onResult: (transcript: string) => void, onEnd?: () => void): RecognitionController {
  const SpeechRecognitionImpl: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognitionImpl) {
    return { start: () => {}, stop: () => {}, supported: false };
  }
  const recognizer = new SpeechRecognitionImpl();
  recognizer.lang = "en-US";
  recognizer.interimResults = false;
  recognizer.maxAlternatives = 1;
  recognizer.onresult = (event: any) => {
    const transcript = event.results[0]?.[0]?.transcript ?? "";
    onResult(transcript);
  };
  if (onEnd) recognizer.onend = onEnd;

  return {
    start: () => {
      try {
        recognizer.start();
      } catch {
        /* already started - ignore */
      }
    },
    stop: () => {
      try {
        recognizer.stop();
      } catch {
        /* noop */
      }
    },
    supported: true,
  };
}
