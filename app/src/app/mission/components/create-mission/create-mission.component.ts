import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuiCellView, GuiColumn } from '@generic-ui/ngx-grid';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.css']
})
export class CreateMissionComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Ingrese...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  mission: FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.mission = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      googleDocsLink: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.mission);
  }

  columns: Array<GuiColumn> = [{
      header: 'Name',
      field: 'name',
      view: GuiCellView.CHIP
  }, {
      header: 'Type',
      field: 'type'
  }, {
      header: 'Price',
      field: 'price'
  }];

  source: Array<any> = [{
    name: 'T-shirt',
    type: 'clothes',
    price: '15$'
  }, {
    name: 'Shoes',
    type: 'footwear',
    price: '100$'
  }, {
    name: 'Ball cap',
    type: 'headgear',
    price: '50$'
  }];

}
