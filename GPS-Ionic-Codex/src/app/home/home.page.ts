import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/angular/standalone';

import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
imports: [
  CommonModule,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
],
})
export class HomePage {

  latitud: string = '';
  longitud: string = '';
  mensaje: string = '';

  constructor() {}

  async obtenerUbicacion() {
    try {

      const permiso = await Geolocation.checkPermissions();

      if (permiso.location === 'denied') {
        this.mensaje = 'Debe conceder permisos de ubicación';
        return;
      }

      const posicion = await Geolocation.getCurrentPosition();

      this.latitud = posicion.coords.latitude.toString();
      this.longitud = posicion.coords.longitude.toString();
      this.mensaje = 'Ubicación obtenida correctamente';

    } catch (error) {
      this.mensaje = 'No se pudo obtener la ubicación';
      console.error(error);
    }
  }
}