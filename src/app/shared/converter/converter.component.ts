import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../core/services/currency/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  currencyPrices: Object = null;
  from: string = 'usd';
  to: string = 'usd';
  errFetch: boolean;
  errInput: boolean;
  curValue: string;
  result: number;

  constructor(
    private _currencySrevice: CurrencyService
  ) { }

  ngOnInit() {
    this.result = 0;
    this.errFetch = false;
    this.errInput = false;

    this._currencySrevice.getValues()
    .subscribe(
      data => {
        this.currencyPrices = data;
        console.log(data)
      },
      err => {
        this.errFetch = true;
      }
    )
  }

  handleChangeValue(e: Event) {
    this.errInput = false;
    this.curValue = (<HTMLInputElement>e.target).value;
  }

  clearValue() {
    this.curValue = ''
  }

  handleChangeFrom(e: Event) {
    this.from = (<HTMLInputElement>e.target).value;
  }

  handleChangeTo(e: Event) {
    this.to = (<HTMLInputElement>e.target).value;
  }

  handleConvert() {
    this.validate()
  }

  validate() {
    if (!this.curValue || isNaN(Number(this.curValue))) {
      this.errInput = true;
      return;
    }

    const cur = parseFloat(this.curValue);

    this.result = (cur/this.currencyPrices[this.from])*this.currencyPrices[this.to]
  }
}
