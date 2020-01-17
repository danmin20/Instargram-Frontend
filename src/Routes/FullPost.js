import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import { withRouter } from "react-router-dom";

const SEE_FULLPOST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default withRouter(({ location: { pathname } }) => {
  const id = pathname.split("/")[2];
  const { data, loading } = useQuery(SEE_FULLPOST, { variables: { id } });
  return (
    <Wrapper>
      <Helmet>
        <title>Post | Instargram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && data && data.seeFullPost && (
        <Post
          key={data.seeFullPost.id}
          id={data.seeFullPost.id}
          caption={data.seeFullPost.caption}
          location={data.seeFullPost.location}
          user={data.seeFullPost.user}
          files={data.seeFullPost.files}
          likeCount={data.seeFullPost.likeCount}
          isLiked={data.seeFullPost.isLiked}
          comments={data.seeFullPost.comments}
          createdAt={data.seeFullPost.createdAt}
        />
      )}
    </Wrapper>
  );
});
