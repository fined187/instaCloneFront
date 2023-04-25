import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";

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

  const CREATE_COMMENT_MUTATION = gql`
    mutation createCommet($photoId: Int!, $payload: String!) {
      createComment(photoId: $photoId, payload: $payload) {
        ok
        error
        id
      }
    }
  `;

  const PostCommentContainer = styled.div`
    margin-top: 10px;
    padding-top: 15px;
    padding-bottom: 10px;
    border-top: 1px solid ${(props) => props.theme.borderColor};
  `;

  const PostCommentInput = styled.input`
    width: 100%;
    &::placeholder {
      font-size: 12px;
  }
  `;

function Comments({photoId, author, caption, commentsNumber, comments}) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const createCommentUpdate = (cache, result) => {
    const {payload} = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id }, 
      },
    } = result;

    if(ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me
        },
      };
      const newCacheComment = cache.writeFragment({               //  cache에 comment 쓰기
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              userName
              avatar
            }
          }
        `
      });
      cache.modify({
        id: `Photo: ${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentsNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };

  const [createCommentMutation, {loading}] = useMutation(
    CREATE_COMMENT_MUTATION, 
    {
    update: createCommentUpdate
    }
  );

  const onValid = (data) => {
    const { payload } = data;
    if(loading) {
      return;
    }

    createCommentMutation({
      variables: {
        photoId,
        payload,
      }
    });
  };

  return (
    <>
      <CommentsContainer>
        <Comment author={author} payload={caption} />
        <CommentCount>
          {commentsNumber === 1 ? "1 comment" : `${commentsNumber} comments`}
        </CommentCount>
        {comments?.map(comment => (
          <Comment 
            key={comment.id}
            id={comment.id}
            photoId={comment.photoId}
            author={comment.user.userName} 
            payload={comment.payload} 
            isMine={comment.isMine}
          />
        ))}
        <PostCommentContainer>
          <form onSubmit={handleSubmit(onValid)}>
            <PostCommentInput 
              name="payload" 
              ref={register({ required: true })} 
              type="text" 
              placeholder="Write a comment..." />
          </form>
        </PostCommentContainer>
      </CommentsContainer>
    </>
  );
};

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
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
};

export default Comments;