import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function TasksLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#090A15] text-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#0C0D21]/40 p-6 md:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
