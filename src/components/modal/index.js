import { html, LitElement } from "lit";
import styles from "./styles.module.css";

class DeleteModal extends LitElement {
  static properties = {
    deleteComment: { type: Function },
  };

  constructor() {
    super();

    this.deleteComment = () => {};
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <dialog id="deleteCommentModal">
        <form method="dialog">
          <h2>Delete comment</h2>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can’t be undone.
          </p>
          <div class="modal-actions">
            <button class="${styles["button-cancel"]} button-accent">
              no, cancel
            </button>
            <button
              @click=${this.onClickDeleteButton}
              type="button"
              class="${styles["button-delete"]} button-accent"
            >
              yes, delete
            </button>
          </div>
        </form>
      </dialog>
    `;
  }

  onClickDeleteButton() {
    const $dialog = document.getElementById("deleteCommentModal");

    const parentCommentId = $dialog.dataset.parentComment;
    const commentId = $dialog.dataset.comment;

    this.deleteComment(commentId, parentCommentId);

    $dialog.close();
  }
}

customElements.define("delete-modal", DeleteModal);
