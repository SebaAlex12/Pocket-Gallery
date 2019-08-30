import React from "react";

interface Iprops {
  key: string | number;
  imageUrl: string;
}

function ListItem({ imageUrl, key }: Iprops) {
  return (
    <div className="photo-card col-lg-3">
      <figure className="figure">
        <img src={imageUrl} className="figure-img img-fluid rounded" alt="" />
        <figcaption className="figure-caption text-right" />
      </figure>
    </div>
  );
}

export default ListItem;
