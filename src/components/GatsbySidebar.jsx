import React from 'react';
import { Settings, ShieldCheck, X } from 'lucide-react';

const GatsbySidebar = ({ isOpen, onClose }) => {
  return (
    <aside 
      className={`
        fixed md:relative inset-y-0 left-0 z-40
        w-64 h-screen flex flex-col p-4 
        shadow-2xl bg-[#E8BF5E] font-['Luxurious_Script'] 
        border-r-4 border-[#A88843]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap');`}
      </style>

      {/* Mobile Close Button */}
      <div className="md:hidden absolute top-2 right-2">
        <button onClick={onClose} className="p-2 text-black hover:bg-[#BE9C4C] rounded-full active:scale-95">
            <X size={24} />
        </button>
      </div>

      {/* Top Section */}
      <div className="mb-6 mt-8 md:mt-2">
        <h3 className="text-center text-sm mb-1 opacity-80 tracking-widest uppercase text-black text-[1.1rem]">
          Domain Expertise
        </h3>
        <button className="w-full rounded-2xl py-3 px-4 mb-3 text-xl transition-all active:scale-95 bg-[#BE9C4C] border-2 border-[#A88843] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_2px_#A88843]">
          Generalist
        </button>
      </div>

      {/* Middle Section */}
      <div className="mb-6">
        <h3 className="text-center text-sm mb-1 opacity-80 tracking-widest uppercase text-black text-[1.1rem]">
          Communication Tone
        </h3>
        <div className="space-y-1">
          {['Jay Gatsby', 'Daisy Buchanan', 'Nick Carraway'].map((name) => (
            <button 
              key={name}
              className="w-full rounded-2xl py-3 px-4 mb-3 text-xl transition-all active:scale-95 bg-[#BE9C4C] border-2 border-[#A88843] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_2px_#A88843]"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mb-6">
        <h3 className="text-center text-sm mb-1 opacity-80 tracking-widest uppercase text-black text-[1.1rem]">
          Session Control
        </h3>
        <button className="w-full rounded-2xl py-3 px-4 mb-3 text-xl transition-all active:scale-95 bg-[#BE9C4C] border-2 border-[#A88843] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_2px_#A88843]">
          Clear Session
        </button>
      </div>

      <div className="flex-1"></div>

      {/* Footer Icons */}
      <div className="flex justify-between items-end px-2 pb-2">
        <button className="text-black hover:opacity-70 transition-opacity">
          <Settings size={36} strokeWidth={2} />
        </button>
        <button className="text-black hover:opacity-70 transition-opacity">
          <ShieldCheck size={36} strokeWidth={1.5} />
        </button>
      </div>
    </aside>
  );
};

export default GatsbySidebar;