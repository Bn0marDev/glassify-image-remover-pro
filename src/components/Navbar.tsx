
import React from 'react';
import { WandSparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-4 sm:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
            <WandSparkles className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold">Glass<span className="text-primary">ify</span></h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <a href="#features" className="text-sm text-white/70 hover:text-white transition-colors">المميزات</a>
          <a href="#how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">كيف يعمل</a>
          <a href="#about" className="text-sm text-white/70 hover:text-white transition-colors">عنا</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
