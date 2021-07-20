import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { DevolService } from '../../services/devol.service';
import { ConfirmaService } from '../../services/confirma.service';
import { ConsultaSorteosService } from '../../services/consulta-sorteos.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.sass']
})
export class DevolucionesComponent implements OnInit {
  env = environment;

  usuario = '';
  contrasena = '';
  objLogin = {
    usr: '',
    pwd: ''
  };
  objDist = [];
  error = false;
  cargando = false;
  logueado = false;
  nombreDistribuidor = null;
  sorteo;
  arrArchivosPermitidos = [];
  arrSorteos = [];

  file = null;
  file64 = null;
  filename = null;
  extension = null;
  answer = false;
  errDevol = false;

  devolIniciada = false;
  devolConectada = false;
  devolEnviada = false;
  devolRecibida = false;
  devolConfirmada = false;
  devolFinalizada = false;
  intentosConfirma = 0;
  contenidoDevol = '';
  fechaProximoSorteo;
  numeroProximoSorteo;
  esHoy = false;
  base64Conf = null;
  nombreConf = null;



  constructor( private servLogin: LoginService,
               private serDevol: DevolService,
               private servConfirma: ConfirmaService,
               private servSorteos: ConsultaSorteosService) { }

  ngOnInit() {
    // this.loguear();
    this.consultarSorteos();
  }
  loguear() {
    this.cargando = true;
    this.error = false;
    this.servLogin.connectService(this.objLogin).subscribe( (respuesta: any) => {
      this.objDist = respuesta.dist;
      if (this.objDist.length > 0) {
        // Se encontró el distribuidor
        this.error = false;
        sessionStorage.setItem('data', JSON.stringify(this.objDist));
        this.nombreDistribuidor = this.objDist[0].nombre;
        this.logueado = true;
        this.objDist.forEach( (valorActual, ind) => {
          const nombreArch = valorActual.arch + this.sorteo + '.' + valorActual.ext;
          this.arrArchivosPermitidos.push(nombreArch);
        });
      } else {
        this.error = true;
        this.logueado = false;
      }
      this.cargando = false;
    });
  }

  logout() {
    this.logueado = false;
    this.objLogin = {
      usr: '',
      pwd: ''
    };
    this.objDist = [];
    this.error = false;
    this.cargando = false;
    this.nombreDistribuidor = '';
  }
  changeListener($event): void {
    // Callback al seleccionar un archivo
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    // Captura propiedades del archivo selecionado
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    this.filename = file.name.replace(/ /g, '_');
    const arrFileName = this.filename.split('.');
    const ultExtension = arrFileName[arrFileName.length - 1].toLowerCase();
    if (ultExtension === 'jen' && arrFileName.length > 2) {
      this.extension = arrFileName[arrFileName.length - 2].toLowerCase() + '.' + ultExtension.toLowerCase();
    } else {
      this.extension = ultExtension;
    }
    myReader.onloadend = (e) => {
      this.file = myReader.result;
      const arrFile = this.file.split(',');
      this.file64 = arrFile[1];
    };
    myReader.readAsDataURL(file);
  }

  enviarArchivo(form: NgForm) {
    // console.log('enviando: ', form)
  }

  loadFile() {
    this.devolIniciada = true;
    const ta = JSON.parse( sessionStorage.getItem('ta') );
    // Consume el servicio para cargar el archivo
    this.cargando = true;
    const parametrosCarga = {
      devol : {
      base64 : this.file64,
      nombre : this.filename,
      dist : this.objLogin.usr
      }
    };
    this.serDevol.connectService(parametrosCarga).subscribe( (data: any) =>  {
      this.devolConectada = true;
      if (data.codigoRespuesta !== '-1') {
        this.devolEnviada = true;
        this.answer = true;
        this.errDevol = false;
        const nombreArchConf = 'conf.' + this.filename + '*';
        this.devolRecibida = true;
        const paramsConf = {devol: {archivo: nombreArchConf}};
        const refreshId = setInterval( () => {
          console.log('Intento: ', this.intentosConfirma);
          this.servConfirma.connectService(paramsConf).subscribe( (respConf: any) => {

            if (respConf.codigoRespuesta && this.intentosConfirma <= 5) {
              if (respConf.codigoRespuesta === '0') {
                console.log('La respuesta es 0');
                this.devolConfirmada = true;
                this.base64Conf = respConf.respuesta;
                const arrNom = respConf.nombre.split('/');
                this.nombreConf = arrNom[arrNom.length - 1];
                // console.log(arrNom, this.nombreConf);
                this.contenidoDevol = atob(respConf.respuesta);
                this.devolFinalizada = true;
                this.descargarConfirmacion();
                clearInterval(refreshId);
              } else {
                this.intentosConfirma ++;
                if (this.intentosConfirma >= 5) {
                  this.devolFinalizada = true;
                  this.errDevol = true;
                  clearInterval(refreshId);
                }
                // this.devolFinalizada = true;
                // clearInterval(refreshId);
              }
            } else {
              clearInterval(refreshId);
          }
        });
      }, 5000);
      } else {
        this.errDevol = true;
        this.devolFinalizada = true;
      }
      this.cargando = false;
    }, error => {
      const errorStatus = error.status;
      this.errDevol = true;
      this.cargando = false;
      this.devolFinalizada = true;
    } );
  }

