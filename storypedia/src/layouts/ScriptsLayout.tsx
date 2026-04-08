import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/wiki/Navbar';
import { ScriptSidebar } from '@/components/scripts/ScriptSidebar';

export default function ScriptsLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-14">
        <ScriptSidebar />
        <main className="flex flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}