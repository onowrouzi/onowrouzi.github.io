import { Component, OnInit } from '@angular/core';
import { TerminalTextModel } from '../interfaces/termain-text.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  termLines: TerminalTextModel[];
  showLoadingIcon: boolean;

  constructor(private router: Router) {
    this.termLines = [
      {
        text: 'cd OmidsPortfolio',
        output: 'Hello! Welcome to my page!\n\n' +
                'Take a look around and feel free to contact me at onowrouzi@outlook.com if you have any questions.\n\n' +
                'I hope you enjoy!',
      },
      {
        text: 'portfolio init',
        folder: 'OmidsPortfolio'
      }
    ];
  }

  ngOnInit() {
  }

  loadHome() {
    this.showLoadingIcon = true;
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 3000);
  }

}
