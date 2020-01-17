import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import EditPresenter from "./EditPresenter";

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

export default () => {
  const username = useInput("");
  const email = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const bio = useInput("");
  const avatar = useInput("");
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
    <EditPresenter
      username={username}
      email={email}
      firstName={firstName}
      lastName={lastName}
      bio={bio}
      avatar={avatar}
      onSubmit={onSubmit}
    />
  );
};
