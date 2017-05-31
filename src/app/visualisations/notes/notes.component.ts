/**
 * Created by lucast on 31/05/2017.
 */
import {WavesComponent} from '../waves-base.component';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {Note} from '../FeatureUtilities';
import Waves from 'waves-ui-piper';

@Component({
  selector: 'ugly-notes',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent extends WavesComponent<Note[]> {

  @Input() set notes(notes: Note[]) {
    this.feature = notes;
  }

  protected get featureLayers(): Layer[] {
    return [
      new Waves.helpers.PianoRollLayer(
        this.feature,
        {
          height: this.height,
          color: this.colour,
          yDomain: findVerticalRange(this.feature)
        }
      )
    ];
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
