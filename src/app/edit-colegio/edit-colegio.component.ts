import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColegiosService } from '../services/colegios.service';

@Component({
  selector: 'app-edit-colegio',
  templateUrl: './edit-colegio.component.html',
  styleUrls: ['./edit-colegio.component.css']
})
export class EditColegioComponent {

  colegio: any = {};
  id!: string;

  constructor(
    private colegiosSvc: ColegiosService,
    private route: ActivatedRoute) { }

  getColegio(id: string){
    this.colegiosSvc.getColegioPorId(id).subscribe(colegio => {
      this.colegio = colegio;
      console.log(this.colegio);
    })
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getColegio(this.id);
    })
    
    
    

  }

  editarColegio(){
    this.colegiosSvc.updateColegio(this.id, this.colegio)
    .then()
    .catch()
  }

}
