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
      <comment-form
        .currentUser=${this.currentUser}
        .addComment=${this.addComment.bind(this)}
      ></comment-form>
    `;
  }

  addComment(content) {
    this.comments = [
      ...this.comments,
      {
        id: ++this.comments.length,
        content,
        score: 0,
        createdAt: "now",
        user: this.currentUser,
        replies: [],
      },
    ];
  }
}

customElements.define("my-app", MyApp);
