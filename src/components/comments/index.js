import { html, LitElement } from "lit";
import "../comment";

class AppComments extends LitElement {
  static properties = {
    comments: { type: Array },
    currentUser: { type: Object },
  };

  constructor() {
    super();

    this.comments = [];
    this.currentUser = {};
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`${this.comments.map((comment) => {
      return html`<app-comment
        .comment=${comment}
        .currentUser=${this.currentUser}
      ></app-comment>`;
    })} `;
  }
}

customElements.define("app-comments", AppComments);
