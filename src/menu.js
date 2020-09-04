import {LitElement, html} from 'lit-element';

export class Menu extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
            
            <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="#">
                        # Calculadora de Macros #
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item">
                            Página inicial
                        </a>

                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                Tecnologias utilizadas
                            </a>

                            <div class="navbar-dropdown">
                                <a class="navbar-item" href="https://lit-html.polymer-project.org/" target="_blank">
                                    Lit-html
                                </a>

                                <a class="navbar-item" href="https://lit-element.polymer-project.org/" target="_blank">
                                    Lit-Element
                                </a>

                                <a class="navbar-item" href="https://bulma.io" target="_blank">
                                    Bulma
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('wc-menu', Menu);