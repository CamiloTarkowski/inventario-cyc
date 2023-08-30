import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-colegio',
  templateUrl: './edit-colegio.component.html',
  styleUrls: ['./edit-colegio.component.css']
})
export class EditColegioComponent {

  colegio: any = {};
  id!: string;

  constructor(private firebaseService: FirebaseService,
    private route: ActivatedRoute) { }

  getColegio(id: string){
    this.firebaseService.getColegioPorId(id).subscribe(colegio => {
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
    this.firebaseService.updateColegio(this.id, this.colegio)
    .then()
    .catch()
  }

}
