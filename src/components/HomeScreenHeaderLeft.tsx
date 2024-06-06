import { Text } from "react-native";
import { UserContext } from "../App";
import { useContext } from "react";
import { theme } from "../constants/theme";
import styled from "styled-components/native";

const GreetingText = styled.Text`
  color: ${theme.colors.onPrimary};
  font-size: 16px;
`;

const HomeScreenHeaderLeft = () => {
  const { user } = useContext(UserContext);
  return <GreetingText>Hello, {user?.displayName}!</GreetingText>;
};

export default HomeScreenHeaderLeft;
