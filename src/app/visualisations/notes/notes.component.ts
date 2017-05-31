/**
 * Created by lucast on 31/05/2017.
 */
import {WavesComponent} from '../waves-base.component';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import {Note} from '../FeatureUtilities';
import Waves from 'waves-ui-piper';

@Component({
  selector: 'ugly-notes',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent extends WavesComponent implements AfterViewInit {

  @ViewChild('track') trackDiv: ElementRef;

  private mFeature: Note[];
  private height: number; // As it stands, height is fixed. Store once onInit.

  @Input() set notes(notes: Note[]) {
    this.mFeature = notes;
    this.update();
  }

  get notes(): Note[] {
    return this.mFeature;
  }

  ngAfterViewInit(): void {
    this.height = this.trackDiv.nativeElement.getBoundingClientRect().height;
    this.renderTimeline(this.trackDiv);
    this.update();
  }

  update(): void {
    if (!this.waveTrack || !this.notes) { return; }
    this.clearTimeline(this.trackDiv);

    this.addLayer(
      new Waves.helpers.PianoRollLayer(
        this.notes,
        {
          height: this.height,
          color: this.colour,
          yDomain: findVerticalRange(this.notes)
        }
      ),
      this.waveTrack,
      this.timeline.timeContext
    );
  }
}

// TODO there might be scope to create a generic utility function like this
function findVerticalRange(notes: Note[]): [number, number] {
  let [min, max] = notes.reduce((acc, note) => {
    const [min, max] = acc;
    return [Math.min (min, note.pitch), Math.max (max, note.pitch)];
  }, [Infinity, -Infinity]);
  if (min === Infinity || min < 0 || max < 0) {
    min = 0;
    max = 127;
  }
  // round min and max to octave boundaries (starting at C as in MIDI)
  return [
    12 * Math.floor(min / 12),
    12 * Math.ceil(max / 12)
  ];
}
