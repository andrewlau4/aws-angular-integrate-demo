import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

//based on https://medium.com/@tarekabdelkhalek/how-to-create-a-drag-and-drop-file-uploading-in-angular-78d9eba0b854
@Directive({
  selector: '[appDragndropUpload]'
})
export class DragndropUploadDirective {

  private cssClasses: string[] = [];

  //@HostBinding('class.fileover')
  //fileOver: boolean = false;

  @HostBinding('class')
  classAttributes: string = this.cssClasses.join(" ");

  @Output() fileDropped = new EventEmitter<any>();

  readonly fileOverClass = "fileover";
  readonly redClass = "turn-red";

  constructor() { }


  @HostListener('dragover', ['$event'])
  onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    //this.fileOver = true;
    this.addClassAttribute(this.fileOverClass, this.redClass);
    

    console.log(`Drag Over ${JSON.stringify(evt)}`);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log(`Drag Leave ${JSON.stringify(evt)}`);

    this.clearClassAttribute();
  }

  @HostListener('drop', ['$event'])
  onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    //this.fileOver = false;
    this.clearClassAttribute();

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

  addClassAttribute(...classNames: string[]) {
    if (this.cssClasses.length == 0) {
      this.cssClasses.push(...classNames);
      console.log(`cssClasses ${this.cssClasses}`)
      this.classAttributes = this.cssClasses.join(" ");
    }
  }

  clearClassAttribute() {
    this.cssClasses = [];
    this.classAttributes = "";
  }

}
