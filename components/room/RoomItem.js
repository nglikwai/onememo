import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const RoomItem = ({ room }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-2">
        <Link href={`/room/${room._id}`}>
          <div style={{ cursor: "pointer" }}>
            <Image
              className="card-img-top mx-auto"
              style="cursor:point"
              src={room.images[0].url}
              height={240}
              width={300}
            />
          </div>
        </Link>
        <div>
          <Link href={`/room/${room._id}`}>
            <Title>
              <a>{room.name}</a>
            </Title>
          </Link>

          <div>
            <Price className="pt-2">
             ${room.pricePerNight} / night
            </Price>

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(room.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
          </div>


        </div>
      </div>
    </div>
  );
};

const Title = styled.span`
color:#000;
font-weight:500;
margin:0 0 10px 0;
cursor:pointer;
`;

const Price = styled.h6`
color:#333;
font-size:16px;
font-weight:500;

`

export default RoomItem;
