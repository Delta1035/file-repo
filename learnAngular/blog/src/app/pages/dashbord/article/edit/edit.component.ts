import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  content = '123';
  mode = 'editor';
  options = {};
  constructor() {}

  ngOnInit(): void {
    return;
  }

  onEditorLoaded(event: any) {
    console.log(event);
  }

  onPreviewDomChanged(event: any) {
    console.log(event);
  }
}
