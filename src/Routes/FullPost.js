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

export default withRouter(
  ({
    match: {
      params: { id }
    }
  }) => {
    const { data, loading } = useQuery(SEE_FULLPOST, { variables: { id } });
    console.log(data);
    return (
      <Wrapper>
        <Helmet>
          <title>Post | Instargram</title>
        </Helmet>
        {loading && <Loader />}
        {(!loading && data && data.seeFullPost) (
          <Post
            key={data.id}
            id={data.id}
            caption={data.caption}
            location={data.location}
            user={data.user}
            files={data.files}
            likeCount={data.likeCount}
            isLiked={data.isLiked}
            comments={data.comments}
            createdAt={data.createdAt}
          />
        )}
      </Wrapper>
    );
  }
);
