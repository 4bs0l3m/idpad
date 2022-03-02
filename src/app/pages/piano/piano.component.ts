import {ChangeDetectionStrategy, Component, HostListener, Inject, OnInit} from '@angular/core';
import { MEDIA_DEVICES } from '@ng-web-apis/common';
import {inputById, MIDI_ACCESS, MIDI_INPUT, MIDI_MESSAGES, notes, outputByName, toData} from '@ng-web-apis/midi';
import {EMPTY, merge, Observable, Subject} from 'rxjs';
import {catchError, map, scan, startWith, switchMap, take} from 'rxjs/operators';
import { Midi } from 'tone';
import { RESPONSE_BUFFER } from './response';

import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

@Component({
  selector:'a',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss'],
  providers: [inputById('input-0'), outputByName('VirtualMIDISynth')],
})
export class PianoComponent implements OnInit {
  readonly octaves = Array.from({length: 24}, (_, i) => i + 48);

  readonly notes$: Observable<Map<number, number | null>>;

  private readonly mousedown$ = new Subject<number>();

  private readonly mouseup$ = new Subject<void>();

  private readonly silent$ = new Subject<number>();
  constructor(
  @Inject(MIDI_MESSAGES) messages$: Observable<MIDIMessageEvent>

  ) {
    this.notes$ = merge(
      messages$.pipe(
          catchError(() => EMPTY),
          notes(),
          toData(),
      ),
      
  ).pipe(
      scan((map, [_, note, volume]) => map.set(note, volume / 512), new Map()),
      switchMap(notes =>
          this.silent$.pipe(
              map(key => notes.set(key, null)),
              startWith(notes),
          ),
      ),
      startWith(new Map()),
  );
  this.notes$.subscribe(res=>{
  console.log('res :', res);
  let noteSize=  120
  for (let index = 0; index < noteSize; index++) {
    const noteValue = res.get(index);
    if(noteValue)
    this.getNote(noteValue)
  }
  res.forEach(x=>{
    if(x){

    }
  })

  })
  }
  
  notes=['C','C#','D', 'D#','E', 'F','F#', 'G','G#','A','A#','B']
  getNote(index:number){
  console.log('index :', index);

    let count=this.notes.length;
    let mode=index % count;
    let octave= count /(index-mode)
    console.log('octave :', octave);
    console.log(this.notes[mode])
    return this.notes[mode]

  }
  ngOnInit() {
    
  }


}
