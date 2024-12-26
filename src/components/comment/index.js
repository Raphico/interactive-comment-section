import { html, LitElement } from "lit";
import styles from "./styles.module.css";
import "../comment-content";

class AppComment extends LitElement {
  static properties = {
    comment: { type: Object },
    currentUser: { type: Object },
  };

  constructor() {
    super();

    this.comment = {};
    this.currentUser = {};
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <article>
        <comment-content
          .comment=${this.comment}
          .currentUser=${this.currentUser}
          .showDeleteModal=${() => this.showDeleteModal(this.comment.id)}
        ></comment-content>

        ${this.comment.replies.length > 0
          ? html`
              <section class="${styles.replies}">
                ${this.comment.replies.map((reply) => {
                  return html`
                    <comment-content
                      .comment=${reply}
                      .currentUser=${this.currentUser}
                      .showDeleteModal=${() =>
                        this.showDeleteModal(reply.id, this.comment.id)}
                    ></comment-content>
                  `;
                })}
              </section>
            `
          : html``}
      </article>
    `;
  }

  showDeleteModal(commentId, parentCommentId) {
    const $form = document.querySelector("#deleteCommentModal");

    if (parentCommentId) {
      $form.dataset.parentComment = parentCommentId;
    }
    $form.dataset.comment = commentId;

    $form.showModal();
  }
}

customElements.define("app-comment", AppComment);
