import styled from "styled-components";
import { FatText } from "../Shared";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React from "react";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    & :hover{
      text-decoration: underline;
    }
  }
`;

function Comment({ isMine, id, author, payload, photoId }) {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: {ok, error}
      },
    } = result;
    if(ok) {
      cache.evict({id: `Comment: ${id}`});
      cache.modify({
        id: `Photo: ${photoId}`,
        fields: {
          commentsNumber(prev) {
            return prev - 1;
          }
        }
      })
    }
  }
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
  <CommentContainer>
    <Link to={`/users/${author}`}>
      <FatText>{author}</FatText>
    </Link>
    <CommentCaption>
      {
        payload
          .split(" ")
          .map((word, index) => 
            /^#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
              <React.Fragment key={index}>
                <Link key={index} to={`/hashtags/${word}`}>{word}</Link>{" "}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>
                {word}{" "}
              </React.Fragment>
            )
          )
      }
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>x</button> : null}
  </CommentContainer>
  );
};

Comment.propTypes = {
  photoId: PropTypes.number,
  isMine: PropTypes.bool,
  id: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired
};

export default Comment;