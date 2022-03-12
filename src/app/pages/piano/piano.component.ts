import {ChangeDetectionStrategy, Component, HostListener, Inject, OnInit} from '@angular/core';
import { MEDIA_DEVICES } from '@ng-web-apis/common';
import {inputById, MIDI_ACCESS, MIDI_INPUT, MIDI_MESSAGES, MIDI_OUTPUT, notes, outputByName, toData,mainVolume} from '@ng-web-apis/midi';
import {EMPTY, merge, Observable, Subject} from 'rxjs';
import {catchError, map, scan, startWith, switchMap, take} from 'rxjs/operators';
import { Midi } from 'tone';
import { RESPONSE_BUFFER } from './response';
import * as Tone from 'tone'

import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

@Component({
  selector:'a',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss'],
  providers: [inputById('input-0'), outputByName('VirtualMIDISynth')],
})
export class PianoComponent implements OnInit {
  readonly octaves = Array.from({length: 24}, (_, i) => i + 48);


  private readonly mousedown$ = new Subject<number>();

  private readonly mouseup$ = new Subject<void>();

  private readonly silent$ = new Subject<number>();
  noteKeyMap:{[key:string]:Tone.PolySynth}={};
  constructor(
  @Inject(MIDI_MESSAGES) messages$: Observable<MIDIMessageEvent>,
  @Inject(MIDI_INPUT) input: Promise<any>,

  @Inject(MIDI_OUTPUT) output: Promise<any>,

  ) {
    messages$.subscribe(res=>{

      console.log('res.data :', res.data);
      let channel =res.data[0];
      let key=res.data[1];
      let value=res.data[2];
      if(channel==144){
        if(value>0){

          this.addNote(key,value)
         // this.playNote(this.getNote(key),value/512);
        }else if(value<=0){
          this.removeNote(key,value);
        }
        

      }
    })
  }
  activeNotes:string[]=[]
  notes=['C','C#','D', 'D#','E', 'F','F#', 'G','G#','A','A#','B']
  getNote(index:number){
  // console.log('index :', index);

    let count=this.notes.length;
    let mode=index % count;
    let octave= (index-mode)/count 
    console.log('octave :', octave);
    console.log(this.notes[mode])
    return this.notes[mode]+octave

  }
  addNote(key:number,value:number){
    let note=this.getNote(key)
    let _haveNote=this.activeNotes.find(x=>x===note)
    if(!_haveNote){
      this.activeNotes.push(note);
      this.noteKeyMap[note]=this.playNote(this.getNote(key), value / 512);
    }
  }
  removeNote(key:number,value:number){
    const now = Tone.now()
    let note=this.getNote(key)
    this.activeNotes=this.activeNotes.filter(x=>x!==note);
    this.noteKeyMap[note].dispose()

  }
  //piano 

  
  playNote=(note:string,velocity:number)=>{
    const now = Tone.now()
    const synth = new Tone.PolySynth(Tone.AMSynth).toDestination();
    // trigger the attack immediately
    
   return synth.triggerAttack(note,1,velocity);
    
    // wait one second before triggering the release
  }
  stopNote(){
  }
  ngOnInit() {
    

  }


}
