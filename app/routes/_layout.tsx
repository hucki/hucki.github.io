import { Outlet } from "react-router";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Layout() {
  return (
    <>
      <div className=" inset-0 flex justify-center sm:px-8">
        <div className="relative flex w-full flex-col max-w-7xl lg:px-8">
          <Header />
          <main className="flex-auto">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
