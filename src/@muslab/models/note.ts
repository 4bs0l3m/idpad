import { pid } from "process";

export class Note {
  constructor(
    _note:Note
  ){
    //i have

  }
  private _name!: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  private _code!: string;
  public get code(): string {
    return this._code;
  }
  public set code(value: string) {
    this._code = value;
  }
  private _isPercent: boolean = true;
  public get isPercent(): boolean {
    return this._isPercent;
  }
  public set isPercent(value: boolean) {
    this._isPercent = value;
  }
  private _degree!: number;
  public get degree(): number {
    return this._degree;
  }
  public set degree(value: number) {
    this._degree = value;
  }
  private _frequency!: number;
  public get frequency(): number {
    return this._frequency;
  }
  public set frequency(value: number) {
    this._frequency = value;
  }
  private _octave!: number;
  public get octave(): number {
    return this._octave;
  }
  public set octave(value: number) {
    this._octave = value;
  }

  public getInstance(){
    return this;
  }
}
