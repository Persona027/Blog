// filepath: D:/myWebsite/personal-site/src/pages/About.tsx
import avatar from '../assets/avatar.png';

const About = () => {
    return (
        <div className="max-w-3xl mx-auto pt-10 px-6">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-10 border border-white/10 text-center">
                <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full mb-6 overflow-hidden border-4 border-cyan-400/30">
                     <img src={avatar} alt="Persona" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">Persona</h1>
                <p className="text-cyan-400 mb-8">Gamer/Coder</p>
                
                <div className="text-gray-300 leading-relaxed text-center">
                    <p>热爱生活，精益求精。</p>
                </div>
            </div>
        </div>
    );
};

export default About;
