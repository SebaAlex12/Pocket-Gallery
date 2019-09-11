import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";

import { loginAlbums, fetchAlbums } from "../actions";

interface Istate {
  access: string;
}

interface Iprops {
  loginAlbums(data: any): void;
  fetchAlbums(): void;
}

class AlbumLoginForm extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      access: ""
    };
  }
  onChangeInput = (event: FormEvent<HTMLInputElement>): void => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  onSubmitHandler = async (event: FormEvent<HTMLInputElement>) => {
    const { loginAlbums, fetchAlbums } = this.props;
    const { access } = this.state;
    event.preventDefault();

    loginAlbums(access);
    fetchAlbums();

    const input = document.querySelector(
      "#albumLoginForm input[type=password]"
    ) as HTMLInputElement;
    input.value = "";
  };
  render() {
    return (
      <div className="float-right mb-2">
        <form id="albumLoginForm" className="form-inline" action="">
          <div className="form-group">
            <input
              type="password"
              onChange={this.onChangeInput}
              className="form-control"
              placeholder="check access token"
              name="access"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn btn-primary ml-1"
              value="access"
              onClick={this.onSubmitHandler}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  { loginAlbums, fetchAlbums }
)(AlbumLoginForm);
