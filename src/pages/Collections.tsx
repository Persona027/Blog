// filepath: D:/myWebsite/personal-site/src/pages/Collections.tsx
const Collections = () => {
    const items = [
        { id: 1, title: 'React 官方文档', desc: '最好的 React 学习资料', link: 'https://react.dev' },
        { id: 2, title: 'Tailwind CSS', desc: '原子化 CSS 框架手册', link: 'https://tailwindcss.com' },
        { id: 3, title: 'Vercel', desc: '我的部署平台', link: 'https://vercel.com' },
        { id: 4, title: 'GitHub', desc: '代码托管仓库', link: 'https://github.com' },
    ];

    return (
        <div className="max-w-5xl mx-auto pt-10 px-6">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">我的数字花园</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <a 
                        key={item.id} 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                    >
                        <h3 className="text-xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200">
                            {item.title} ↗
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {item.desc}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Collections;
