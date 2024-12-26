import { html, LitElement } from "lit";
import { comments, currentUser } from "./data.json";
import "./components/comment-form";
import "./components/comments";
import "./components/modal";

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
      <delete-modal
        .deleteComment=${this.deleteComment.bind(this)}
      ></delete-modal>
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

  deleteComment(commentId, parentCommentId) {
    if (parentCommentId) {
      this.comments = this.comments.map((comment) => {
        if (comment.id == parentCommentId) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id != commentId),
          };
        }
        return comment;
      });
      return;
    }

    this.comments = this.comments.filter((comment) => comment.id != commentId);
  }
}

customElements.define("my-app", MyApp);
