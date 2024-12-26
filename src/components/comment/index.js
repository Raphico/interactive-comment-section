import { html, LitElement } from "lit";
import styles from "./styles.module.css";
import "../comment-content";

class AppComment extends LitElement {
  static properties = {
    comment: { type: Object },
    currentUser: { type: Object },
    deleteReply: { type: Function },
    deleteComment: { type: Function },
  };

  constructor() {
    super();

    this.comment = {};
    this.currentUser = {};
    this.deleteReply = () => {};
    this.deleteComment = () => {};
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
          .deleteComment=${this.deleteComment}
        ></comment-content>

        ${this.comment.replies.length > 0
          ? html`
              <section class="${styles.replies}">
                ${this.comment.replies.map((reply) => {
                  return html`
                    <comment-content
                      .parentCommentId=${this.comment.id}
                      .comment=${reply}
                      .currentUser=${this.currentUser}
                      .deleteReply=${this.deleteReply}
                    ></comment-content>
                  `;
                })}
              </section>
            `
          : html``}
      </article>
    `;
  }
}

customElements.define("app-comment", AppComment);
