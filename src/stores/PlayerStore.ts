import { observable, action } from 'mobx';

export class PlayerStore {
  @observable playing?: boolean = false;
  @observable videoElement?: HTMLVideoElement = undefined
  @observable sourceElement?: HTMLSourceElement = undefined
  @observable playbackSpeed: number = 1.0
  @observable playbackTime: number = 0
  @observable duration?: number = undefined

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
      this.videoElement.setAttribute('webkit-playsinline', '')
      this.videoElement.setAttribute('playsinline', '')
      this.videoElement.addEventListener('loadeddata', () => {
        if (this.videoElement) {
          this.duration = this.videoElement.duration
        }
      })
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

  @action 
  clear() {
    this.videoElement = undefined
    this.sourceElement = undefined 
    this.playing = false
    this.duration = undefined
    this.playbackTime = 0
  }

}
