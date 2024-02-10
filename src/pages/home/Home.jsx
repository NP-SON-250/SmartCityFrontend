import React from "react";
import { Header, Model, Works, Partners, WSC } from "../../container";
import Testimonials from "../../container/testimonials/Testimonials";
function Home() {
  return (
    <>
      <Header />
      <WSC />
      <Model />
      <Works />
      <Testimonials/>
      <Partners />
    </>
  );
}

export default Home;
