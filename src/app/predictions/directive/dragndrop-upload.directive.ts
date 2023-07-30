import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

//based on https://medium.com/@tarekabdelkhalek/how-to-create-a-drag-and-drop-file-uploading-in-angular-78d9eba0b854
@Directive({
  selector: '[appDragndropUpload]'
})
export class DragndropUploadDirective {

  @HostBinding('class.fileover')
  fileOver: boolean = false;

  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }


  @HostListener('dragover', ['$event'])
  onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = true;

    console.log(`Drag Over ${JSON.stringify(evt)}`);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log(`Drag Leave ${JSON.stringify(evt)}`);
  }

  @HostListener('drop', ['$event'])
  onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files && files.length > 0) {
      console.log(`Files dropped ${files.length}`);
      for (const f of files) {
        console.log(`File ${f.name} ${f.size} ${f.type}`);
      }
      this.fileDropped.emit(files);
    }

    console.log(`Drag Leave ${JSON.stringify(evt)}`);
  }

}
