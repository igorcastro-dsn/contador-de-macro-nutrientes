import {LitElement, html} from 'lit-element';

export class MacroNutrientes extends LitElement {

    static get properties() {
        return {
            peso: { type: Number, attribute: false },

            totalDeProteinas: { type: Number, attribute: false },
            totalDeGorduras: { type: Number, attribute: false },
            totalDeCarboidratos: { type: Number, attribute: false },

            caloriasDaProteina: { type: Number, attribute: false },
            caloriasDaGordura: { type: Number, attribute: false },
            caloriasDoCarboidrato: { type: Number, attribute: false },
            caloriasTotais: { type: Number, attribute: false}
        }
    }

    constructor() {
        super();
        
        this._inicializarVariaveis();

        document.addEventListener("on-tmb-calculada", this._salvarPeso);
        document.addEventListener("on-calorias", this._caloriasTotais)
    }

    _inicializarVariaveis() {
        this.peso = 0;

        this.totalDeProteinas = 0;
        this.totalDeGorduras = 0;
        this.totalDeCarboidratos = 0;

        this.caloriasDaProteina = 0;
        this.caloriasDaGordura = 0;
        this.caloriasDoCarboidrato = 0;
        this.caloriasTotais = 0;
    }

    _salvarPeso = (e) => { 
        this.peso = e.detail.peso;
    }

    _caloriasTotais = (e) => {
        this.caloriasTotais = e.detail;
        
        if (this.caloriasTotais == 0.00) {
            this._inicializarVariaveis();
            return;
        }
        
        const numeroDeCasasDecimais = 1;

        this.totalDeProteinas = this._formatarNumero(this.peso * 2, numeroDeCasasDecimais);
        this.caloriasDaProteina = this._formatarNumero(this.totalDeProteinas * 4);

        this.totalDeGorduras = this._formatarNumero(this.peso * 0.8, numeroDeCasasDecimais);
        this.caloriasDaGordura = this._formatarNumero(this.totalDeGorduras * 9);

        const carboidratos = (this.caloriasTotais - this.caloriasDaProteina - this.caloriasDaGordura) / 4;
        this.totalDeCarboidratos = this._formatarNumero(carboidratos, numeroDeCasasDecimais);
        this.caloriasDoCarboidrato = this._formatarNumero(this.totalDeCarboidratos * 4);
    }

    _formatarNumero(valor, casasDecimais = 2) {
        return (Math.round(valor * 100) / 100).toFixed(casasDecimais);
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">

            <div class="columns">
                <div class="column has-text-centered proteina">
                    <p class="heading">Proteína</p>
                    <p class="title">${this.totalDeProteinas} g</p>
                    <p class="">${this.caloriasDaProteina} kcal</p>
                </div>

                <div class="column has-text-centered gordura">
                    <p class="heading">Gordura</p>
                    <p class="title">${this.totalDeGorduras} g</p>
                    <p class="">${this.caloriasDaGordura} kcal</p>
                </div>

                <div class="column has-text-centered carboidrato">
                    <p class="heading">Carboidrato</p>
                    <p class="title">${this.totalDeCarboidratos} g</p>
                    <p class="">${this.caloriasDoCarboidrato} kcal</p>
                </div>
            </div>
        `;
    }
}

customElements.define("wc-macro-nutrientes", MacroNutrientes);
