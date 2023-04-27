import React from "react";
class LoginClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Hari",
    };
  }

  render = () => {
    return `Your name is ${this.state.name}`;
  };
}
export default LoginClassPage;
