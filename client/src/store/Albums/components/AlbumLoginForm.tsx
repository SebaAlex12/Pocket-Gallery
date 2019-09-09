import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";

import { loginAlbum, fetchAlbums } from "../actions";

interface Istate {
  access: string;
}

interface Iprops {
  loginAlbum(data: any): void;
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
    const { loginAlbum, fetchAlbums } = this.props;
    const { access } = this.state;
    event.preventDefault();

    loginAlbum(access);
    fetchAlbums();
    console.log("after fetch");
  };
  render() {
    return (
      <div className="float-right mt-2">
        <form className="form-inline" action="">
          <div className="form-group">
            <input
              type="password"
              onChange={this.onChangeInput}
              className="form-control"
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
  { loginAlbum, fetchAlbums }
)(AlbumLoginForm);
