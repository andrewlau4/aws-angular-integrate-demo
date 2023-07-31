import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

//based on https://medium.com/@tarekabdelkhalek/how-to-create-a-drag-and-drop-file-uploading-in-angular-78d9eba0b854
@Directive({
  selector: '[appDragndropUpload]'
})
export class DragndropUploadDirective {

  private cssClasses: string[] = [];

  @HostBinding('class')
  classAttributes: string = this.cssClasses.join(" ");

  @Output() fileDropped = new EventEmitter<any>();

  @Input({required: true})
  dragItemValidityCheck: (item: any) => boolean = (_) => true;

  @Input({required: true})
  invalidCssClass = "";

  @Input({required: true})
  validCssClass = "";

  readonly fileOverClass = "fileover";

  constructor() { }


  @HostListener('dragover', ['$event'])
  onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    //this.fileOver = true;
    this.addClassAttribute(evt);
    

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

  addClassAttribute(evt: any) {
    if (this.cssClasses.length == 0) {  
      const validityClass = this.checkFileTypesValid(evt) ? this.validCssClass : this.invalidCssClass;
      this.cssClasses.push(this.fileOverClass, validityClass);
      console.log(`cssClasses ${this.cssClasses}`)
      this.classAttributes = this.cssClasses.join(" ");
    }
  }

  clearClassAttribute() {
    this.cssClasses = [];
    this.classAttributes = "";
  }

  checkFileTypesValid(evt: any) {
    const verifyType = (item: any): boolean => {
      console.log(`checking ${item.type}`);

      if (this.dragItemValidityCheck) {
        return this.dragItemValidityCheck!(item);
      } else {
        return false;
      }
    }
    
    const verifyItems = (items: any): boolean => {
      console.log(`items: ${JSON.stringify(items)}`)
      for (const i of items) {
        if (!verifyType(i)) {
          console.log(`item ${i} is not image`);
          return false;
        }
      }
      console.log("all items are images")
      return true;
    }

    console.log(`files: ${(evt.dataTransfer.files && Object.keys(evt.dataTransfer.files).length > 0)}`);

    const items = (evt.dataTransfer.files && Object.keys(evt.dataTransfer.files).length > 0)
      ? evt.dataTransfer.files
      : evt.dataTransfer.items;
    
    return (!items) ? false : verifyItems(items);

  }

}
