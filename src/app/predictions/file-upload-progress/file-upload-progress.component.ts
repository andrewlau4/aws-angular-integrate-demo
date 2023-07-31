import { Component, Input } from '@angular/core';

type FileInfo = {
  fileName: string,
  progress: number
}

@Component({
  selector: 'app-file-upload-progress',
  templateUrl: './file-upload-progress.component.html',
  styleUrls: ['./file-upload-progress.component.scss']
})
export class FileUploadProgressComponent {

  @Input({required: true})
  fileInfo: FileInfo = { fileName: "none", progress: 0 };

}
