import React from "react";
import "../photos.scss";
// const Circle = require("../Photos.module.scss");

interface Iprops {
  imageUrl: string;
  checkIfChecked(): void;
  lightboxPhotosHandler(photoIndex: any): void;
}

function ListItem({ imageUrl, checkIfChecked, lightboxPhotosHandler }: Iprops) {
  const arr = imageUrl.split("/");
  const miniLink = [arr[1], arr[2], arr[3], "mini", arr[4]].join("/");
  return (
    <div className="photo-card col-lg-3 phtos-list-item">
      <input onChange={checkIfChecked} type="checkbox" />
      <figure className="figure">
        <div
          className="image"
          data-title="Image caption"
          onClick={lightboxPhotosHandler}
        >
          <img src={miniLink} className="figure-img img-fluid rounded" alt="" />
        </div>
        <figcaption className="figure-caption text-right" />
      </figure>
    </div>
  );
}

export default ListItem;
