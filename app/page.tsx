"use client";

import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="w-full items-center flex flex-col">
      <Header />
      <main className="h-screen"></main>
      <Footer />
    </div>
  );
}
