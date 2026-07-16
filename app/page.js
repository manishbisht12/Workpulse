import Sidebar from "@/components/layout/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen bg-[#0D1023] text-white p-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </main>
    </div>
  );
}