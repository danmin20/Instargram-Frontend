import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Button from "../../Components/Button";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../Components/Loader";
import { GET_USER } from "../Profile/ProfileContainer";
import { withRouter } from "react-router-dom";
import DefaultInput from "../../Components/DefaultInput";
import Avatar from "../../Components/Avatar";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const EAvatar = styled(Avatar)`
    margin: 5px auto;
`;

const Type = styled.div`
  font-weight: 100;
  font-size: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 3px;
`;

export default withRouter(
  ({
    location: { pathname },
    username,
    email,
    firstName,
    lastName,
    bio,
    avatar,
    onSubmit
  }) => {
    const user = pathname.split("/")[1];
    const { data, loading } = useQuery(GET_USER, {
      variables: { username: user }
    });
    return (
      <Wrapper>
        <Form>
          <>
            <Helmet>
              <title>Edit | Instargram</title>
            </Helmet>
            {loading && <Loader />}
            {!loading && data && data.seeUser && (
              <form onSubmit={onSubmit}>
                <EAvatar url={data.seeUser.avatar} size={"md"} />
                <Type>USERNAME</Type>
                <DefaultInput
                  placeholder={"Username"}
                  defaultValue={data.seeUser.username}
                  {...username}
                />
                <Type>FIRSTNAME</Type>
                <DefaultInput
                  placeholder={"First name"}
                  defaultValue={data.seeUser.firstName}
                  {...firstName}
                />
                <Type>LASTNAME</Type>
                <DefaultInput
                  placeholder={"Last name"}
                  defaultValue={data.seeUser.lastName}
                  {...lastName}
                />
                <Type>EMAIL</Type>
                <DefaultInput
                  placeholder={"Email"}
                  defaultValue={data.seeUser.email}
                  {...email}
                  type="email"
                />
                <Type>BIOGRAPHY</Type>
                <DefaultInput
                  placeholder={"bio"}
                  defaultValue={data.seeUser.bio}
                  {...bio}
                />
                <Type>AVATAR URL</Type>
                <DefaultInput
                  placeholder={"avatar"}
                  defaultValue={data.seeUser.avatar}
                  {...avatar}
                />
                <Button text={"Edit"} />
              </form>
            )}
          </>
        </Form>
      </Wrapper>
    );
  }
);
