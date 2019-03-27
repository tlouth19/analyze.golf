import { observable, action } from 'mobx';

export class PlayerStore {
  @observable playing?: boolean = false;
  @observable videoElement?: HTMLVideoElement = undefined
  @observable sourceElement?: HTMLSourceElement = undefined
  @observable playbackSpeed: number = 1.0
  @observable playbackTime: number = 0

  @action
  setPlaybackStatus(value: boolean) {
    this.playing = value
    if (this.videoElement) {
      if (value) {
        this.videoElement.play()
      }
      else {
        this.videoElement.pause()
      }
    }
  }

  @action 
  setVideoElement(element: HTMLVideoElement) {
    if (!this.videoElement) {
      this.videoElement = element
    }
  }

  @action 
  setSourceElement(element: HTMLSourceElement) {
    if (!this.sourceElement) {
      this.sourceElement = element
    }
  }

  @action 
  setPlaybackSpeed(speed: number) {
    this.playbackSpeed = speed
    if (this.videoElement) {
      this.videoElement.playbackRate = speed
    }
  }

  @action 
  setPlaybackTime(time: number, updateElement: boolean) {
    this.playbackTime = time 
    if (this.videoElement && updateElement) {
      this.videoElement.currentTime = time
    }
  }

}
