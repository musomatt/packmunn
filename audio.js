export class Audio {
  constructor() {
    this.backgroundAudioElement = document.createElement('audio');
    this.backgroundAudioElement.src = 'packmunn-background.mp3';
    this.backgroundAudioElement.volume = 0.4;

    this.munnChompElement = document.createElement('audio');
    this.munnChompElement.src = 'munn-chomp.mp3';
    this.munnChompElement.loop = false;

    this.munnFunnElement = document.createElement('audio');
    this.munnFunnElement.src = 'munn-funn.mp3';
    this.munnFunnElement.loop = false;
    this.backgroundAudioElement.volume = 0.5;

    this.munnchElement = document.createElement('audio');
    this.munnchElement.src = 'munnch.mp3';
    this.munnchElement.loop = false;
    this.munnchElement.volume = 0.1;

    this.munnDownElement = document.createElement('audio');
    this.munnDownElement.src = 'munn-down.mp3';
    this.munnDownElement.loop = false;
    this.munnDownElement.volume = 0.3;
  }

  startBackgroundMusic = () => {
    this.backgroundAudioElement.play();
  };

  playMunnChomp = () => {
    this.munnChompElement.currentTime = 0;
    this.munnChompElement.play();
  };

  playMunnch = () => {
    this.munnchElement.currentTime = 0;
    this.munnchElement.play();
  };

  playMunnFunn = () => {
    this.munnFunnElement.currentTime = 0;
    this.munnFunnElement.play();
  };

  playMunnDown = () => {
    this.munnDownElement.currentTime = 0;
    this.munnDownElement.play();
  };

  stopAudio = () => {
    this.munnchElement.src = '';
    this.munnChompElement.src = '';
    this.backgroundAudioElement.src = '';
  };
}
