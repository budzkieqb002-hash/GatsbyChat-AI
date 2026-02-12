import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// ✅ FIX: Component defined OUTSIDE the main component to prevent re-rendering issues
const ArtDecoInput = ({ type, name, placeholder, value, onChange }) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-black/60 border-b-2 border-[#BB933F] text-[#E8BF5E] placeholder-[#BB933F]/70 text-2xl py-2 px-4 outline-none focus:bg-black/80 focus:border-[#E8BF5E] transition-all font-['MonteCarlo'] mb-4 rounded-t-lg"
    />
);

const GatsbyHome = ({ onLogin }) => {
    // REPLACE with your actual image path or URL
    const bgImage = "url('https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlNV9nYXRzYnlfcGF0dGVybl9nb2xkX2dlb21ldHJpY19iYWNrZ3JvdW5kX3NpbXBsZV9jMzc2MmVmNC1lNDQ5LTRhNTAtODExZC1kZjY4NTM4NGYwYTVfMS5qcGc.jpg')";

    // State to manage which view is active: 'main', 'login', or 'signup'
    const [view, setView] = useState('main'); // 'main' | 'login' | 'signup'

    // Form State
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call/processing time
        setTimeout(() => {
            setLoading(false);
            onLogin(); // Trigger the page switch in App.jsx
        }, 1000);
    };

    return (
        <div className="flex h-screen w-full bg-black overflow-hidden font-['MonteCarlo']">

            {/* Font Injection */}
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=MonteCarlo&display=swap');`}
            </style>

            {/* --- SIDEBAR (Static for aesthetics) --- */}
            <aside className="hidden md:flex flex-col w-64 h-full bg-[#3E2723] border-r-4 border-[#BB933F] p-8 z-20 shadow-2xl shrink-0">
                <nav className="flex flex-col space-y-8 mt-12">
                    {['Home', 'Program', 'About'].map((item, index) => (
                        <button
                            key={item}
                            onClick={() => setView('main')}
                            className={`
                text-left text-4xl text-[#BB933F] hover:text-[#E8BF5E] transition-colors
                ${index === 0 ? 'underline decoration-dotted decoration-[#BB933F]/50 underline-offset-8' : ''} 
              `}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main
                className="flex-1 relative flex flex-col items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: bgImage,
                    backgroundSize: '100% 100%'
                }}
            >
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center text-center p-8 w-full max-w-md">

                    {/* --- VIEW 1: MAIN WELCOME SCREEN --- */}
                    {view === 'main' && (
                        <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
                            <h1 className="text-6xl md:text-8xl text-[#BB933F] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-4">
                                Hello Old Sport
                            </h1>
                            <p className="text-3xl md:text-4xl text-[#E8BF5E] opacity-90 tracking-wide mb-12">
                                So, where should we start?
                            </p>

                            <div className="flex flex-col gap-6 w-64">
                                <button
                                    onClick={() => setView('login')}
                                    className="w-full py-3 bg-[#E8BF5E] hover:bg-[#BB933F] text-black text-3xl rounded-lg shadow-[0_0_15px_rgba(187,147,63,0.5)] border-2 border-[#BB933F] transition-all transform hover:scale-105 active:scale-95"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setView('signup')}
                                    className="w-full py-3 bg-black/50 hover:bg-black/80 text-[#E8BF5E] text-3xl rounded-lg shadow-[inset_0_0_10px_rgba(187,147,63,0.3)] border-2 border-[#BB933F] transition-all transform hover:scale-105 active:scale-95"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- VIEW 2: LOGIN FORM --- */}
                    {view === 'login' && (
                        <form onSubmit={handleSubmit} className="w-full animate-in slide-in-from-bottom-8 duration-500 bg-[#3E2723]/90 p-8 rounded-2xl border-2 border-[#BB933F] shadow-2xl relative">
                            <button
                                type="button"
                                onClick={() => setView('main')}
                                className="absolute top-4 left-4 text-[#BB933F] hover:text-[#E8BF5E]"
                            >
                                <ArrowLeft size={28} />
                            </button>

                            <h2 className="text-5xl text-[#BB933F] mb-8 mt-2">Login</h2>

                            <ArtDecoInput
                                type="text"
                                name="username"
                                placeholder="Username or Email"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                            <ArtDecoInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 py-3 bg-[#E8BF5E] hover:bg-[#BB933F] text-black text-3xl rounded-lg shadow-[0_0_15px_rgba(187,147,63,0.5)] border-2 border-[#BB933F] transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Authenticating...' : 'Enter'}
                            </button>
                        </form>
                    )}

                    {/* --- VIEW 3: SIGN UP FORM --- */}
                    {view === 'signup' && (
                        <form onSubmit={handleSubmit} className="w-full animate-in slide-in-from-bottom-8 duration-500 bg-[#3E2723]/90 p-8 rounded-2xl border-2 border-[#BB933F] shadow-2xl relative">
                            <button
                                type="button"
                                onClick={() => setView('main')}
                                className="absolute top-4 left-4 text-[#BB933F] hover:text-[#E8BF5E]"
                            >
                                <ArrowLeft size={28} />
                            </button>

                            <h2 className="text-5xl text-[#BB933F] mb-8 mt-2">Join the Party</h2>

                            <ArtDecoInput
                                type="text"
                                name="username"
                                placeholder="Choose a Username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                            <ArtDecoInput
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <ArtDecoInput
                                type="password"
                                name="password"
                                placeholder="Create Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 py-3 bg-[#E8BF5E] hover:bg-[#BB933F] text-black text-3xl rounded-lg shadow-[0_0_15px_rgba(187,147,63,0.5)] border-2 border-[#BB933F] transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>
                    )}

                </div>
            </main>
        </div>
    );
};

export default GatsbyHome;