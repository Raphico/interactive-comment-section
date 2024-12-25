import { html, LitElement } from "lit";
import "./components/comment-form";
import "./components/comments";
import { comments, currentUser } from "./data.json";

class MyApp extends LitElement {
  static properties = {
    comments: { type: Array },
    currentUser: { type: Object },
  };

  constructor() {
    super();

    this.comments = comments;
    this.currentUser = currentUser;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <app-comments
        .comments=${this.comments}
        .currentUser=${this.currentUser}
      ></app-comments>
      <comment-form .currentUser=${this.currentUser}></comment-form>
    `;
  }
}

customElements.define("my-app", MyApp);
