import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from './shared/loading/loader.component';
import { LoadingService } from './shared/loading/loading.service';
import { OpenaiService } from './shared/services/openai.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  openaiService = inject(OpenaiService);
  loadingService = inject(LoadingService);
  loading = this.loadingService.loading;
  myForm!: FormGroup;
  base64Image: string | null = null;
  mimeType: any;
  result: any;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
        img: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
        const file: File = event.target.files[0];

        if (file) {
          this.mimeType = file.type;
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.base64Image = e.target.result; // This will be the Base64 string
            console.log(this.base64Image); // You can now use this Base64 string
          };

          reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
        }
  }

  async send() {
    if(!this.loading()) {
      this.loadingService.loadingOn();
      const prompt = 'What is this picture?';
      this.result = await this.openaiService.generateTextFromImg(prompt, this.base64Image?.split(',')[1], this.mimeType);
      console.log('result => ', this.result);
    }
  }

}