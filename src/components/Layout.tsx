import { Outlet } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MantaImage from '../pages/images.png';

export function Layout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-white shadow-lg px-6 py-4 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full flex items-center justify-center">
              <img src={MantaImage} alt="Manta Logo" className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Manta HackerHouse ID</h1>
          </div>
          <div className="flex space-x-4">
            <ConnectButton />
          </div>
        </div>
      </header>
      <main className="flex-1 mt-20 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}