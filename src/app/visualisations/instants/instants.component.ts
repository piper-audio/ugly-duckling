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
import {Instant} from '../FeatureUtilities';
import Waves from 'waves-ui-piper';

@Component({
  selector: 'ugly-instants',
  templateUrl: '../waves-template.html',
  styleUrls: ['../waves-template.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstantsComponent extends WavesComponent implements AfterViewInit {
  @ViewChild('track') trackDiv: ElementRef;

  private mFeature: Instant[];
  private height: number; // As it stands, height is fixed. Store once onInit.

  @Input() set instants(instants: Instant[]) {
    this.mFeature = instants;
    this.update();
  }

  get instants(): Instant[] {
    return this.mFeature;
  }

  ngAfterViewInit(): void {
    this.height = this.trackDiv.nativeElement.getBoundingClientRect().height;
    this.renderTimeline(this.trackDiv);
    this.update();
  }

  update(): void {
    if (!this.waveTrack || !this.instants) { return; }
    this.clearTimeline(this.trackDiv);

    this.addLayer(
      new Waves.helpers.TickLayer(
        this.instants,
        {
          height: this.height,
          color: this.colour,
          labelPosition: 'bottom',
          shadeSegments: true
        }
      ),
      this.waveTrack,
      this.timeline.timeContext
    );
  }
}
