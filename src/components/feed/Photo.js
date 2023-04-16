import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "../Avatar"
import { FatText } from "../Shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";

  const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
      toggleLike(id: $id) {
        ok
        error
      }
    }
  `;

  const PhotoContainer = styled.div`
  background-color: #FFFFFF;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;

  const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    max-width: 615px;
  `;

  const Username = styled(FatText)`
    margin-left: 15px;
  `; 

  const PhotoFile = styled.img`
    min-width: 100%;
  `;

  const PhotoData = styled.div`
    padding: 15px;
  `;

  const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
    }
    svg {
      font-size: 20px;
    }
  `;

  const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
  `;

  const Likes = styled(FatText)`
    margin-top: 10px;
    display: block;
  `;

const Photo = ({
  id,
  user,
  userName,
  file,
  isLiked,
  likes
}) => {
  const [toggleLikeMutation, {loading}] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    }
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user.avatar} />
        <Username>{user?.userName}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => {toggleLikeMutation();}}>
              <FontAwesomeIcon 
                style={{color: isLiked ? "tomato" : "inherit"}} 
                icon={isLiked ? SolidHeart : faHeart} 
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>
          {likes === 1 ? "1 like" : `${likes} likes`}
        </Likes>
      </PhotoData>
    </PhotoContainer> 
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired
};

export default Photo;