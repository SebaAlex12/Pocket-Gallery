import axios from "axios";

const setAlbumAuthToken = (token: string) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["AlbumAuthorization"] = token;
  } else {
    // Delete Auth header
    delete axios.defaults.headers.common["AlbumAuthorization"];
  }
};

export default setAlbumAuthToken;
