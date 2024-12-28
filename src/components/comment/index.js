import { html, LitElement } from "lit";
import styles from "./styles.module.css";
import "../comment-content";
import commentFormStyles from "../comment-form/styles.module.css";
import { onClickOutside } from "../../helpers";

class AppComment extends LitElement {
  static properties = {
    comment: { type: Object },
    currentUser: { type: Object },
    replyData: { type: Object },
  };

  constructor() {
    super();

    this.comment = {};
    this.currentUser = {};
    this.replyData = {
      replying: false,
      to: null,
      isReply: false,
      replyingToId: null,
    };
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
          .showReplyForm=${() => this.showReplyForm(this.comment.user.username)}
        ></comment-content>
        ${this.replyData.replying && !this.replyData.isReply
          ? this._renderReplyForm()
          : html``}
        ${this.comment.replies.length > 0
          ? html`
              <section class="${styles.replies}">
                ${this.comment.replies.map((reply) => {
                  return html`
                    <comment-content
                      .comment=${reply}
                      .currentUser=${this.currentUser}
                      .showReplyForm=${() =>
                        this.showReplyForm(reply.user.username, true, reply.id)}
                      .showDeleteModal=${() =>
                        this.showDeleteModal(reply.id, this.comment.id)}
                    ></comment-content>
                    ${this.replyData.replying &&
                    this.replyData.isReply &&
                    this.replyData.replyingToId == reply.id
                      ? this._renderReplyForm()
                      : html``}
                  `;
                })}
              </section>
            `
          : html``}
      </article>
    `;
  }

  _renderReplyForm() {
    return html`
      <form
        id="replyForm"
        class="${commentFormStyles["comment-form"]}"
        @submit="${this.addReply}"
      >
        <textarea
          name="reply"
          id="reply"
          aria-label="Reply"
          placeholder="Add a reply..."
        ></textarea>
        <img
          src="${this.currentUser.image.webp}"
          alt="${this.currentUser.username} profile photo"
        />
        <button class="button-accent" type="submit">Reply</button>
      </form>
    `;
  }

  showReplyForm(to, isReply = false, replyingToId = null) {
    this.replyData = {
      replying: true,
      to,
      isReply,
      replyingToId,
    };
    onClickOutside(this, () => {
      this.replyData = {
        replying: false,
        to: null,
        isReply: false,
        replyingToId: null,
      };
    });
  }

  addReply(event) {
    event.preventDefault();

    const $form = document.getElementById("replyForm");
    const formData = new FormData($form);

    this.comment = {
      ...this.comment,
      replies: [
        ...this.comment.replies,
        {
          id: Date.now(),
          content: formData.get("reply"),
          createdAt: "now",
          score: 0,
          replyingTo: this.replyData.to,
          user: this.currentUser,
        },
      ],
    };

    this.replyData = {
      replying: false,
      to: null,
      isReply: false,
    };
  }

  showDeleteModal(commentId, parentCommentId) {
    const $form = document.querySelector("#deleteCommentModal");

    if (parentCommentId) {
      $form.dataset.parentComment = parentCommentId;
    } else {
      $form.dataset.parentComment = "";
    }
    $form.dataset.comment = commentId;

    $form.showModal();
  }
}

customElements.define("app-comment", AppComment);
