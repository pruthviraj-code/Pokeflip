import React from "react";
import HeroSection from "../components/home/HeroSection";
import MainLayout from "../layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex min-h-screen w-full items-center justify-center">
        <HeroSection />
      </div>
    </MainLayout>
  );
}
