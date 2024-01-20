import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColegiosService } from '../services/colegios.service';
import { RegionesService } from '../services/regiones.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.component.html',
  styleUrls: ['./colegios.component.css']
})
export class ColegiosComponent {

  colegios!: any;
  agregando = false; 
  rutaActual!: string;
  editMode!: boolean[];
  colegioEnEdicion: any;
  regiones!: any;
  comunas!: any;
  regionSeleccionada = '';
  comunaSeleccionada = '';
  ciudadesFiltradas: any[] = [];
  alMenosUnoTrue: boolean = false;
  colegiosPorPagina = 15;
  paginaActual = 1;
  nuevoColegio = {
    nombre: '',
    fullname: '',
    region: '',
    comuna: ''
  }
  filtro = '';

  @ViewChild('inputFiltro') inputElement!: ElementRef;

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus(); 
  }
  

  constructor(
    private colegiosSvc: ColegiosService,
    private regionesSvc: RegionesService,
    private toastr: ToastrService) {
  }
  aplicarFiltro(colegios: any) {
    let termino = this.filtro.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); 
  
    return colegios.filter((c: any) => {
      let nombre = c.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      let fullname = c.fullname.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      return nombre.toLowerCase().includes(termino.toLowerCase()) 
          || fullname.toLowerCase().includes(termino.toLowerCase()) 
          || c.region.toLowerCase().includes(this.filtro.toLowerCase())
          || c.comuna.toLowerCase().includes(this.filtro.toLowerCase());
    });
  }

  editarColegio(i: number, colegio: any) {
  this.editMode[i] = true;
  this.alMenosUnoVerdadero();
  this.colegioEnEdicion = { ...colegio }; 
  }
  guardarEdicion(i: number) {
    this.colegiosSvc.updateColegio(this.colegioEnEdicion.id, this.colegioEnEdicion);
    this.toastr.success('Colegio editado correctamente.')
    this.cancelarEdicion(i);
    this.todosFalsos();
  }
  cancelarEdicion(i: number) {
    this.editMode[i] = false;
    this.colegioEnEdicion = null;
    this.todosFalsos();
  }

  modoAgregar(){
    this.agregando = true;
  }
  
  cargarComunas(event: any){
    this.colegioEnEdicion.region = event.target.value;
    this.comunas = this.regionesSvc.getComunas(this.colegioEnEdicion.region);
   }

   asignarComuna(event: any){
    this.colegioEnEdicion.comuna = event.target.value;
   }

   cargarComunasNuevo(event: any){
    this.nuevoColegio.region = event.target.value;
    this.comunas = this.regionesSvc.getComunas(this.nuevoColegio.region);
   }

   asignarComunaNuevo(event: any){
    this.nuevoColegio.comuna = event.target.value;
   }

   alMenosUnoVerdadero(){
    this.alMenosUnoTrue = this.editMode.some(valor => valor === true);
    console.log(this.alMenosUnoTrue);
   }
   todosFalsos(){
    this.alMenosUnoTrue = false;
   }

  ngOnInit(): void {
    this.colegios = this.colegiosSvc.getColegios().subscribe(data =>
      {
        this.colegios = data;
        this.editMode = Array(this.colegios.length).fill(false);
      }
    );
    this.regiones = this.regionesSvc.getRegiones();
    this.rutaActual = window.location.pathname; 

  }

  agregarColegio() {
    if(this.nuevoColegio.nombre && this.nuevoColegio.fullname && this.nuevoColegio.region && this.nuevoColegio.comuna){
        this.colegiosSvc.addColegio(this.nuevoColegio)
        .then(() => {
          this.toastr.success('Colegio agregado exitosamente');
          this.agregando = false;
          this.nuevoColegio = {
            nombre: '',
            fullname: '',
            region: '',
            comuna: ''
          };
        })
        .catch(error => {
          console.error('Error agregando:', error);
          this.toastr.error('Error agregando colegio');

        });
    }else{
       this.toastr.error('Debe ingresar todos los campos.');
    }
  }

  eliminarColegio(id: string, nombre: any){
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el establecimiento ${nombre} ?`);
    if (confirmacion) {
      this.colegiosSvc.deleteColegio(id)
        .then(() => {
          console.log("Colegio eliminado satisfactoriamente.");
          this.toastr.success('Eliminación exitosa.');
        })
        .catch(error => {
          console.error('Error al eliminar el colegio:', error);
          this.toastr.error('Error al eliminar colegio');
        });
    } else {
      console.log('Eliminación cancelada por el usuario.');
    }
  }

}
