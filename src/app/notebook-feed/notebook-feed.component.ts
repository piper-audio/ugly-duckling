/**
 * Created by lucast on 21/03/2017.
 */
import {Component, Input} from "@angular/core";
import Waves from 'waves-ui';
import {EventEmitter} from 'events';

export interface PartialEventEmitter {
  on(event: string|symbol, listener: Function): void;
}

class NotifyingTimeContext extends Waves.core.TimelineTimeContext
  implements PartialEventEmitter {

  private eventEmitter: EventEmitter;

  constructor(pixelsPerSecond: number, visibleWidth: number) {
    super(pixelsPerSecond, visibleWidth);
    this.eventEmitter = new EventEmitter();
  }

  get offset(){
    return super.offset;
  }

  set offset(value: number) {
    if (value !== this.offset) {
      this.eventEmitter.emit('offset');
    }
    super.offset = value;
  }

  get zoom(){
    return super.zoom;
  }

  set zoom(value: number) {
    if (value !== this.zoom) {
      this.eventEmitter.emit('zoom');
    }
    super.zoom = value;
  }

  on(event: string|symbol, listener: Function): void {
    this.eventEmitter.on(event, listener);
  }
}

@Component({
  selector: 'ugly-notebook-feed',
  templateUrl: './notebook-feed.component.html',
  styleUrls: ['./notebook-feed.component.css']
})
export class NotebookFeedComponent {
  private _audioBuffer: AudioBuffer;
  sharedTimeContext: TimelineTimeContext;


  @Input()
  set audioBuffer(buffer: AudioBuffer) {
    this._audioBuffer = buffer || undefined;
    if (this.audioBuffer) {

    }
  }

  get audioBuffer(): AudioBuffer {
    return this._audioBuffer;
  }

  constructor() {
    this.sharedTimeContext = new NotifyingTimeContext(100, 1000);
  }
}
