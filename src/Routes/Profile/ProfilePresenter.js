import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Username = styled.span`
  font-size: 30px;
  font-weight: 100;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin-bottom: 20px;
`;

const Count = styled.li`
  font-size: 18px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const CountNum = styled(FatText)`
  margin-right: 5px;
  font-size: 16px;
`;

const FullName = styled(FatText)`
  font-size: 18px;
`;

const Bio = styled.p`
  font-size: 16px;
  margin: 10px 0px;
`;

const ButtonStyle = styled.div`
  margin-left: 20px;
  width: 40%;
  height: 30%;
`;

const Posts = styled.div`
  justify-content: center;
  margin: auto;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

export default ({ data, loading, logOut }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Instargram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              <ButtonStyle>
                {isSelf ? (
                  <Button onClick={logOut} text="Log Out" />
                ) : (
                  <FollowButton id={id} isFollowing={isFollowing} />
                )}
              </ButtonStyle>
            </UsernameRow>
            <Counts>
              <Count>
                <CountNum text={String(postsCount)} />
                posts
              </Count>
              <Count>
                <CountNum text={String(followersCount)} />
                followers
              </Count>
              <Count>
                <CountNum text={String(followingCount)} />
                following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
          <HeaderColumn></HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map(post => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};
