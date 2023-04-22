import PropTypes from "prop-types";
import { FatText } from "../Shared";
import styled from "styled-components";
import Comment from "./Comment";

const CommentsContainer = styled.div`
    margin-top: 20px;
  `;

  const CommentCount = styled.span`
    opacity: 0.7;
    margin: 10px 0px;
    font-size: 10px;
    font-weight: 600;
    display: block;
  `;

function Comments({author, caption, commentsNumber, comments}) {
  return (
    <>
      <CommentsContainer>
        <Comment author={author} payload={caption} />
        <CommentCount>
          {commentsNumber === 1 ? "1 comment" : `${commentsNumber} comments`}
        </CommentCount>
        {comments?.map(comment => (
          <Comment key={comment.id} author={comment.user.userName} payload={comment.payload} />
        ))}
      </CommentsContainer>
    </>
  );

  Comments.propTypes = {
    author: PropTypes.string.isRequired,
    caption: PropTypes.string,
    commentsNumber: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          avatar: PropTypes.string,
          userName: PropTypes.string.isRequired,
        }),
        payload: PropTypes.string.isRequired,
        isMine: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired
    }))
  }
};

export default Comments;