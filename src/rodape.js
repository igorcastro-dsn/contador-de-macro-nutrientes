import {LitElement, html} from 'lit-element';

export class Rodape extends LitElement {

    constructor() {
        super();
    }

    render() {
        return html`
            <footer class="footer columns">
                <div class="content has-text-centered column is-full-width">
                    <p>
                    Desenvolvido por <a href="https://github.com/igorcastro-dsn" target="_blank">Igor de Castro</a>.
                    </p>
                </div>
            </footer>
        `;
    }

}

customElements.define('wc-rodape', Rodape);