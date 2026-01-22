export default function Projects() {
  return (
    <section id="projects" className="flex min-h-screen items-center justify-center bg-white text-gray-900">
      <div className="max-w-4xl px-8 w-full">
        <h2 className="text-4xl font-bold mb-10 text-center">项目展示</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 这里是项目卡片占位符 */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">项目 A</h3>
            <p className="text-gray-600">这是一个基于 React 的示例项目。</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">项目 B</h3>
            <p className="text-gray-600">这是另一个有趣的作品。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
