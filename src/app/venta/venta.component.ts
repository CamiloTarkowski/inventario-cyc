import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  venta: any;

  constructor(private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.firebaseService.getVenta(id).subscribe(data => {
        this.venta = data;
      })
    })    
  }
}