  consultarSorteos() {
    this.servSorteos.connectService().subscribe( (respSorteos: any) => {
      console.log(respSorteos);
      this.arrSorteos = respSorteos.sorteos;
      if (this.arrSorteos.length > 10) {
        const hoyT = new Date();
        const cad = hoyT.getFullYear().toString() + '-' + (hoyT.getMonth() + 1).toString() + '-' + (hoyT.getDate()).toString();
        console.log('cadena de hoy', cad);
        const hoy = new Date( cad );
        // hoy = this.dateSinHora(hoy);
        console.log('hoy', +hoy);
        let a = 0;
        this.arrSorteos.forEach(element => {
          let fechaArr = new Date(element.fecha);
          fechaArr = this.dateSinHora(fechaArr);
          console.log( 'act', +fechaArr);
          if ( fechaArr < hoy) {
            // console.log('Anterior');
          }
          if ( fechaArr > hoy && a === 0) {

            if ( a === 0) {
              a++;
              // console.log('entra', +fechaArr);
              this.fechaProximoSorteo = element.fecha;
              this.numeroProximoSorteo = element.numero;
            }
            // console.log('Posterior');
          }
          if ( +fechaArr === +hoy) {
            a++;
            this.esHoy = true;
            this.fechaProximoSorteo = element.fecha;
            this.numeroProximoSorteo = element.numero;
            this.sorteo = element.numero;
          }
        });
        console.log('Proximo sorteo', this.fechaProximoSorteo, this.numeroProximoSorteo);
      }
    });
  }

  resetProcess() {
    // Reinicia el proceso
    this.file64 = null;
    this.answer = false;
    this.errDevol = false;
    this.devolIniciada = false;
    this.devolEnviada = false;
    this.devolRecibida = false;
    this.devolConfirmada = false;
    this.devolFinalizada = false;
    this.intentosConfirma = 0;
    this.devolConectada = false;
  }

  dateSinHora(dateTime) {
     const fecha = dateTime;
     const cad = fecha.getFullYear().toString() + '-' + (fecha.getMonth() + 1).toString() + '-' + (fecha.getDate() + 1).toString();
     console.log(cad);
     const ret = new Date(cad);
     return ret;
  }

  downloadBase64File(b64: string, cType: string, filename: string) {
    // Descarga a disco cualquier documento en base64
    const blob = this.b64toBlob( b64, cType, 512);
    saveAs(blob, filename);
  }
  
  b64toBlob(b64Data, contentType = '', sliceSize= 512) {
    // Convierte la cadena base 64 en binario (BLOB). Requerido para la escarga.
   const byteCharacters = atob(b64Data);
   const byteArrays = [];
   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
     const slice = byteCharacters.slice(offset, offset + sliceSize);
     const byteNumbers = new Array(slice.length);
     for (let i = 0; i < slice.length; i++) {
       byteNumbers[i] = slice.charCodeAt(i);
     }
     const byteArray = new Uint8Array(byteNumbers);
     byteArrays.push(byteArray);
   }
   const blob = new Blob(byteArrays, {type: contentType});
   return blob;
  }

  descargarConfirmacion(){
    this.downloadBase64File(this.base64Conf, 'text/plain;charset=utf-8', this.nombreConf);
  }

}


