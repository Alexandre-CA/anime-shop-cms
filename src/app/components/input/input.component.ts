import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
    selector: 'sbpro-input',
    templateUrl: './input.component.html',
    styleUrls: ['input.component.scss'],
})
export class InputComponent implements OnInit, AfterViewInit, OnDestroy,OnChanges {
    @ViewChild('ngInput') ngInput!: NgModel

    /**Atributo name do input */
    @Input() name?: string

    /**
     * Atributo required do input
     * @default true
     **/
    @Input() required?: boolean = true;

    /**Atributo placeholder do input */
    @Input() placeholder?: string

    /**
     * Type do input
     * @param text input de texto
     * @param email input como tipo email, contento validação de email
     * @param tel input de telefone, com máscara de telefone e de números
     * @param document input para CPF/CNPJ, com máscara de CPF/CNPJ
     * @param area input de texto com mais de uma linha
     * @default 'text'
     */
    @Input() type?: 'text' | 'email' | 'tel' | 'area' = 'text'

    /**
     * Atributo disabled do input
     * @default false
     **/
    @Input() disabled?: boolean = false
    /**
     * adicionar clases no input
     **/
    @Input() classes?: string
    /**
     * dicionar style no input
     **/
    @Input() styles?: string
    /**
     * Atributo id do input
     **/
    @Input() id?: string

    /**
     * Atributo readOnly do input
     * @default false
     *  */
    @Input() readonly?: boolean = false

    /**
     * Adiciona a classe de 'isInvalid' no input
     * @default false
     *  */
    @Input() isInvalid?: boolean = false

    /**
     * Limite máxmimo de caracteres no input 
     * @default 100
     * */
    @Input() maxlength?: number = 100

    /**
     * Limite mínimo de caracteres no input 
     * @default 3
     * */
    @Input() minlength?: number = 3

    /**
     * Altura maximo do input caso 'type = 'area'"
     * @default 48
     **/
    @Input() maxHeight?: number = 48

    /**
     * Altura mínimo do input caso 'type = 'area'"
     * @default 48
     **/
    @Input() minHeight?: number = 48

    /**
     * Define se sera possivel alterar o tamanho do input caso "type = 'area'"
     * @default true
     *  */
    @Input() resise?: boolean = true

    /**Pattern personalizada para o menu */
    @Input() pattern?: string

    /**Evento para quando o campo do input for alterado */
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

    /**Evento para quadno o campo do input desfocado */
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();

    /**Evento para quadno o campo do input focado */
    @Output() focus: EventEmitter<any> = new EventEmitter<any>();

    /**Define o label do input
     * Caso não seja passado o nome do input sera usado como label
     */
    @Input() label!: string

    /**
     * Popover de duvida
     */
    @Input() question?: any

    /**
     * placement do popover de question
     * @default 'top'
     * */
    @Input() questionPlacement?: 'top' | 'left' | 'right' | 'bottom' = 'top'

    /** Formulario do input*/
    @Input() ngForm!: NgForm

    /** Valor do input  */
    @Input() value?: string

    /** Mascara personalizada do input*/
    @Input() mask?: string

    /**
     * Mostrar o tamnanho maximo input
     * @default false
     *  */
    @Input() showMaxLength?: boolean = false

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    @Output() requiredChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    

    public emailPattern = "[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    public telMask = "(00) 0000-0000||(00) 0 0000-0000"
    public isDarkMode: boolean = false;
    private subscriptions: Subscription[] = []

    constructor(
    ) { }
    public onInputChange() {
        this.valueChange.emit(this.value)
    }
    ngOnInit() {
        if (!this.name) {
            this.name = this.label.trim().toLowerCase().replace(/\s/g, '-');
        }
        if(!this.id){
            this.id = this.name;
        }
        if (this.type === 'email' && !this.pattern) {
            this.pattern = this.emailPattern;
        } else if (this.type === 'tel' && !this.mask) {
            this.mask = this.telMask;
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.ngForm.addControl(this.ngInput)
        }, 0)
    }
    ngOnDestroy(): void {

    }
}