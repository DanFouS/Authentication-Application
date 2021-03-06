import { createGlobalStyle } from "styled-components";
export const lightTheme = {
  body: "#fff",
  fontColor: "#000",
  border: "#fff",
};
export const darkTheme = {
  body: "#000",
  fontColor: "#fff",
  border: "#fff",
};

export const GlobalStyles = createGlobalStyle`
body{
  background-color: ${(props) => props.theme.body}
}

.card-body {
  background-color: ${(props) => props.theme.body}
}
.card{
background-color: ${(props) => props.theme.body}
}
`;
