import React from "react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="thank-page">
      <h1 className="thank-title">Get ready to Jam!</h1>
      <p className="thank-description">Thank you for ordering from KamJam!</p>
      <p className="thank-email">
        You will receive an email shortly with a summary of your order and
        shipping information when it becomes available
      </p>
      <p className="jam-button">
      <Link className="keep-jamming" to="/">Keep Jamming</Link>
      </p>
    </div>
  );
}
