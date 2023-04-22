import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        userName
        avatar
      }
      file
      caption
      likes
      comments {
        id
        user {
          userName
          avatar
        }
        payload
        isMine
        createAt
      }
      commentsNumber
      createAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  
  return (
    <div>
      <PageTitle title="Home" />
      {
        data?.seeFeed?.map((photo) => (
          <Photo key={photo.id} {...photo} />
        ))}
    </div>
  );
};

export default Home;