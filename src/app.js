import {LitElement, html, css} from 'lit-element';
import './menu.js';
import './calculadora-de-calorias.js';
import './resultado.js';
import './macro-nutrientes.js';
import './rodape.js';

export class App extends LitElement {

    static get styles() {
        return css`
            .main {
                padding-top: 50px;
            }
        `;
    }

    static get properties() {
        return {
        }
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">

            <wc-menu></wc-menu>

            <div class="container">
                <section class="main columns">
                    <div class="calculo column is-5">
                        <wc-calculadora-de-calorias></wc-calculadora-de-calorias>
                    </div>
                    <div class="column is-7">
                        <div class="resultados columns">
                            <div class="column is-4">
                                <wc-resultado
                                    tipo="deficit" 
                                    titulo="Déficit Calórico">
                                </wc-resultado>
                            </div>

                            <div class="column is-4">
                                <wc-resultado 
                                    tipo="manutencao" 
                                    titulo="Manutenção do peso">
                                </wc-resultado>
                            </div>
                        
                            <div class="column is-4">
                                <wc-resultado 
                                    tipo="superavit" 
                                    titulo="Superávit Calórico">
                                </wc-resultado>
                            </div>
                        </div>
                        <div class="macros columns">
                            <div class="column">
                                <wc-macro-nutrientes></wc-macro-nutrientes>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <wc-rodape></wc-rodape>
        `;
    }
}

customElements.define("wc-app", App);