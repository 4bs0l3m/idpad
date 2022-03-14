import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Inject, OnInit} from '@angular/core';
import { MEDIA_DEVICES } from '@ng-web-apis/common';
import {inputById, MIDI_ACCESS, MIDI_INPUT, MIDI_MESSAGES, MIDI_OUTPUT, notes, outputByName, toData,mainVolume} from '@ng-web-apis/midi';
import {EMPTY, merge, Observable, Subject} from 'rxjs';
import {catchError, map, scan, startWith, switchMap, take} from 'rxjs/operators';
import { Midi } from 'tone';
import { RESPONSE_BUFFER } from './response';
import * as Tone from 'tone'

import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import { Note } from './note';

@Component({
  selector:'a',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss'],
  providers: [inputById('input-0'), outputByName('VirtualMIDISynth')],
})
export class PianoComponent implements OnInit {
  readonly octaves = Array.from({length: 24}, (_, i) => i + 48);


  noteAddEvent:EventEmitter<Note>=new EventEmitter();
  noteRemoveEvent:EventEmitter<string>=new EventEmitter();
  noteKeyMap:{[key:string]:Tone.PolySynth}={};
  constructor(
  @Inject(MIDI_MESSAGES) messages$: Observable<MIDIMessageEvent>,
  @Inject(MIDI_INPUT) input: Promise<any>,

  @Inject(MIDI_OUTPUT) output: Promise<any>,

  ) {
    input.then(res=>{
      
      console.log('res :', res);
    })

    messages$.subscribe(res=>{

      console.log('res.data :', res.data);
      let channel =res.data[0];
      let key=res.data[1];
      let value=res.data[2];
      if(channel==144){
        if(value>0){

          this.noteAddEvent.emit({name:this.getNote(key),velocity:value})
         // this.playNote(this.getNote(key),value/512);
        }else if(value<=0){
          this.noteRemoveEvent.emit(this.getNote(key))
        }
        

      }
    })
  }
  activeNotes:Note[]=[]
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

  //piano 

  
  playNote=(note:string,velocity:number)=>{

    
    // wait one second before triggering the release
  }
  stopNote(){
  }
  synth = new Tone.PolySynth().toDestination();
  ngOnInit() {
    const now = Tone.now()

    this.synth.sync();
    // trigger the attack immediately
  
    this.noteAddEvent.subscribe(note=>{
    console.log('note :', note);
    const now = Tone.now()

      this.synth.triggerAttackRelease(note.name,"8n",now,note.velocity?note.velocity/128:0);
      console.log('note.velocity?note.velocity/256:0 :', note.velocity?note.velocity/128:0);
      let haveNote=this.activeNotes.find(x=>x.name==note.name)
      if(haveNote){
        haveNote=note;
      }else{
        this.activeNotes.push(note);
      }
    })
    this.noteRemoveEvent.subscribe(note=>{
      this.activeNotes=this.activeNotes.filter(x=>x.name!==note)

    })

  }


}
