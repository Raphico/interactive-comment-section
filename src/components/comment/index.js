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
        ></comment-content>

        ${this.comment.replies.length > 0
          ? html`
              <section class="${styles.replies}">
                ${this.comment.replies.map((reply) => {
                  return html`
                    <comment-content
                      .comment=${reply}
                      .currentUser=${this.currentUser}
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
