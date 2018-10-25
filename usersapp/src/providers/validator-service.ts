import { Injectable, OnInit } from '@angular/core';

// Forms
import { FormGroup } from '@angular/forms';

@Injectable()
export class ValidatorService implements OnInit {

    public errorMessage: string;
    // Expresion regular de un numero telefonico
    private rePhone: RegExp = new RegExp(/^\d{10}$/);
    private reEmail: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);



    constructor() { }

    ngOnInit() {
    }
    /**
     * @summary Aplicar estilo de borde de input inválido
     * @param field FormControlName ==> campo a validar
     * @param form FormGroup ==> Formulario al que pertenece el campo a validar
     * @return Object json: aplica o no la clase  "is-invalid" 
     */
    public displayCss(field: string, form: FormGroup): any {
        return {
            'is-invalid': this.isFieldValid(field, form),
        };
    }
    /**
     * @summary Usada para cuando un campo no cumple una validación y  mostrar el mensaje
     * @param _field FormControlName ==> campo a validar
     * @param form FormGroup ==> Formulario al que ertenece el campo a validar
     * @return boolean
     */
    public isFieldValid(field: string, form: FormGroup): any {
        const validate = {
            error: false,
            messageError: []
        };

        if (form.get(field).invalid && form.get(field).touched) {
            if (form.get(field).errors.required) {
                validate.messageError.push('Campo requerido.');
                validate.error = true;
            }

            if (form.get(field).errors.minlength) {
                // tslint:disable-next-line:max-line-length
                validate.messageError.push('Campo requerido, por favor ingresa al menos ' + form.get(field).errors.minlength.requiredLength + ' caracteres');
                validate.error = true;
            }

            if (form.get(field).errors.maxlength) {
                validate.messageError.push('No puedes ingresar más de ' + form.get(field).errors.maxlength.requiredLength + ' caracteres');
                validate.error = true;
            }

            if (form.get(field).errors.min) {

                validate.messageError.push('Campo requerido, por favor ingresa al menos ' + form.get(field).errors.min.min + ' caracteres');
                validate.error = true;
            }

            if (form.get(field).errors.max) {
                validate.messageError.push('No puedes ingresar más de ' + form.get(field).errors.max.max + ' caracteres');
                validate.error = true;
            }

            if (form.get(field).errors.email) {
                validate.messageError.push('Por favor ingresa un correo válido');
                validate.error = true;
            }
            if (form.get(field).errors.pattern) {
                validate.messageError.push('Campo inválido');
                validate.error = true;
            }
        }
        return validate;
    }

    /**
     * @summary Indica si el formulario en general es valido
     * @param form FormGroup ==> Formulario al que se va a validar
     * @return boolean
     */
    public isFormValid(form: FormGroup): boolean {
        return form.invalid;
    }

    /**
     * @summary Revisa si el formulario en general es valido y marca como touched los campos invalidos
     * @param form FormGroup ==> Formulario al que se va a validar
     * @return any
     */
    public validateFields(form: FormGroup): any {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            control.markAsTouched({ onlySelf: true });
            if (control.invalid == true) {
                console.error("Campo invalido: " + field + "[" + control.value + "]");
            }
        });
    }
    /**
     * @summary Aplicar estilo de borde del input Teléfono inválido
     * @param _field FormControlName a validar
     * @param _form FormControl a validar
     * @return Object json: aplica o no la clase  "is-invalid"
     */
    public displayCssPhone = (_field: string, _form: FormGroup): any => {
        let result = false
        if (!this.isValidPhone(_field, _form)) {
            result = true;
        }
        return {
            'is-invalid': result,
        };
    }
    /**
     * @summary Evaluar si es válido el numero telefónico
     * @return boolean: true (Formato Valido) |  false (Formato Invalido)
     */
    public isValidPhone = (_field: string, _form: FormGroup): boolean => {
        if (_form.controls[_field].errors !== null) {
            if (_form.controls[_field].errors.required && _form.controls[_field].touched) {
                return false;
            }
        }
        if (_form.controls[_field].touched) {
            let num = this.getFormatNumber(_field, _form);
            if (num === null || num === '') {
                return true;
            } else {
                return this.rePhone.test(num);
            }
        } else {
            return true;
        }
    }
    /**
     * @summary Desenmascarar numero telefónico
     * @return string: número telefónico desennmascarado en string "3332179676"
     */
    public getFormatNumber = (_field: string, _form: FormGroup): string => {
        let num = _form.controls[_field].value !== null ? _form.controls[_field].value.replace(/\D+/g, '') : null;
        return num;
    }
    /**
     * @summary Aplicar estilo de borde del input Email inválido
     * Se tubo que hacer custum lo del email, pues Validators.email, si no pongo email o es nulo marca que hay un error con el amil
     * El error está resuelto en la version 6.0.0-beta.4, la versión usada es inferior: https://github.com/angular/angular/issues/16183
     * @param _field FormControlName a validar
     * @param _form FormControl a validar
     * @return Object json: aplica o no la clase  "is-invalid"
     */
    private displayCssEmail = (_field: string, _form: FormGroup): any => {
        let value: boolean = false;
        if (!this.isValidEmail(_field, _form)) {
            value = true;
        }
        return {
            'is-invalid': value,
        };
    }
    /**
     * @summary Evaluar si es válido el email
     * @return boolean: true (Formato Valido) |  false (Formato Invalido)
     */
    public isValidEmail = (_field: string, _form: FormGroup): boolean => {
        if (_form.controls[_field].touched) {
            let num = _form.controls[_field].value;
            if (num === null || num === '') {
                return true;
            } else {
                return this.reEmail.test(num);
            }
        } else {
            return true;
        }
    }
}