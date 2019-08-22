import React from "react";

interface Iprops {
  key: String | Number;
  title: String;
  description: String;
  imageUrl: String;
  createdAt: String;
}

function ListItem({ title, description, imageUrl, createdAt, key }: Iprops) {
  return (
    <div className="photo-card col-lg-4">
      <div className="title">{title}</div>
      <div className="date">{createdAt}</div>
      <figure className="figure">
        <img src="dsfs" className="figure-img img-fluid rounded" alt="" />
        <figcaption className="figure-caption text-right">
          {description}
        </figcaption>
      </figure>
    </div>
  );
}

export default ListItem;
