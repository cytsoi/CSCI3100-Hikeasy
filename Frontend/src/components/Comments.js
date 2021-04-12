import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { Button, Comment, Form, Header } from "semantic-ui-react";

import "./Comments.css";
import http from "../http-common";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComments: [],
      rating: [],
    };
  }

  setRating = (value) => {
    this.setState({ rating: value });
  };

  handleChange = (e, { value }) => {
    this.setState({ newComments: value });
  };

  postComment = () => {
    let formData = new FormData();
    formData.append("userID", 3);
    formData.append("rating", this.state.rating);
    formData.append("comment", this.state.newComments);

    http
      .post(
        "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com:8080/review/publish_review/2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.props.reloadComments();
      });
  };

  render() {
    let reviews = this.props.reviews;

    return (
      <Comment.Group>
        <div className="comment-display-section">
          <Header as="h3" dividing>
            Comments
          </Header>
          {reviews.map((item) => (
            <div className="review-block">
              <Comment>
                <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                <Comment.Content>
                  <Comment.Author as="a">{item.id}</Comment.Author>
                  <Comment.Metadata>
                    <div>{item.createdAt}</div>
                  </Comment.Metadata>
                  <Comment.Text>{item.comment}</Comment.Text>
                  {/* <Comment.Actions>
                  <Comment.Action> Reply </Comment.Action>
                </Comment.Actions> */}
                </Comment.Content>
              </Comment>
              <div>
                <Typography component="legend">Rated</Typography>
                <Rating
                  name="read-only"
                  value={item.rating}
                  size="medium"
                  readOnly
                />
              </div>
            </div>
          ))}
        </div>
        <Form clasName="add-comment">
          <Form.Group>
            <Form.TextArea
              placeholder="Share your views!"
              name="name"
              // value={coommen}
              onChange={this.handleChange}
            />
            <div className="comment-buttons">
              <div>
                <Typography component="legend">Rate this trail!</Typography>
                <Rating
                  size="large"
                  name="simple-controlled"
                  onChange={(event, newValue) => {
                    this.setRating(newValue);
                  }}
                />
              </div>
              <Button content="Submit" onClick={this.postComment} />
            </div>
          </Form.Group>
        </Form>
      </Comment.Group>
    );
  }
}

export default Comments;
