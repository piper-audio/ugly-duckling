/**
 * Created by lucast on 31/05/2017.
 */
import {
  InspectableVerticallyBoundedComponent,
  PlayheadRenderer,
  VerticallyLabelled,
  VerticalScaleRenderer,
  VerticalValueInspectorRenderer,
  WavesComponent
} from '../waves-base.component';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: VerticallyLabelled, useExisting: NotesComponent },
    { provide: VerticalScaleRenderer, useExisting: NotesComponent },
    {provide: VerticalValueInspectorRenderer, useExisting: NotesComponent },
    {provide: PlayheadRenderer, useExisting: NotesComponent},
    {provide: WavesComponent, useExisting: NotesComponent}
  ]
})
export class NotesComponent extends InspectableVerticallyBoundedComponent<Note[]> {
  private currentVerticalRange: [number, number];

  get labels(): [number, number] {
    return this.currentVerticalRange;
  }

  @Input() set notes(notes: Note[]) {
    this.feature = notes;
  }

  protected get featureLayers(): Layer[] {
    this.currentVerticalRange = findVerticalRange(this.feature);
    return [
      new Waves.helpers.PianoRollLayer(
        this.feature,
        {
          height: this.height,
          color: this.colour,
          yDomain: this.currentVerticalRange
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
