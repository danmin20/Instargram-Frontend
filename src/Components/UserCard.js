import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 10px;
`;

const EFatText = styled(FatText)`
  margin-bottom: 15px;
`;

const UserCard = ({ id, username, isFollowing, url, isSelf }) => (
  <Card>
    <Link to={`/${username}`}>
      <EAvatar url={url} size={"sm"} />
    </Link>
    <EFatText text={username} />
    {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default UserCard;
