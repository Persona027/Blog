// filepath: D:/myWebsite/personal-site/src/pages/About.tsx
const About = () => {
    return (
        <div className="max-w-3xl mx-auto pt-10 px-6">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-10 border border-white/10 text-center">
                <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full mb-6 overflow-hidden border-4 border-cyan-400/30">
                     {/* 这里以后可以放头像 */}
                     <div className="w-full h-full flex items-center justify-center text-4xl">🧑‍💻</div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">[您的名字]</h1>
                <p className="text-cyan-400 mb-8">前端开发者 / 技术爱好者</p>
                
                <div className="text-gray-300 leading-relaxed text-left space-y-4">
                    <p>
                        你好！欢迎来到我的个人空间。
                    </p>
                    <p>
                        这是一个使用 React、Tailwind CSS 构建的现代化个人网站。
                        无论是代码架构还是视觉设计，我都致力于追求简洁与高效。
                    </p>
                    <p>
                        在该网站中，我会分享我的技术文章、学习心得以及平时收集的好玩资源。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
