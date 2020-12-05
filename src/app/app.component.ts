import { Component } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cargoLog';
  button = 'Fechar';
  
  clickMenuToggle = () => {
    $("#wrapper").toggleClass("toggled");
    this.button = this.button == 'Fechar' ? 'Abrir' : 'Fechar';
  }
}
