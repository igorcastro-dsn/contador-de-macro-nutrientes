import {LitElement, html, css} from 'lit-element';

export class Resultado extends LitElement {

    static get styles() {
        return css`
            .card:hover {
                box-shadow: 1px 2px 10px grey;
                cursor: pointer;
            }
        `;
    }

    static get properties() {
        return {
            calorias: { type: Number },
            titulo: { type: String },
            tipo: { type:  String },
            cor: { type: String },
            planoCaloricoSelecionado: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.calorias = null;
        this.titulo = null;
        this.descricao = null;
        this.tipo = null;
        this.cor = null;
        this.planoCaloricoSelecionado = false;

        document.addEventListener('on-tmb-calculada', this._handleCalorias);
    }

    set calorias(valor) {
        const valorAnterior = this._calorias;
        this._calorias = this._formatarNumero(valor);
        this.requestUpdate('calorias', valorAnterior);
    }
    
    get calorias() { 
        return this._calorias; 
    }

    _handleCalorias = (e) => { 
        const tmb = e.detail.tmb;

        if (tmb === 0) {
            this.calorias = 0;
            this.cor = null;
            this._dispararEventoComCalorias();
            return;
        }

        if (this.tipo === "deficit") {
            this.calorias = tmb - (tmb * 0.2);
            this.cor = "has-text-danger-dark";
        } else if (this.tipo === "manutencao") {
            this.calorias = tmb;
            this.cor = "has-text-info-dark";
        } else if (this.tipo === "superavit") {
            this.calorias = tmb + 400;
            this.cor = "has-text-primary-dark";
        } else {
            this.calorias = 0;
        }
    }

    _formatarNumero(valor) {
        return (Math.round(valor * 100) / 100).toFixed(2);
    }

    _dispararEventoComCalorias(e) {
        document.dispatchEvent(
            new CustomEvent('on-calorias', {
                detail: this.calorias,
                composed: true,
            })
        );
    }

    render() {
        return html `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">

            <div class="card" @click=${this._dispararEventoComCalorias}>
                <div class="card-content">
                    <div class="has-text-centered">
                        <p class="heading">${this.titulo}</p>
                        <p class="title ${this.cor ? this.cor : ""}">${this.calorias} kcal</p>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("wc-resultado", Resultado);