import React from 'react';
import { Mic, Paperclip, Menu, Send } from 'lucide-react';

const GatsbyChat = ({ onOpenSidebar }) => {
  
  // 🔴 IMPORTANT: Ensure your image link is correct here
  const bgImage = "url('https://img.freepik.com/free-vector/gradient-art-deco-background_23-2149157989.jpg')"; 

  return (
    <div 
      className="flex-1 h-screen flex flex-col relative overflow-hidden bg-black font-['Luxurious_Script'] text-[#BB933F]"
      style={{ 
        backgroundImage: bgImage,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%' 
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap');`}
      </style>

      {/* MOBILE MENU BUTTON - Top Left */}
      <div className="md:hidden absolute top-5 left-5 z-50">
          <button 
            onClick={onOpenSidebar}
            className="p-2 bg-[#BE9C4C] rounded-lg text-black border-2 border-[#BB933F] shadow-lg active:scale-95 transition-transform"
          >
              <Menu size={28} />
          </button>
      </div>

      {/* MAIN CONTENT AREA */}
      {/* 
         UPDATED PADDING: 
         - 'pt-24' on mobile pushes text down so the button doesn't cover it.
         - 'md:p-24' keeps the desktop layout centered/balanced.
      */}
      <main className="flex-1 flex flex-col relative overflow-y-auto px-8 pb-8 pt-24 md:p-24 scrollbar-none">
        
        {/* Gatsby Status Box */}
        <div className="w-40 md:w-48 mb-6 md:mb-8 z-10 shrink-0 self-start">
          <div className="p-2 md:p-3 border-2 border-[#BB933F] text-center bg-[#BE9C4C] shadow-lg">
            <p className="text-xs md:text-sm tracking-widest text-black/80 font-sans">session active</p>
            <h2 className="text-2xl md:text-3xl text-black leading-none mt-1">Gatsby AI</h2>
          </div>
        </div>

        {/* Gatsby Welcome Message */}
        <div className="max-w-3xl mb-8 md:mb-12 z-10">
          <p className="text-3xl md:text-5xl leading-tight text-[#BB933F] drop-shadow-md">
            Welcome, Old Sport. I'm absolutely delighted to see you.
          </p>
          <p className="text-3xl md:text-5xl leading-tight mt-4 text-[#BB933F] drop-shadow-md">
            Ask me anything. My resources are infinite, and I am entirely at your disposal.
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* User Message */}
        <div className="self-end flex flex-col items-end w-full max-w-lg mb-4 z-10">
           <div className="px-6 py-1 rounded-full mb-2 md:mb-3 text-center w-24 md:w-32 bg-[#BE9C4C] shadow-md">
             <span className="text-lg md:text-xl text-black">You</span>
           </div>
           <p className="text-3xl md:text-4xl pr-2 text-[#BB933F] drop-shadow-md text-right">
             How is the weather?
           </p>
        </div>

        {/* FOOTER INPUT AREA */}
        <div className="w-full relative z-20 shrink-0 mt-2 md:mt-4">
          <div className="w-full rounded-xl md:rounded-2xl h-28 md:h-32 relative flex flex-col justify-between p-3 md:p-5 bg-[#BE9C4C]/95 backdrop-blur-sm shadow-[inset_0_0_20px_#A88843]">
            
            <textarea 
              placeholder="Ask Gatsby anything..."
              className="w-full h-full bg-transparent border-none outline-none text-2xl md:text-3xl placeholder-black/50 text-black resize-none pt-1 pr-16 font-['Luxurious_Script']"
            />

            {/* Left Icons (Mic/Attach) */}
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center gap-3 md:gap-4">
               <button className="text-black/80 hover:text-black transition-all active:scale-95">
                 <Mic size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
               </button>
               <button className="text-black/80 hover:text-black transition-all active:scale-95">
                 <Paperclip size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
               </button>
            </div>

            {/* Right Icon (Send) */}
            <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
               <button className="bg-black hover:bg-black/80 text-[#BB933F] p-2 md:p-3 rounded-xl shadow-lg transition-all active:scale-95 hover:shadow-xl border border-[#BB933F]">
                 <Send size={20} className="md:w-6 md:h-6 ml-1" strokeWidth={2} />
               </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default GatsbyChat;