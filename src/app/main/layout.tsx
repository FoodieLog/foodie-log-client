import LeftSidebar from "../../components/LeftSidebar";
import Bottombar from "../../components/Bottombar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full">
        <LeftSidebar />
        <div className="w-full h-full flex justify-center">{children}</div>
      </div>
      <Bottombar />
    </>
  );
}
