import React from "react";

import MessageAdder from "./MessageAdder";
import MessageList from "./MessageList";

// import actions
import { addMessage } from "../../../actions/addMessage";

import "./styles.css";

class Timeline extends React.Component {

  // we will get the messages for this city from the database
  // using the name of the city

  state = {
      name: "user",
      content: "",
      time: "12:34 pm·Today",
      messages: [
          ["user", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget maximus massa. Vestibulum hendrerit nec urna eu elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc vehicula turpis vitae eros convallis, suscipit lobortis neque vestibulum. Morbi ac augue at nisl porttitor varius. Suspendisse elementum tincidunt ullamcorper. Fusce mi arcu, vehicula in facilisis sit amet, eleifend ut sem. Aenean volutpat feugiat nulla vel egestas."]
      ]
  };

  handleInput = event => {
      const newContent = event.target.value;
      this.setState({
          content: newContent
      });
  };

  cleanContent = () => {
      this.setState({
          content: ""
      });
  }

  render(){
    const { city } = this.props;

    return(
      <div id="timeline">
        <MessageAdder
            city={ city }
            name={this.state.name}
            content={this.state.content}
            handleInputFunc={this.handleInput}
            addMessageFunc={() => addMessage(this)}
            cleanFunc={this.cleanContent}
        />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default Timeline;
