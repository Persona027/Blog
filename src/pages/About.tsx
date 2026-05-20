import { Link } from 'react-router-dom';
import { Gamepad2, BookOpen, Film, MonitorPlay, Music, MoreHorizontal } from 'lucide-react';
import avatar from '../assets/avatar.png';

const About = () => {
    const hobbies = [
        { id: 'games', icon: <Gamepad2 size={32} />, label: '游戏', desc: '虚拟探险家' },
        { id: 'books', icon: <BookOpen size={32} />, label: '书籍', desc: '思维的养料' },
        { id: 'movies', icon: <Film size={32} />, label: '影视', desc: '光影的艺术' },
        { id: 'anime', icon: <MonitorPlay size={32} />, label: '动画', desc: '二次元' },
        { id: 'music', icon: <Music size={32} />, label: '音乐', desc: '灵魂共振' },
        { id: 'others', icon: <MoreHorizontal size={32} />, label: '其他', desc: '未定义的精彩' },
    ];

    return (
        <div className="max-w-3xl mx-auto pt-10 px-6 pb-20">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-10 border border-white/10 text-center mb-10 animate-scale-in">
                <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full mb-6 overflow-hidden ring-4 ring-cyan-400/20 ring-offset-4 ring-offset-black/50">
                     <img src={avatar} alt="Persona" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2 font-heading">Persona</h1>
                <p className="text-cyan-400 mb-2 tracking-widest text-sm uppercase">Gamer / Coder</p>
                <div className="mx-auto w-12 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mb-6"></div>

                <div className="text-gray-300 leading-relaxed text-center">
                    <p>热爱生活，精益求精。</p>
                </div>
            </div>

            {/* 爱好板块 - 3x2 Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hobbies.map((hobby, index) => (
                    <Link
                        key={hobby.id}
                        to={`/collections/${hobby.id}`}
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-cyan-500/5 animate-fade-in-up"
                        style={{ animationDelay: `${index * 80}ms` }}
                    >
                        <div className="text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors group-hover:scale-110 duration-300">
                            {hobby.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-200 mb-1">{hobby.label}</h3>
                        <p className="text-xs text-gray-500">{hobby.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default About;
