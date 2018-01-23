import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { TerminalTextModel } from '../interfaces/termain-text.model';

import { map } from 'lodash';

@Component({
  selector: 'app-animated-terminal',
  templateUrl: './animated-terminal.component.html',
  styleUrls: ['./animated-terminal.component.scss']
})
export class AnimatedTerminalComponent implements OnInit {

  @Input() lines: TerminalTextModel[];
  @Input() speed: number;
  @Input() multiLine?: boolean;
  @Output() onTerminalFinish = new EventEmitter<boolean>();
  idx: number;
  displayLines: TerminalTextModel[];
  visible: boolean;
  height: string;
  sub: Subscription;

  constructor() {
    this.speed = this.speed || 150;
    this.idx = 0;
  }

  ngOnInit() {
    this.displayLines = [{text: '', folder: this.lines[0].folder}];
    this.height = this.multiLine ? (this.lines.length * 40 + (map(this.lines, 'output')).join().length)  + 'px' : '40px';
    this.sub = Observable.timer(1000, this.speed).subscribe((tick) => {
      this.print(tick);
    });
  }

  print(tick) {
    this.visible = tick % 4 !== 0;
    if (this.idx < this.lines.length) {
      let useIdx = this.multiLine ? this.idx : 0;
      let txt = this.displayLines[useIdx].text;
      const eol = this.idx < this.lines.length ? txt.length === this.lines[this.idx].text.length : false;
      this.displayLines[useIdx].output = eol ? this.lines[this.idx].output : null;
      this.idx = eol ? this.idx + 1 : this.idx;
      useIdx = this.multiLine ? this.idx : 0;
      const offset = this.idx > 0 ? tick - this.lines[this.idx - 1].text.length : tick;
      if (this.idx < this.lines.length) {
        if (eol && this.multiLine) {
          this.displayLines.push({text: ''});
        } else {
          txt = this.lines[this.idx].text.substr(0, offset);
        }

        this.displayLines[useIdx].text = txt;
        this.displayLines[useIdx].folder = this.lines[this.idx].folder;
      }
    } else {
      this.sub.unsubscribe();
      this.onTerminalFinish.emit(true);
    }
  }
}
