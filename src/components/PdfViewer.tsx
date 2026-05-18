import { FileDown } from 'lucide-react';

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
}

const PdfViewer = ({ pdfUrl, title }: PdfViewerProps) => {
  return (
    <div className="bg-black/40 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-3 min-w-0">
          <svg className="w-5 h-5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span className="text-sm text-gray-300 truncate">{title}</span>
        </div>
        <a
          href={pdfUrl}
          download
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors shrink-0"
          title="下载 PDF"
        >
          <FileDown size={14} />
          <span>下载</span>
        </a>
      </div>
      <iframe
        src={`${pdfUrl}#toolbar=0`}
        className="w-full h-[60vh] sm:h-[75vh] lg:h-[85vh] border-0"
        title={title}
      />
    </div>
  );
};

export default PdfViewer;
