import { Component, OnInit } from '@angular/core';
import { getDownloadURL, Storage, ref, uploadBytes } from '@angular/fire/storage';
import { ProductosService } from '../services/productos.service';
import { ColegiosService } from '../services/colegios.service';
import { Subscription, switchMap } from 'rxjs';


@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {
  producto1: any;
  producto2: any;
  suscription = new Subscription;
  url_img: string = '';
  colegios: any;
  uploaded = false;
  productos!: any;

  promocion = {
    nombre: '',
    descripcion: '',
    tipo: 'promocion',
    idProduct1: '',
    idProduct2: '',   
    img_url: '',
    colegio: {
      nombre: '',
      fullname: '',
      id: ''
    },
    talla: [{
      id: 0,
      n_talla: '6',
      precio: 0,
    },
    {
      id: 1,
      n_talla: '8',
      precio:0,
    },
    {
      id: 2,
      n_talla: '10',
      precio: 0,
    },
    {
      id: 3,
      n_talla: '12',
      precio: 0,
    },
    {
      id: 4,
      n_talla: '14',
      precio: 0,
    },
    {
      id: 5,
      n_talla: '16',
      precio: 0,
    },
    {
      id: 6,
      n_talla: 'S',
      precio: 0,
    },
    {
      id: 7,
      n_talla: 'M',
      precio: 0,
    },
    {
      id: 8,
      n_talla: 'L',
      precio: 0,
    },
    {
      id: 9,
      n_talla: 'XL',
      precio: 0,
    }]
  }

  file: File = {} as File;

  detectFile(event: any){
    if (event.target.files && event.target.files.length > 0){
      this.file = event.target.files[0];
      this.uploaded = true;
    }
  }
  colegioSelected(event: any): void {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const id_colegio = selectedOption.getAttribute('id');
    this.colegiosSvc.getColegioPorId(id_colegio).subscribe(
      data => { this.promocion.colegio = data }
    )
    this.productosSvc.getProductosByColegio(id_colegio).subscribe( data => {
      this.productos = data }
    );
  }

  constructor(
    private storage: Storage,
    private productosSvc: ProductosService,
    private colegiosSvc: ColegiosService){

      this.colegiosSvc.getColegios().subscribe(data => {
        this.colegios = data;
      })

  }

  onSubmit(){
    if(this.uploaded){
      const colegioSinTildes = this.promocion.colegio.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const imgRef = ref(this.storage, `colegios/${colegioSinTildes}/${this.file.name}`);
      uploadBytes(imgRef, this.file)
      .then((snapshot) => {
        return getDownloadURL(imgRef);
      })
      .then((downloadURL) => {
        this.promocion.img_url = downloadURL;
        if(this.promocion.nombre != "" && this.promocion.descripcion != "" && this.promocion.idProduct1 != this.promocion.idProduct2){
          this.productosSvc.addProducto(this.promocion)
          .then(value => alert("Promoción agregada con éxito"))
          .catch(err => console.error("Error ",err));
        }
        else{
          alert("Nombre vacío, descripción vacía o los productos dentro de la promoción son idénticos.")
        }             
        
      })
      .catch(err => {console.error('Error al cargar la imagen: ',err)})

    }else{
      console.log("Promoción ingresada sin imagen.");
    }    
  }

  ngOnInit(): void{
    this.suscription = this.colegiosSvc.getColegios().pipe(
      switchMap(colegios => {
        this.colegios = colegios;
        return this.productosSvc.getProductosByColegio(this.colegios[0].id);
      })
    ).subscribe(productos => {
      this.productos = productos;
      this.promocion.idProduct1 = this.productos[0].id;
      this.promocion.idProduct2 = this.productos[0].id;
    });
  }

  ngOnDestroy(): void {
    if(this.suscription){
      this.suscription.unsubscribe();
    }
  }
}
