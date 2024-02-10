import React from "react";
import Banner from "../../components/banner/Banner";
import { Result } from "antd";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div>
      <Banner title="Not Found" />
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/" className="btn">
            Back Home
          </Link>
        }
      />
    </div>
  );
}

export default Notfound;
