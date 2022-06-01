import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaPlaylist } from 'hls.js';

import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'app-track-selector',
  templateUrl: './track-selector.component.html',
  styleUrls: ['./track-selector.component.css']
})
export class TrackSelectorComponent implements OnInit {

  @Output() trackChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() tracks: MediaPlaylist[] = [];
  @Input() canDeselect: boolean = false;
  @Input() selectedTrack: number = 0;

  isVisible: boolean = false;
  @Input() visibilityChange: Observable<boolean> = {} as Observable<boolean>;

  constructor(private readonly playerService: PlayerService) {}

  ngOnInit(): void {
    this.visibilityChange.subscribe((isVisible: boolean) => this.isVisible = isVisible);
  }

  onTrackChange(id: number): void {
    this.trackChange.emit(id);
    this.isVisible = false;
  }

  setVisible(isVisible: boolean): void { this.isVisible = isVisible }

  isActiveTrack(id: number): boolean { return this.selectedTrack === id }

}
