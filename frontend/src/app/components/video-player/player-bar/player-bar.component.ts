import { Component, Input, ElementRef, EventEmitter } from '@angular/core';
import { MediaPlaylist } from 'hls.js';

import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.css']
})
export class PlayerBarComponent {

  @Input('videoContainer') container: HTMLDivElement = {} as HTMLDivElement;
  @Input('videoElement') video: HTMLVideoElement = {} as HTMLVideoElement;

  isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly playerService: PlayerService) {}

  changeToVisible(isVisible: boolean): void { if (!isVisible) this.isVisibleChange.emit(isVisible) }

  getAudioTracks(): MediaPlaylist[] { return this.playerService.audioTracks }
  getSelectedAudioTrackId(): number { return this.playerService.selectedAudioTrackId }
  onAudioTrackChange(id: number): void { this.playerService.changeAudioTrack(id) }

  getSubtitleTracks(): MediaPlaylist[] { return this.playerService.subtitleTracks }
  getSelectedSubtitleTrackId(): number { return this.playerService.selectedSubtitleTrackId }
  onSubtitleTrackChange(id: number): void { this.playerService.changeSubtitleTrack(id) }

  seekVideoTime(newTime: number): void { this.playerService.seek(newTime) }

}
