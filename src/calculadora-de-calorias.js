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
        this._limparForm();

        document.dispatchEvent(
            new CustomEvent('on-tmb-calculada', {
                detail: {tmb: this.tmb, peso: this.peso},
                composed: true,
            })
        );
    }
    
    _limparForm() {
        const genero = this.shadowRoot.querySelector("input[name=genero]:checked");
        if (genero) {
            genero.checked = false
        }
        this.shadowRoot.querySelector(".input-idade").value = null;
        this.shadowRoot.querySelector(".input-peso").value = null;
        this.shadowRoot.querySelector(".input-altura").value = null;
        this.shadowRoot.querySelector(".select-nivel-de-atividade").value = 0;
    }

    render() {
        return html`
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
        />

        <div class="box">
            <form>
                <div class="columns is-multiline">
                    <div class="column is-12">
                        <div class="field">
                            <label class="label">Gênero</label>
                            <div class="control">
                                <label class="radio">
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="masculino"
                                        @click=${this._setGenero}
                                    />
                                    Masculino
                                </label>
                                <label class="radio">
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="feminino"
                                        @click=${this._setGenero}
                                    />
                                    Feminino
                                </label>
                            </div>  
                        </div>
                    </div>

                    <div class="column is-2">
                        <div class="field">
                            <label class="label">Idade</label>
                            <div class="control">
                                <input
                                    class="input input-idade"
                                    type="text"
                                    placeholder=""
                                    @input=${this._setIdade}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="column is-2">
                        <div class="field">
                            <label class="label">Peso</label>
                            <div class="control">
                                <input
                                    class="input input-peso"
                                    type="text"
                                    placeholder="kg"
                                    @input=${this._setPeso}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="column is-2">
                        <div class="field">
                            <label class="label">Altura</label>
                            <div class="control">
                                <input
                                    class="input input-altura"
                                    type="text"
                                    placeholder="cm"
                                    @input=${this._setAltura}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="column is-12">
                        <div class="field">
                            <label class="label">Nível de atividade</label>
                            <div class="control">
                                <div class="select">
                                    <select class="select-nivel-de-atividade" @change=${this._setNivelDeAtividade}>
                                        <option value="0">--- Selecionar ---</option>
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

                    <div class="column is-12">
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
                    </div>
                </div>
            </form>
        </div>
        `;
    }
}

customElements.define('wc-calculadora-de-calorias', CalculadoraDeCalorias);
