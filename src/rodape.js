    import {LitElement, html, css} from 'lit-element';

export class Rodape extends LitElement {

    static get styles() {
        return css`
            .footer {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 20%;
            }
        `;
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
            <footer class="footer has-background-light">
                <div class="content">
                    <p class="has-text-centered">
                        Desenvolvido por <a href="https://github.com/igorcastro-dsn" target="_blank">Igor de Castro</a>.
                    </p>
                </div>
            </footer>
        `;
    }

}

customElements.define('wc-rodape', Rodape);