import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: 
  [
    `
    .ng-invalid.ng-untouched:not(form){
      border: 1px solid #ced4da;
      color: black;
    };
    `
  ]
})
export class TemplateComponent implements OnInit {

  usuario:Object = {
    nombre: "",
    apellido: "",
    email: "",
    pais: "",
    sexo: null,
    acepta: false
  }
  paises = [
  {
    codigo: "CRI",
    nombre:"Costa Rica"
  },
  {
    codigo: "ESP",
    nombre:"España"
  },
  {
    codigo: "FR",
    nombre:"Francia"
  }, 
  ];

  sexos = ["Hombre", "Mujer", "Sin definir"];
  constructor() { }

  ngOnInit() {
  }

  guardar(form:NgForm){
    console.log("Formulario", form);
    console.log("value", form.value);
  }

}
