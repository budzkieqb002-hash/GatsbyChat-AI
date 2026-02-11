import React, { useState } from 'react';
// Notice the "./" means "same folder"
import GatsbySidebar from './components/GatsbySidebar.jsx';
import GatsbyChat from './components/GatsbyChat.jsx';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-black overflow-hidden relative">
      <GatsbySidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <GatsbyChat 
        onOpenSidebar={() => setIsSidebarOpen(true)} 
      />
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