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
    return html`${this.comments.map((comment) => {
      return html`<app-comment
        .comment=${comment}
        .currentUser=${this.currentUser}
        .deleteReply=${this.deleteReply.bind(this)}
        .deleteComment=${this.deleteComment.bind(this)}
      ></app-comment>`;
    })} `;
  }

  deleteReply(commentId, replyId) {
    this.comments = this.comments.map(function (comment) {
      if (comment.id == commentId) {
        comment.replies = comment.replies.filter(
          (reply) => reply.id != replyId
        );
        return comment;
      }

      return comment;
    });
  }

  deleteComment(commentId) {
    this.comments = this.comments.filter((comment) => comment.id != commentId);
  }
}

customElements.define("app-comments", AppComments);
