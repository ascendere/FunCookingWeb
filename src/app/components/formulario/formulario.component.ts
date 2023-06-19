import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  checkoutForm: FormGroup;
  selectedImage!: File;

  constructor(private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      title: '',
      image: '',
    });
  }

  submitForm() {
    console.log(this.checkoutForm.value)
  }

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
    }
  }

}

