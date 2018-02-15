import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Observable} from 'rxjs/Rx';



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  form:FormGroup;

  usuario:Object = {
    nombrecompleto: {
      nombre: "Fernando",
      apellido: "Herrera"
    },
    correo: "aaa@aaa.com",
    pasatiempos: ["correr", "comer", "dormir"],
    username: "asdasd",
    password1: "123",
    password2: "123"
  }

  constructor() { 
    this.form = new FormGroup({

      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('',   [
                                        Validators.required, 
                                        Validators.minLength(3)
                                  ]),
        'apellido': new FormControl('', [
                                         Validators.required,
                                         this.noHerrera
                                        ]
                                    )
      }),
      'correo': new FormControl('',   [
                                        Validators.required, 
                                        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
                                ]),
      'pasatiempos': new FormArray([
          new FormControl('', Validators.required)
        ]),
      'username': new FormControl('',   [
                                        Validators.required
                                        
        ], this.existeUsuario),
       'password1': new FormControl('',   [
                                        Validators.required
        ]),
       'password2': new FormControl()
    });
    //this.form.setValue(this.usuario);

    this.form.controls['password2'].setValidators([Validators.required, this.noIgual.bind(this.form)]);
    this.form.valueChanges.subscribe( data => {
      console.log("data", data);
    });

    this.form.controls['username'].valueChanges.subscribe( data => {
      console.log("username", data);
    });
    this.form.controls['username'].statusChanges.subscribe( data => {
      console.log("status", data);
    });
  }

  ngOnInit() {
  }

  noHerrera(control:FormControl):{[s:string]:boolean}{
    if(control.value === "herrera"){
      return {
        noherrera:true
      }
    }
    return null
  }

  noIgual(control:FormControl):{[s:string]:boolean}{
    let form:any = this;
    if(control.value !== form.controls['password1'].value){
      return {
        noigual:true
      }
    }
    return null
  }

  existeUsuario(control:FormControl):Promise<any>|Observable<any>{
    let promesa = new Promise ((resolve, reject) => {
      setTimeout(()=>{
        if(control.value === "aaaa"){
          resolve( {existe:true});
        }
        else{
          resolve(null);
        }
      }, 3000);
    });
    return promesa;
  }

  guardar(){
    console.log(this.form.value);
    console.log(this.form);
    //this.form.reset(this.usuario);
    //this.form.controls['correo'].setValue('sdad@dasdas.es')
  }

  agregarPasatiempo(){
    (<FormArray>this.form.controls['pasatiempos']).push(
      new FormControl('', Validators.required))
  }
}
