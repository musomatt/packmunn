export class Audio {
  constructor() {
    this.backgroundAudioElement = document.createElement('audio');
    this.backgroundAudioElement.src = 'packmunn-background.mp3';

    this.munnChompElement = document.createElement('audio');
    this.munnChompElement.src = 'munn-chomp.mp3';
    this.munnChompElement.loop = false;

    this.munnFunnElement = document.createElement('audio');
    this.munnFunnElement.src = 'munn-funn.mp3';
    this.munnFunnElement.loop = false;

    this.munnchElement = document.createElement('audio');
    this.munnchElement.src = 'munnch.mp3';
    this.munnchElement.loop = false;
    this.munnchElement.volume = 0.2;
  }

  startBackgroundMusic = () => {
    this.backgroundAudioElement.play();
  };

  playMunnChomp = () => {
    // this.munnChompElement.currentTime = 0;
    // this.munnChompElement.play();
  };

  playMunnch = () => {
    this.munnchElement.currentTime = 0;
    this.munnchElement.play();
  };

  playMunnFunn = () => {
    this.munnFunnElement.currentTime = 0;
    this.munnFunnElement.play();
  };
}
