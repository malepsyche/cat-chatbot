import { Component } from '@angular/core';
import { ChatInterfaceComponent } from '../ui/chat-interface/chat-interface.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatInterfaceComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})

export class HomePage {

}
