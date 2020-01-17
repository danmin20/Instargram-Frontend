import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.input`
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

const DefaultInput = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
  className,
  defaultValue
}) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    defaultValue={defaultValue}
    onChange={onChange}
    type={type}
  />
);

DefaultInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
  
};

export default DefaultInput;
