import { Component, OnInit, ViewChild ,OnDestroy} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
//importamos para el editor
import { filter, take } from 'rxjs/operators';
import {MonacoEditorComponent,MonacoEditorConstructionOptions,MonacoEditorLoaderService,MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import { AnalizarService } from 'src/app/services/analizar.service';
import { MatTabContent } from '@angular/material/tabs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  data_error: any;
  data_simbolo: any;
  opciones: string[]=[];
  
  
  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent = new MonacoEditorComponent(this.monacoLoaderService);
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: 'javascript',
    roundedSelection: true,
    autoIndent:"full"
  };
  consoleOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: '',
    roundedSelection: true,
    autoIndent:"full",
    readOnly:true
  };

  code = "";
  code3 = "";
  code2 = "";
  code4 = "";
  editorTexto = new FormControl('');
  editorTexto2 = new FormControl('');
  editorTexto3 = new FormControl('');
  editorTexto4 = new FormControl('');
  files=new FormControl('');
  console = "";
  consola = new FormControl('');

  constructor(private monacoLoaderService: MonacoEditorLoaderService, private analizarService: AnalizarService) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        take(1)
      )
      .subscribe(() => {
        monaco.editor.defineTheme('myCustomTheme', {
          base: 'vs-dark', // can also be vs or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: [
            {
              token: 'comment',
              foreground: 'ffa500',
              fontStyle: 'italic underline'
            },
            { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
            { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
          ],
          colors: {}
        });
      });
  }
  editorInit(editor: MonacoStandaloneCodeEditor) {
    // monaco.editor.setTheme('vs');
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 50,
      endLineNumber: 3
    });
  }

  ngOnInit(): void {
  }

  addNewTab(){
    var index =this.opciones.length
    this.opciones.push(""+index);
    console.log(this.opciones)
  }
  DeleteTab(){
    this.opciones.length=this.opciones.length-1;
  }

  analizar(){
    var texto = {
      prueba: this.editorTexto.value
    }
    
    this.analizarService.ejecutar(texto).subscribe((res:any)=>{
      console.log(res)
      this.consola.setValue(res.consola);
      let errores=res.errores.tablaErrores;
      let Simbol_l=res.Simbol_lit.listado_Simbolos;
      this.data_error=errores;
      this.data_simbolo=Simbol_l;
      console.log(this.data_simbolo)
      //this.editorTexto.setValue(res.consola);
    }, err=>{
      console.log("ERROR: "+err)
    });
  }
  analizar2(){
    var texto = {
      prueba: this.editorTexto2.value
    }
    
    this.analizarService.ejecutar(texto).subscribe((res:any)=>{
      console.log(res)
      this.consola.setValue(res.consola);
      let errores=res.errores.tablaErrores;
      let Simbol_l=res.Simbol_lit.listado_Simbolos;
      this.data_error=errores;
      this.data_simbolo=Simbol_l;
      console.log(this.data_simbolo)
      //this.editorTexto.setValue(res.consola);
    }, err=>{
      console.log("ERROR: "+err)
    });
  }
  analizar3(){
    var texto = {
      prueba: this.editorTexto3.value
    }
    
    this.analizarService.ejecutar(texto).subscribe((res:any)=>{
      console.log(res)
      this.consola.setValue(res.consola);
      let errores=res.errores.tablaErrores;
      let Simbol_l=res.Simbol_lit.listado_Simbolos;
      this.data_error=errores;
      this.data_simbolo=Simbol_l;
      console.log(this.data_simbolo)
      //this.editorTexto.setValue(res.consola);
    }, err=>{
      console.log("ERROR: "+err)
    });
  }
  analizar4(){
    var texto = {
      prueba: this.editorTexto4.value
    }
    
    this.analizarService.ejecutar(texto).subscribe((res:any)=>{
      console.log(res)
      this.consola.setValue(res.consola);
      let errores=res.errores.tablaErrores;
      let Simbol_l=res.Simbol_lit.listado_Simbolos;
      this.data_error=errores;
      this.data_simbolo=Simbol_l;
      console.log(this.data_simbolo)
      //this.editorTexto.setValue(res.consola);
    }, err=>{
      console.log("ERROR: "+err)
    });
  }
  guardar(opc: Number){
    var text=""
    if(opc===1){
      text=this.editorTexto.value
    }
    else if(opc===2){
      text=this.editorTexto2.value
    }
    else if(opc===3){
      text=this.editorTexto3.value
    }
    else if(opc===4){
      text=this.editorTexto4.value
    }    
    var f=document.createElement('a');
    f.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    f.setAttribute('download',"ArchivoG_olc1.ty");
    if(document.createEvent){
      var event=document.createEvent('MouseEvents');
      event.initEvent('click',true,true);
      f.dispatchEvent(event);
    }
    else{
      f.click();
    }
    console.log("Archivo guardado");
  }
  abrir(str:string){
    document.getElementById(str)!.click();
  }
  readFile(event:any, opc: Number){
    let input=event.target;
    let reader=new FileReader();
    reader.onload=()=>{
      var text=reader.result;
      if(text){
        if(opc===1){
          this.editorTexto.setValue(text.toString());
        }
        else if(opc===2){
          this.editorTexto2.setValue(text.toString());
        }
        else if(opc===3){
          this.editorTexto3.setValue(text.toString());
        }
        else if(opc===4){
          this.editorTexto4.setValue(text.toString());
        }    
        
      }

    }
    reader.readAsText(input.files[0]);
    this.consola.setValue('');

  }
}