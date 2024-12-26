import styles from "./styles.module.css";
import { currentUser } from "../../data.json";
import { html, LitElement } from "lit";

class CommentForm extends LitElement {
  static properties = {
    addComment: { type: Function },
    currentUser: { type: Object },
  };
  constructor() {
    super();

    this.currentUser = {};
    this.addComment = () => {};
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form
        id="commentForm"
        class="${styles["comment-form"]}"
        @submit="${this.onSubmit}"
      >
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
        <button class="button-accent" type="submit">send</button>
      </form>
    `;
  }

  onSubmit(event) {
    event.preventDefault();
    const $form = document.querySelector("#commentForm");

    const formData = new FormData($form);

    this.addComment(formData.get("comment"));
    $form.querySelector("textarea").value = "";
  }
}

customElements.define("comment-form", CommentForm);
