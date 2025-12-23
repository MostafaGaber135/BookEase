import React from "react";
import Hero from "./components/Hero";
import FeaturesBookEase from "./components/FeaturesBookEase";
import PopularServices from "./components/PopularServices";
import OurCustomersSay from "./components/OurCustomersSay";
import ReadyToGetStarted from "./components/ReadyToGetStarted";
export default function Home() {
  return (
    <div className="w-full bg-white">
      <Hero />
      <FeaturesBookEase />
      <PopularServices />
      <OurCustomersSay />
      <ReadyToGetStarted />
    </div>
  );
}
