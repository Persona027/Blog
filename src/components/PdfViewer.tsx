import { useState, useRef, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileDown, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
}

const PdfViewer = ({ pdfUrl, title }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages: np }: { numPages: number }) => {
    setNumPages(np);
    setPageNumber(1);
    setLoading(false);
    setError(false);
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));

  const zoomPercent = Math.round(scale * 100);

  return (
    <div className="bg-black/40 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-2 sm:py-3 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-xs sm:text-sm text-gray-300 truncate">{title}</span>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <button
            onClick={zoomOut}
            disabled={loading || error}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-cyan-400 disabled:opacity-30 transition-colors"
            title="缩小"
            aria-label="缩小"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs text-gray-500 w-10 text-center tabular-nums">{zoomPercent}%</span>
          <button
            onClick={zoomIn}
            disabled={loading || error}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-cyan-400 disabled:opacity-30 transition-colors"
            title="放大"
            aria-label="放大"
          >
            <ZoomIn size={16} />
          </button>
          <a
            href={pdfUrl}
            download
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs text-gray-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors ml-1"
            title="下载 PDF"
          >
            <FileDown size={14} />
            <span className="hidden sm:inline">下载</span>
          </a>
        </div>
      </div>

      {/* PDF 内容区 */}
      <div ref={containerRef} className="flex justify-center bg-white/[0.02]">
        {loading && (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 size={32} className="text-gray-500 animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center gap-4 h-[60vh] text-gray-400">
            <p>PDF 加载失败</p>
            <a
              href={pdfUrl}
              download
              className="flex items-center gap-2 px-4 py-2 text-sm text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/20 transition-colors"
            >
              <FileDown size={16} />
              直接下载
            </a>
          </div>
        )}

        <div className={loading || error ? 'hidden' : ''}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth > 0 ? Math.min(containerWidth, 900) : undefined}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>

      {/* 底部翻页栏 */}
      {numPages && !loading && !error && (
        <div className="flex items-center justify-center gap-3 sm:gap-6 px-3 sm:px-6 py-2 sm:py-3 border-t border-white/5 bg-white/5">
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-cyan-400 disabled:opacity-30 transition-colors"
            title="上一页"
            aria-label="上一页"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs sm:text-sm text-gray-400 tabular-nums min-w-[60px] text-center">
            {pageNumber} / {numPages}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
            disabled={pageNumber >= numPages}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-cyan-400 disabled:opacity-30 transition-colors"
            title="下一页"
            aria-label="下一页"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
