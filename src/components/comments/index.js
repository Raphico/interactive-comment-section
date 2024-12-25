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
    const currentUser = this.currentUser;
    return html`${this.comments.map(function renderComment(comment) {
      return html`<app-comment
        .comment=${comment}
        .currentUser=${currentUser}
      ></app-comment>`;
    })} `;
  }
}

customElements.define("app-comments", AppComments);
