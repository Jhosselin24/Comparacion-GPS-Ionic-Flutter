import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSpinner
} from '@ionic/angular/standalone';

import { Geolocation } from '@capacitor/geolocation';

import { addIcons } from 'ionicons';
import {
  locationOutline,
  alertCircleOutline,
  timeOutline,
  copyOutline,
  openOutline,
  reloadOutline,
  checkmarkOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSpinner
  ]
})
export class HomePage {

  location: any = null;
  isLoading = false;
  copied = false;

  error: {
    code: string;
    message: string;
    details: string;
  } | null = null;

  constructor() {
    addIcons({
      locationOutline,
      alertCircleOutline,
      timeOutline,
      copyOutline,
      openOutline,
      reloadOutline,
      checkmarkOutline
    });
  }

  async getCurrentLocation() {

    this.isLoading = true;
    this.error = null;
    this.location = null;

    try {

      await Geolocation.requestPermissions();

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });

      const fecha = new Date();

      this.location = {
        latitude: position.coords.latitude.toFixed(6),
        longitude: position.coords.longitude.toFixed(6),
        accuracy: position.coords.accuracy.toFixed(1),
        dateString: fecha.toLocaleString()
      };

    } catch (err) {

      this.error = {
        code: 'GPS_ERROR',
        message: 'No se pudo obtener la ubicación',
        details: 'Verifica permisos y GPS.'
      };

    } finally {
      this.isLoading = false;
    }
  }

  copyCoordinates() {

    if (!this.location) return;

    navigator.clipboard.writeText(
      `${this.location.latitude}, ${this.location.longitude}`
    );

    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

  openGoogleMaps() {

    if (!this.location) return;

    window.open(
      `https://www.google.com/maps?q=${this.location.latitude},${this.location.longitude}`,
      '_blank'
    );
  }
}