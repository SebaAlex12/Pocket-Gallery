import React from "react";

interface Iprops {
  removePhotosHandler(): void;
  checkAllPhotosHandler(album: any): void;
  unCheckAllPhotosHandler(album: any): void;
}

export default function ListItemNav({
  removePhotosHandler,
  checkAllPhotosHandler,
  unCheckAllPhotosHandler
}: Iprops) {
  return (
    <nav>
      <button
        className="btn btn-danger btn-secondary mr-1 mb-2"
        onClick={removePhotosHandler}
      >
        Remove Checked
      </button>
      <button
        className="btn btn-success btn-secondary mr-1 mb-2"
        onClick={checkAllPhotosHandler}
      >
        Check All
      </button>
      <button
        className="btn btn-success btn-secondary mr-1 mb-2"
        onClick={unCheckAllPhotosHandler}
      >
        Uncheck All
      </button>
    </nav>
  );
}
