// tslint:disable:no-console
import { observable, computed, action } from 'mobx';

export class Temperature {
  @observable unit = 'C';
  @observable temperatureCelsius = 25;

  @computed
  get temperatureKelvin() {
    console.log('get temperatureKelvin');
    return this.temperatureCelsius * (9 / 5) + 32;
  }

  @computed
  get temperatureFahrenheit() {
    console.log('get temperatureFahrenheit');
    return this.temperatureCelsius + 273.15;
  }

  @computed
  get formatted() {
    console.log('get formatted');
    switch (this.unit) {
      case 'K':
        return this.temperatureKelvin + ' °K';
      case 'F':
        return this.temperatureFahrenheit + ' °F';
      case 'C':
        return this.temperatureCelsius + ' °C';
    }
  }

  @action
  setUnit(value: string) {
    this.unit = value;
  }

  @action
  setTemperatureCelsius(value: number) {
    this.temperatureCelsius = value;
  }
}
