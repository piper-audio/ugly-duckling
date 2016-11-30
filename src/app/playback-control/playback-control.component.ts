import {Component, OnInit} from '@angular/core';
import {AudioPlayerService} from "../services/audio-player.service";

@Component({
  selector: 'app-playback-control',
  templateUrl: './playback-control.component.html',
  styleUrls: ['./playback-control.component.css']
})
export class PlaybackControlComponent implements OnInit {

  constructor(private audioService: AudioPlayerService) {
  }

  ngOnInit() {
  }

  emitPlayPause() {
    this.audioService.togglePlaying();
  }

  emitFastForward() {
    this.audioService.seekBy(5); // TODO this should probably be some dynamic amount based on the zoom level ala Sonic Visualiser
  }

  emitFastForwardEnd() {
    this.audioService.seekToEnd();
  }

  emitFastRewind() {
    this.audioService.seekBy(-5);
  }

  emitFastRewindStart() {
    this.audioService.seekToStart();
  }

  emitVolumeChanged(value: number) {
    this.audioService.setVolume(value);
  }


  // TODO seems wrong to be repeating myself
  isPlaying(): boolean {
    return this.audioService.isPlaying();
  }
}
