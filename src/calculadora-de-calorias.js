import {LitElement, html} from 'lit-element';

export class CalculadoraDeCalorias extends LitElement {
    
    static get properties() {
        return {
            genero: {type: String, attribute: false},
            idade: {type: Number, attribute: false},
            peso: {type: Number, attribute: false},
            altura: {type: Number, attribute: false},
            nivelDeAtividade: {type: Number, attribute: false},
            tmb: {type: Number, attribute: false}
        };
    }

    constructor() {
        super();

        this._inicializarVariaveis();
    }

    _inicializarVariaveis() {
        this.genero = null;
        this.idade = null;
        this.peso = null;
        this.altura = null;
        this.nivelDeAtividade = null;
        this.tmb = null;
    }

    _setGenero(e) {
        this.genero = e.target.value;
    }

    _setIdade(e) {
        this.idade = e.target.value;
    }

    _setPeso(e) {
        this.peso = e.target.value;
    }

    _setAltura(e) {
        this.altura = e.target.value;
    }

    _setNivelDeAtividade(e) {
        this.nivelDeAtividade = e.target.value;
    }

    /**
     * TMB = Taxa Metabólica Basal
     */
    _calcularTMB(e) {
        e.preventDefault();

        if (this.genero == 'masculino') {
            this.tmb = (10 * this.peso + 6.25 * this.altura - 5 * this.idade + 5) * this.nivelDeAtividade;
        } else {
            this.tmb = (10 * this.peso + 6.25 * this.altura - 5 * this.idade - 161) * this.nivelDeAtividade;
        }

        document.dispatchEvent(
            new CustomEvent('on-tmb-calculada', {
                detail: {tmb: this.tmb, peso: this.peso},
                composed: true,
            })
        );
    }

    _limpar(e) {
        e.preventDefault();

        this._inicializarVariaveis();

        // TODO: Limpar do formulário  

        alert("Ainda não estamos limpando o formulário, desculpe!");

        document.dispatchEvent(
            new CustomEvent('on-tmb-calculada', {
                detail: {tmb: this.tmb, peso: this.peso},
                composed: true,
            })
        );
    }

    render() {
        return html`
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
        />

        <form>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">Gênero</label>
                </div>
                <div class="field-body">
                    <div class="field is-narrow">
                        <div class="control">
                            <label class="radio">
                                <input
                                    type="radio"
                                    name="member"
                                    value="masculino"
                                    @click=${this._setGenero}
                                />
                                Masculino
                            </label>
                            <label class="radio">
                                <input
                                    type="radio"
                                    name="member"
                                    value="feminino"
                                    @click=${this._setGenero}
                                />
                                Feminino
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Idade</label>
                </div>
                <div class="field-body">
                    <div class="field is-2">
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder=""
                                @input=${this._setIdade}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Peso</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="kg"
                                @input=${this._setPeso}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Altura</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="cm"
                                @input=${this._setAltura}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Nível de atividade</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <div class="select">
                                <select @change=${this._setNivelDeAtividade}>
                                    <option>--- Selecionar ---</option>
                                    <option value="1.2">Sedentário</option>
                                    <option value="1.375">Exercícios leves (1-2 vezes por semana)</option>
                                    <option value="1.55">Exercícios moderados (3-5 vezes por semana)</option>
                                    <option value="1.725">Exercícios pesados (6-7 vezes por semana)</option>
                                    <option value="1.9">Exercícios muito pesados (2 vezes por dia)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-primary" @click=${this._calcularTMB}>
                        Calcular
                    </button>
                </div>
                <div class="control">
                    <button class="button is-primary is-light" @click=${this._limpar}>Limpar</button>
                </div>
            </div>
        </form>
        `;
    }
}

customElements.define('wc-calculadora-de-calorias', CalculadoraDeCalorias);
