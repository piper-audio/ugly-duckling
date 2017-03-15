import EventEmitter = NodeJS.EventEmitter;
/**
 * Created by lucas on 01/12/2016.
 */
declare const AmbientInstance: WavesUserInterface;

declare module 'waves-ui' {
  export default AmbientInstance;
}

interface WavesUserInterface {
  core: Core;
  helpers: any;
  states: any;
  utils: Utilities;
}

interface MatrixEntity {
  getColumnCount(): number;
  getColumnHeight(): number;
  getColumn(n: number): Float32Array | number[];
  getStepDuration(): number;
  getStartTime(): number;
}

type TimeContext = any; // TODO

interface Area {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Layer extends EventEmitter {
  destroy(): void;
  configureTimeContextBehaviour(ctor: ObjectConstructor): void;
  start: number;
  offset: number;
  duration: number;
  stretchRatio: number;
  yDomain: number[];
  opacity: number;
  readonly timeToPixel: () => (time: number) => number;
  readonly valueToPixel: () => (value: number) => number;
  readonly items: Element[];
  data: ArrayLike<any> | Object;
  setTimeContext(context: TimeContext): void;
  configureShape(ctor: ObjectConstructor /* TODO BaseShape*/,
                 accessors: Object,
                 options: Object): void;
  configureCommonShape(ctor: ObjectConstructor /* TODO BaseShape*/,
                       accessors: Object,
                       options: Object): void;
  setBehaviour(behaviour: Object /* TODO BaseBehavior */): void;
  readonly selectedItems: Element[];
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
  new(dataType: "entity" | "collection",
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
  scales: any;
}

interface Core {
  Layer: LayerConstructor;
  LayerTimeContext: any; // TODO
  Timeline: any; // TODO
}
