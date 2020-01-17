import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { GET_USER } from "../Profile/ProfileContainer";
import { toast } from "react-toastify";
import EditPresenter from "./EditPresenter";
import { withRouter } from "react-router-dom";

const editUser = gql`
  mutation editUser(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $bio: String
    $avatar: String
  ) {
    EditUser(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      avatar: $avatar
    )
  }
`;

export default withRouter(({ location: { pathname } }) => {
  const name = pathname.split("/")[1];
  const { data, loading } = useQuery(GET_USER, { variables: { name } });
  const username = useInput(`${data.username}`);
  const email = useInput(`${data.email}`);
  const firstName = useInput(`${data.firstName}`);
  const lastName = useInput(`${data.lastName}`);
  const bio = useInput(`${data.bio}`);
  const avatar = useInput(`${data.avatar}`);
  const [editUserMutation] = useMutation(editUser, {
    variables: {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      bio: bio.value,
      avatar: avatar.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (
      username.value !== "" &&
      email.value !== "" &&
      firstName.value !== "" &&
      lastName.value !== "" &&
      bio.value !== "" &&
      avatar.value !== ""
    ) {
      try {
        const {
          data: { editUser }
        } = await editUserMutation();
        if (!editUser) {
          toast.error("Can't edit account");
        } else {
          toast.success("Account edited!");
        }
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("All fields are required");
    }
  };

  return (
    <>
      {!loading && data && data.seeUser && (
        <EditPresenter
          username={username}
          email={email}
          firstName={firstName}
          lastName={lastName}
          bio={bio}
          avatar={avatar}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
});
