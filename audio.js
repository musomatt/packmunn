export class Audio {
  constructor() {
    this.backgroundAudioElement = document.createElement('audio');
    this.backgroundAudioElement.src = 'packmunn-background.mp3';
  }

  startBackgroundMusic = () => {
    this.backgroundAudioElement.play();
  };

  playMunnChomp = () => {};
}
