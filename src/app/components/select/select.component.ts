import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @ViewChild('ngInput') ngInput!: NgModel

  /**Atributo name do select */
  @Input() name?: string

  /**
   * Atributo required do select
   * @default true
   *  */
  @Input() required?: boolean = true;

  /**
   * Atributo placeholder do select
   * @default 'Selecione...''
   *  */
  @Input() placeholder?: string = 'Selecione...'

  /**
   * Atributo disabled do select
   * @default false
   *  */
  @Input() disabled?: boolean = false

  /**
   * Possibilita escolher multiplos valores
   * @default false
   *  */
  @Input() multiple?: boolean = false

  /**
   * Habilita botão para limpar o select
   * @default false
   * */
  @Input() allowClear?: boolean = false

  /**
   * Fechar automaticamente ao selecionar um valor
   * @default true
   *  */
  @Input() closeOnSelect?: boolean = true

  /**
   * Caso "multiple = true" limite maximo de items
   * @default 300
   *  */
  @Input() maxlength?: number = 300

  /**
   * Caso "multiple = true" limite minimo de items
   * @default 1
   *  */
  @Input() minlength?: number = 1

  /**Nome do atributo que sera o 'value' do 'option' */
  @Input() optionValueField!: string

  /**Nome do atributo que sera o texto do 'option' */
  @Input() optionTextField!: string

  /**Vetor de items do select */
  @Input() items!: any[]

  @Output() selectionChanges?: EventEmitter<any> = new EventEmitter<any>()

  /**Caso "multiple = true" evento de quando uma das opções for deselecionada */
  @Output() remove?: EventEmitter<any> = new EventEmitter<any>()

  /**Caso "allowClear = true" evento de quando o select for limpo usando o botão de clear*/
  @Output() clear?: EventEmitter<any> = new EventEmitter<any>()

  /**Caso "multiple = true" evento de quando uma opção e selecionada */
  @Output() add?: EventEmitter<any> = new EventEmitter<any>()

  /**
   * Define o label do input
   * Caso não seja passado o nome do input sera usado como label
  */
  @Input() label!: string

  /**
   *  Precedencia minima da permissão para usar o select
   * @default 3
   * */
  @Input() precedence?: number = 3;

  /** Formulario do select*/
  @Input() ngForm!: NgForm

  /** Valor do select */
  @Input() value?: any

  /**Nome do menu para onde o botão de novo item irá levar */
  @Input() menuName?: string

  /**
   * Habilita o modo de carregamento
   * @default false
   *  */
  @Input() loading?: boolean = false;

  /**
   * Select exclusivo para etiquetas
   * @default false
   *  */
  @Input() isTag?: boolean = false;

  /**
   * Habilita o modo de checkbox do select
   * @default false
   *  */
  @Input() isCheckbox?: boolean = false;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  public isDarkMode: boolean = false;
  public search: string = "";
  private subscriptions: Subscription[] = [];
  public isMaleWord: boolean = true;
  public routeNew: string = "";
  constructor(

  ) { }
  public onInputChange(ev: any) {
    this.selectionChanges?.emit(ev)
  }
  public onInputAdd(ev: any) {
    this.add?.emit(ev)
  }
  public onRemove(ev: any) {
    this.remove?.emit(ev)
  }
  public onClear(ev: any) {
    this.clear?.emit(ev)
  }
  private verifyGender(word: string): boolean {
    /**
     ** Verificar se o gênero da palavra é masculino ou feminino
     */
    if (word[word.length - 1] === 'a') {
      return false;
    }
    else {
      return true;
    }
  }
  public getOptionFild(item:any):string {
    return item[this.optionTextField]
  }
  ngOnInit() {
    if (!this.name && this.label) {
      this.name = this.label?.trim().toLowerCase().normalize('NFC').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-');
    }
    if (this.label) {
      this.isMaleWord = this.verifyGender(this.label);
    }

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ngForm.addControl(this.ngInput)
    }, 0)
  }
}
