/**
 * Created by lucast on 24/05/2017.
 */
import wavesUI from 'waves-ui-piper';
import * as Hammer from 'hammerjs';
import {TimePixelMapper} from '../playhead/PlayHeadHelpers';

// TODO this is named as such as a reminder that it needs to be re-factored
export function attachTouchHandlerBodges(element: HTMLElement,
                                         timeline: Timeline) {
  interface Point {
    x: number;
    y: number;
  }

  let zoomGestureJustEnded = false;

  const pixelToExponent: Function = wavesUI.utils.scales.linear()
    .domain([0, 100]) // 100px => factor 2
    .range([0, 1]);

  const calculateDistance: (p1: Point, p2: Point) => number = (p1, p2) => {
    return Math.pow(
      Math.pow(p2.x - p1.x, 2) +
      Math.pow(p2.y - p1.y, 2), 0.5);
  };

  const calculateMidPoint: (p1: Point, p2: Point) => Point = (p1, p2) => {
    return {
      x: 0.5 * (p1.x + p2.x),
      y: 0.5 * (p1.y + p2.y)
    };
  };

  const hammertime = new Hammer.Manager(element, {
    recognizers: [
      [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]
    ]
  });

  // it seems HammerJs binds the event to the window?
  // causing these events to propagate to other components?
  let initialZoom;
  let initialDistance;
  let offsetAtPanStart;
  let startX;
  let isZooming;

  const scroll = (ev) => {
    if (ev.center.x - startX === 0) {
      return;
    }

    if (zoomGestureJustEnded) {
      zoomGestureJustEnded = false;
      console.log('Skip this event: likely a single touch dangling from pinch');
      return;
    }
    timeline.timeContext.offset = offsetAtPanStart +
      timeline.timeContext.timeToPixel.invert(ev.deltaX);
    timeline.tracks.update();
  };

  const zoom = (ev) => {
    if (ev.touches.length < 2) {
      return;
    }

    ev.preventDefault();
    const minZoom = timeline.state.minZoom;
    const maxZoom = timeline.state.maxZoom;
    const p1: Point = {
      x: ev.touches[0].clientX,
      y: ev.touches[0].clientY
    };
    const p2: Point = {
      x: ev.touches[1].clientX,
      y: ev.touches[1].clientY
    };
    const distance = calculateDistance(p1, p2);
    const midPoint = calculateMidPoint(p1, p2);

    const lastCenterTime =
      timeline.timeContext.timeToPixel.invert(midPoint.x);

    const exponent = pixelToExponent(distance - initialDistance);
    const targetZoom = initialZoom * Math.pow(2, exponent);

    timeline.timeContext.zoom =
      Math.min(Math.max(targetZoom, minZoom), maxZoom);

    const newCenterTime =
      timeline.timeContext.timeToPixel.invert(midPoint.x);

    timeline.timeContext.offset += newCenterTime - lastCenterTime;
    timeline.tracks.update();
  };
  hammertime.on('panstart', (ev) => {
    offsetAtPanStart = timeline.timeContext.offset;
    startX = ev.center.x;
  });
  hammertime.on('panleft', scroll);
  hammertime.on('panright', scroll);

  element.addEventListener('touchstart', (e) => {
    if (e.touches.length < 2) {
      return;
    }

    isZooming = true;
    initialZoom = timeline.timeContext.zoom;

    initialDistance = calculateDistance({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }, {
      x: e.touches[1].clientX,
      y: e.touches[1].clientY
    });
  });
  element.addEventListener('touchend', () => {
    if (isZooming) {
      isZooming = false;
      zoomGestureJustEnded = true;
    }
  });
  element.addEventListener('touchmove', zoom);
}

export function naivePagingMapper(timeline: Timeline): TimePixelMapper {
  return (currentTime: number) => {
    const currentOffset = timeline.timeContext.offset;
    const offsetTimestamp = currentOffset
      + currentTime;

    const visibleDuration = timeline.timeContext.visibleDuration;
    const mustPageForward = offsetTimestamp > visibleDuration;
    const mustPageBackward = currentTime < -currentOffset;

    if (mustPageForward) {
      const hasSkippedMultiplePages =
        offsetTimestamp - visibleDuration > visibleDuration;

      timeline.timeContext.offset = hasSkippedMultiplePages ?
        -currentTime + 0.5 * visibleDuration :
        currentOffset - visibleDuration;
    }

    if (mustPageBackward) {
      const hasSkippedMultiplePages =
        currentTime + visibleDuration < -currentOffset;
      timeline.timeContext.offset = hasSkippedMultiplePages ?
        -currentTime + 0.5 * visibleDuration :
        currentOffset + visibleDuration;
    }

    if (mustPageForward || mustPageBackward) {
      timeline.tracks.update();
    }
    //
    return timeline.timeContext.timeToPixel(timeline.offset + currentTime);
  };
}
