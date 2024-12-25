import styles from "./styles.module.css";
import { currentUser } from "../../data.json";
import { html, LitElement } from "lit";

class CommentForm extends LitElement {
  static properties = {
    currentUser: { type: Object },
  };
  constructor() {
    super();

    this.currentUser = {};
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form class="${styles["comment-form"]}">
        <textarea
          name="comment"
          id="comment"
          aria-label="comment"
          placeholder="Add a comment..."
        ></textarea>
        <img
          src="${this.currentUser.image.webp}"
          alt="${this.currentUser.username} profile photo"
        />
        <button class="button-accent">send</button>
      </form>
    `;
  }
}

customElements.define("comment-form", CommentForm);
