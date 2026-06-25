import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/wiki/Navbar';

export default function WikiLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-14">
        <main className="flex flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}