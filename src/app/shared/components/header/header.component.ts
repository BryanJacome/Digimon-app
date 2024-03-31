import { Component, Input, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() backButton: string;
  @Input() showButton: boolean;

  firebaseSvc = inject(FirebaseService);

  constructor() { }

  ngOnInit() { }

  signOuth(){
    this.firebaseSvc.singOut();
  }

}
