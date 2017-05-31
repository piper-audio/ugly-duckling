/// <reference path="../../../node_modules/@types/node/index.d.ts"/>
declare const AmbientInstance: WavesUserInterface;

declare module 'waves-ui-piper' {
  export default AmbientInstance;
}

interface WavesUserInterface {
  core: Core;
  helpers: any;
  states: any;
  utils: Utilities;
  shapes: any;
}

interface MatrixEntity {
  getColumnCount(): number;
  getColumnHeight(): number;
  getColumn(n: number): Float32Array | number[];
  getStepDuration(): number;
  getStartTime(): number;
  dispose(): void;
}

interface Area {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Layer extends NodeJS.EventEmitter {
  start: number;
  offset: number;
  duration: number;
  stretchRatio: number;
  yDomain: number[];
  opacity: number;
  timeContext: LayerTimeContext;
  readonly timeToPixel: () => (time: number) => number;
  readonly valueToPixel: () => (value: number) => number;
  readonly items: Element[];
  readonly selectedItems: Element[];
  data: ArrayLike<any> | Object;
  destroy(): void;
  configureTimeContextBehaviour(ctor: ObjectConstructor): void;
  setTimeContext(context: LayerTimeContext): void;
  configureShape(ctor: ObjectConstructor /* TODO BaseShape*/,
                 accessors: Object,
                 options: Object): void;
  configureCommonShape(ctor: ObjectConstructor /* TODO BaseShape*/,
                       accessors: Object,
                       options: Object): void;
  setBehaviour(behaviour: Object /* TODO BaseBehavior */): void;
  select(...$items: Element[]);
  unselect(...$items: Element[]);
  toggleSelection(...$items: Element[]);
  edit($items: Element[], dx: number, dy: number, $target: Element): void;
  setContextEditable(bool: boolean): void;
  editContext(dx: number, dy: number, $target: Element): void;
  stretchContext(dx: number, dy: number, $target: Element): void;
  getItemFromDOMElement($el: Element): Element | null;
  getDatumFromItem($item: Element): Object | any[] | null;
  getDatumFromDOMElement($item: Element): Object | any[] | null;
  hasItem($item: Element): boolean;
  hasElement($el: Element): boolean;
  getItemsInArea(area: Area): Element[];
  render(): void;
  update(): void;
  updateContainer(): void;
  updateShapes(): void;
}

interface LayerConstructor {
  new(dataType: 'entity' | 'collection',
      data: ArrayLike<any> | Object,
      options: Object): Layer;
}

interface MatrixEntityConstructor {
  new(): MatrixEntity;
}

interface PrefilledMatrixEntityConstructor {
  new(data: Float32Array[] | number[][],
      startTime: number,
      stepDuration: number): MatrixEntity;
}

interface Utilities {
  MatrixEntity: MatrixEntityConstructor;
  PrefilledMatrixEntity: PrefilledMatrixEntityConstructor;
  scales: {
    linear: Scale;
  };
}

type Timeline = any;
type Track = any; // TODO

interface Scale {
  (value: number): number;
  invert(): (value: number) => number;
  domain(arr?: [number, number]): Scale;
  range(arr?: [number, number]): Scale;
}

interface LayerTimeContext {
  start: number;
  duration: number;
  offset: number;
  stretchRatio: number;
  parent: TimelineTimeContext;
  timeToPixel(): Scale;
  pixelToTime(px: number): number;
  clone(): LayerTimeContext;
}

interface LayerTimeContextConstructor {
  new(parent: TimelineTimeContext): LayerTimeContext;
}

interface Core {
  Layer: LayerConstructor;
  LayerTimeContext: LayerTimeContextConstructor;
  Timeline: Timeline; // TODO
  TimelineTimeContext: TimelineTimeContextConstructor;
}

interface TimelineTimeContext {
  pixelsPerSecond: number;
  readonly computedPixelsPerSecond: number;
  offset: number;
  zoom: number;
  visibleWidth: number;
  readonly visibleDuration: number;
  maintainVisibleDuration: boolean;
  timeToPixel: Scale;
}

interface TimelineTimeContextConstructor {
  new(pixelsPerSecond: number, visibleWidth: number): TimelineTimeContext;
}
