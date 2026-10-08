import Sidebar from './components/Sidebar';
import RoleBanner from './components/RoleBanner';

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <RoleBanner />
        {children}
      </main>
    </div>
  );
}