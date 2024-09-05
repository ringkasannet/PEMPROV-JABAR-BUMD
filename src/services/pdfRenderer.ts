import * as pdfjsLib from "pdfjs-dist";

export class PdfRenderer {
  pdfDocument: pdfjsLib.PDFDocumentProxy | null = null;
  totalPages: number = 0;
  currentPage: number = 1;
  currentZoom: number = 1;
  minZoom: number = 0.5;
  maxZoom: number = 2;
  pdfCanvas: HTMLCanvasElement;
  file: File | null = null;

  constructor(pdfCanvas: HTMLCanvasElement) {
    console.log("PdfViewer constructor");
    this.pdfCanvas = pdfCanvas;
    // pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
  }

  loadFile(file: File) {
    console.log("loadFile");
    this.file = file;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;
      const loadingTask = pdfjsLib.getDocument({ url: base64Data });
      this.pdfDocument = await loadingTask.promise;
      this.totalPages = this.pdfDocument.numPages;
      this.currentPage = 1;
      this.renderPage(this.currentPage);
    };
    reader.readAsDataURL(file);
  }

  renderPage = async (pageNumber: number) => {
    try {
      if (!this.pdfDocument) return;

      const page = await this.pdfDocument.getPage(pageNumber);
      const viewport = page.getViewport({ scale: this.currentZoom });
      const canvas: HTMLCanvasElement | null = this.pdfCanvas;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext);
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  };

  nextPage = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  };

  previousPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  };

  zoomIn = () => {
    if (this.currentZoom < this.maxZoom) {
      this.currentZoom += 0.25; // Adjust the zoom step as needed
      this.renderPage(this.currentPage);
    }
  };

  zoomOut = () => {
    if (this.currentZoom > this.minZoom) {
      this.currentZoom -= 0.25; // Adjust the zoom step as needed
      this.renderPage(this.currentPage);
    }
  };
}
