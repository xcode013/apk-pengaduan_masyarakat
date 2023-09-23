// import React from 'react'

import {useState} from 'react';
import {pdfjs, Document, Page} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './Generator.css';

import type {PDFDocumentProxy} from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const opt = {
  cMapUrl: '/cmas/',
  standardFontDataUrl: '/standard_fonts/',
};

type PDFFile = string | File | null;

function PDFView() {
  const [file, setFile] = useState<PDFFile>('../tugasnya.pdf');
  const [numPages, setNumPages] = useState<number>();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  };

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <header>
        <h1>React PDF Sample</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file</label>
          <input type="file" onChange={onFileChange} />
        </div>
        <div className="Example__container__document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={opt}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PDFView;
