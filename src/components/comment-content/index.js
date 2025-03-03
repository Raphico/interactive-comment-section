import { html, LitElement } from "lit";
import { onClickOutside, parseRelativeTime } from "../../helpers";
import styles from "./styles.module.css";

class CommentContent extends LitElement {
  static properties = {
    comment: { type: Object },
    currentUser: { type: Object },
    showDeleteModal: { type: Function },
    showReplyForm: { type: Function },
    _editMode: { type: Boolean, state: true },
  };

  constructor() {
    super();

    this.comment = {};
    this.currentUser = {};
    this.showDeleteModal = () => {};
    this.showReplyForm = () => {};
    this._editMode = false;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="${styles["comment-content"]}">
        ${this._renderHeader()}
        ${!this._editMode
          ? html`<p>
              ${this.comment.replyingTo
                ? html`<span class="${styles.at}"
                    >@${this.comment.replyingTo}</span
                  > `
                : html``}${this.comment.content}
            </p>`
          : html`
              <form
                id="updateForm"
                class="${styles["update-form"]}"
                @submit="${this.updateComment}"
              >
                <textarea
                  name="update"
                  id="update"
                  aria-label="Update Comment"
                  .value=${this.comment.content}
                ></textarea>
                <button type="submit" class="button-accent">update</button>
              </form>
            `}
        ${this._renderVote()} ${this._renderCommentActions()}
      </div>
    `;
  }

  _renderHeader() {
    return html`
      <header>
        <img
          src="${this.comment.user.image.webp}"
          alt="${this.comment.user.username} profile photo"
        />
        <h2>${this.comment.user.username}</h2>
        ${this.currentUser.username == this.comment.user.username
          ? html`<span class="${styles.you}">you</span>`
          : html``}
        <time datetime="${parseRelativeTime(this.comment.createdAt)}"
          >${this.comment.createdAt}</time
        >
      </header>
    `;
  }

  _renderCommentActions() {
    return html`
      <div class="${styles["comment-actions"]}">
        ${this.currentUser.username == this.comment.user.username
          ? html`<button
              class="${styles["delete-reply"]}"
              aria-label="Delete Reply"
              @click=${this.showDeleteModal}
            >
              <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                  fill="none"
                />
              </svg>
              delete
            </button>`
          : html``}
        ${this.currentUser.username == this.comment.user.username
          ? html`
              <button
                class="${styles.edit}"
                aria-label="Edit"
                @click="${() => {
                  this._editMode = true;
                  onClickOutside(this, () => {
                    this._editMode = false;
                  });
                }}"
              >
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    fill="none"
                  />
                </svg>
                edit
              </button>
            `
          : html`
              <button
                class="${styles.reply}"
                aria-label="Reply"
                @click="${this.showReplyForm}"
              >
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                    fill="none"
                  />
                </svg>
                reply
              </button>
            `}
      </div>
    `;
  }

  _renderVote() {
    return html`
      <div class="${styles.vote}">
        <button
          class="${styles.upvote}"
          aria-controls="voteCount"
          aria-label="upvote"
          @click="${this.upvote}"
        >
          <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill="none"
            />
          </svg>
        </button>
        <span id="voteCount" class="${styles["vote-count"]}" aria-live="polite"
          >${this.comment.score}</span
        >
        <button
          class="${styles.downvote}"
          aria-controls="voteCount"
          aria-label="downvote"
          @click=${this.downvote}
        >
          <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill="none"
            />
          </svg>
        </button>
      </div>
    `;
  }

  upvote() {
    this.comment = {
      ...this.comment,
      score: ++this.comment.score,
    };
  }

  downvote() {
    this.comment = {
      ...this.comment,
      score: --this.comment.score,
    };
  }

  updateComment(event) {
    event.preventDefault();

    const $form = document.getElementById("updateForm");
    const formData = new FormData($form);

    this.comment = {
      ...this.comment,
      content: formData.get("update"),
    };

    this._editMode = false;
  }
}

customElements.define("comment-content", CommentContent);
