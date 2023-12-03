import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.css']
})
export class AddProveedorComponent {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private proveedorSvc: ProveedoresService
    ) {
    this.myForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: [''],
      telefono: ['', Validators.minLength(9)],
      email: ['', Validators.email],
    });
  }

  onSubmit() {
    
    if(this.myForm.valid) {
      this.proveedorSvc.addProveedor(this.myForm.value);
      console.log("Proveedor agregado exitósamente.");
      this.myForm.reset();
    } else{
      console.log('No se agregó el proveedor');
    }
  }

  ngOninit(): void {
    
  }



}
