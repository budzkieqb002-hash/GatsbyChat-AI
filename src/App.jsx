import React, { useState } from 'react';
// ✅ FIX: Both imports now point to the "components" folder
import GatsbySidebar from './components/GatsbySidebar';
import GatsbyChat from './components/GatsbyChat';
import GatsbyHome from './components/GatsbyHome';

const App = () => {
  // State to track if user has logged in
  // 'home' = Landing Page, 'chat' = Main App
  const [currentPage, setCurrentPage] = useState('home');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Jay Gatsby');

  // If on Home Page, render GatsbyHome
  if (currentPage === 'home') {
    return <GatsbyHome onLogin={() => setCurrentPage('chat')} />;
  }

  // If Logged in, render the Chat App
  return (
    <div className="flex w-full h-screen bg-black overflow-hidden relative">

      <GatsbySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedTone={selectedTone}
        onToneChange={setSelectedTone}
      />

      <GatsbyChat
        onOpenSidebar={() => setIsSidebarOpen(true)}
        selectedTone={selectedTone}
      />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;

