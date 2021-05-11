import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'ngStarterNadjem';
  constructor(private _electronService: ElectronService) { }

  ngOnInit(){
 }
}
