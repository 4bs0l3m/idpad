
export class Note {
  constructor(_name?:string,_velocity?:number,_action?:any){
    if(_name)
    this.name=_name;
    if(_velocity)
    this.velocity=_velocity;
    if(_action)
    this.action=_action;

  }
  name?:string;
  velocity?:number;
  lastVelocity?:number;
  action?:any;
}
