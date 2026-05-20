import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add TrendingUp to imports
content = content.replace(
  'import { Sparkles, ArrowRight, CornerDownRight, Star, X, CheckCircle2 } from "lucide-react";',
  'import { Sparkles, ArrowRight, CornerDownRight, Star, X, CheckCircle2, TrendingUp } from "lucide-react";'
);

// Replace the avatars with a nice icon
const oldStat = `<div className="flex -space-x-2 mr-2">
              <img className="w-7 h-7 rounded-full border-2 border-[#060809] dark:border-white" src="https://i.pravatar.cc/100?img=33" alt="User" />
              <img className="w-7 h-7 rounded-full border-2 border-[#060809] dark:border-white" src="https://i.pravatar.cc/100?img=47" alt="User" />
              <img className="w-7 h-7 rounded-full border-2 border-[#060809] dark:border-white" src="https://i.pravatar.cc/100?img=12" alt="User" />
            </div>`;

const newStat = `<div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#19ad7d]/10 text-[#19ad7d] mr-2">
              <TrendingUp size={16} strokeWidth={2.5} />
            </div>`;

content = content.replace(oldStat, newStat);

fs.writeFileSync(path, content);
