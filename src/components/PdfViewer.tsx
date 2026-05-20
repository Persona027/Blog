import { useState, useRef, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileDown, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

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

  const maxPageWidth = isFullscreen ? 1600 : 1200;
  const pageWidth = containerWidth > 0 ? Math.min(containerWidth, maxPageWidth) : undefined;

  const viewerContent = (
    <div className={`bg-black/40 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col ${isFullscreen ? 'h-full rounded-none border-0' : ''}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b border-white/5 bg-white/[0.03] shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <svg className="w-5 h-5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-sm text-gray-300 truncate font-medium">{title}</span>
        </div>

        <div className="hidden sm:block w-px h-5 bg-white/10" />

        <div className="flex items-center gap-1">
          <button type="button" onClick={zoomOut} disabled={loading || error} className="p-2 text-gray-400 hover:text-cyan-400 disabled:opacity-30 transition-colors rounded-lg hover:bg-white/5" title="缩小" aria-label="缩小">
            <ZoomOut size={16} />
          </button>
          <span className="text-xs text-gray-500 w-10 text-center tabular-nums select-none">{zoomPercent}%</span>
          <button type="button" onClick={zoomIn} disabled={loading || error} className="p-2 text-gray-400 hover:text-cyan-400 disabled:opacity-30 transition-colors rounded-lg hover:bg-white/5" title="放大" aria-label="放大">
            <ZoomIn size={16} />
          </button>
        </div>

        <div className="w-px h-5 bg-white/10" />

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
            title={isFullscreen ? '退出全屏' : '全屏阅读'}
            aria-label={isFullscreen ? '退出全屏' : '全屏阅读'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <a
            href={pdfUrl}
            download
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            title="下载 PDF"
          >
            <FileDown size={14} />
            <span className="hidden sm:inline">下载</span>
          </a>
        </div>
      </div>

      {/* Content area */}
      <div ref={containerRef} className={`flex justify-center bg-white/[0.02] ${isFullscreen ? 'flex-1 overflow-auto' : ''}`}>
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-32">
            <div className="w-48 h-2 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </div>
            <span className="text-sm text-gray-500">正在加载 PDF...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center gap-4 py-32 text-gray-400">
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
              width={pageWidth}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>

      {/* Page navigation */}
      {numPages && !loading && !error && (
        <div className="flex items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 border-t border-white/5 bg-white/[0.03] shrink-0">
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1}
            className="p-2 text-gray-400 hover:text-cyan-400 disabled:opacity-30 transition-colors rounded-lg hover:bg-white/5"
            title="上一页"
            aria-label="上一页"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-gray-400 tabular-nums min-w-[80px] text-center select-none">
            {pageNumber} / {numPages}
          </span>
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
            disabled={pageNumber >= numPages}
            className="p-2 text-gray-400 hover:text-cyan-400 disabled:opacity-30 transition-colors rounded-lg hover:bg-white/5"
            title="下一页"
            aria-label="下一页"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col animate-fade-in">
        {viewerContent}
      </div>
    );
  }

  return viewerContent;
};

export default PdfViewer;
