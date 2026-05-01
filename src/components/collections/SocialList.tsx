import { ExternalLink, Check, Copy } from 'lucide-react';
import { socials } from '@/data/socials';

interface SocialListProps {
  handleCopy: (text: string, id: string) => void;
  copiedId: string | null;
}

export const SocialList = ({ handleCopy, copiedId }: SocialListProps) => (
  <div className="space-y-12">
    <section>
      <h3 className="text-xl font-bold text-gray-400 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-cyan-400 rounded-full"></span>链接
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socials.filter((s) => s.group === 1).map((item) => (
          <a key={item.id} href={item.value} target="_blank" rel="noreferrer" className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4">
            <div className={`w-10 h-10 ${item.color} group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: 'currentColor', WebkitMaskImage: `url(/other/${item.icon})`, maskImage: `url(/other/${item.icon})`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center', WebkitMaskSize: 'contain', maskSize: 'contain' }} />
            <div><h4 className="text-white font-bold group-hover:text-cyan-300 transition-colors">{item.platform}</h4><p className="text-gray-500 text-sm">{item.name}</p></div>
            <ExternalLink size={14} className="ml-auto text-gray-600 group-hover:text-cyan-400" />
          </a>
        ))}
      </div>
    </section>
    <section>
      <h3 className="text-xl font-bold text-gray-400 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-purple-400 rounded-full"></span>ID
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socials.filter((s) => s.group === 2).map((item) => (
          <button key={item.id} onClick={() => handleCopy(item.value, item.id)} className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4 text-left w-full">
            <div className={`w-10 h-10 ${item.color} group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: 'currentColor', WebkitMaskImage: `url(/other/${item.icon})`, maskImage: `url(/other/${item.icon})`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center', WebkitMaskSize: 'contain', maskSize: 'contain' }} />
            <div className="flex-1"><h4 className="text-white font-bold group-hover:text-purple-300 transition-colors">{item.platform}</h4><p className="text-gray-500 text-sm">ID: {item.name}</p></div>
            <div className="text-gray-600 group-hover:text-purple-400 transition-colors">{copiedId === item.id ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}</div>
          </button>
        ))}
      </div>
    </section>
  </div>
);
