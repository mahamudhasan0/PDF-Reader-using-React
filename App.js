import React, { useState } from 'react';
import { BiLeftArrow , BiRightArrow } from 'react-icons/bi';
import { Document,Page,pdfjs } from 'react-pdf';
import classNames from "classnames";
import styles from './App.css'
import { HideDuring } from "react-hide-on-scroll";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function App() {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setpdfFile] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
  const selectPdf = (e) => {

    console.log(e.target.files[0]) // > File {name: "Short_note.pdf", lastModified: 1604933669758, lastModifiedDate: Mon Nov 09 2020 20:54:29 GMT+0600 (Bangladesh Standard Time), webkitRelativePath: "", size: 3988167, …}
    const file=  e.target.files[0]

    //we can also use FileReader() object

    // const reader = new FileReader()
    // reader.addEventListener('load',()=> {
    //   console.log(reader.result)
    //   const result = reader.result
    //   setpdfFile(result)
    // })

    //without FileReader() object also run the same
    setpdfFile(file)
  }

  const showNext=()=>{
    if(pageNumber<numPages)
    {    
    setPageNumber(pageNumber+1);
    }
    else
    {
        setPageNumber(pageNumber);
    }
    }
  
    const showPrev=()=>{
      if(pageNumber>1)
      {     setPageNumber(pageNumber-1);
      }
      else
      {
          setPageNumber(pageNumber);
      }
      }
   const renderError = () => {
     return(
       <div>Failed to load pdf file</div>
     )
   }
   const loader = () => {
     return(
       <div>Please wait Some Moment to load your files</div>
     )
   }
   const noData = () => {
     return(
      <div>Please select a file.</div>
     )
   }
   const loadProgress = ({ loaded, total }) => {
     return(
      alert('Loading a document: ' + (loaded / total) * 100 + '%'))
   }

  return (
    <div>
      <label  className="custom-file-input">
              <input type="file" accept='application/pdf' onChange={selectPdf}/>
      </label>
      <HideDuring inverse>
       <div className={classNames(styles.sticky, styles.hideDuring)}>
          
          <div className='main'>
          <button className='btn' onClick={showPrev}>
              <BiLeftArrow style={{'color':'white'}}/>
          </button>
          <button className='btn' onClick={showNext}>
              <BiRightArrow style={{'color':'white'}}/>
          </button>
          <div className='pdf-info'>
              <span id='page-no'>{pageNumber}</span>
              /<span id='page-count'>{numPages}</span>
          </div>
        </div>
     </div>
    </HideDuring>
       
      <Document
        file={pdfFile}
        error={renderError}
        externalLinkTarget={'_blank'} //"_self","_blank", "_parent","_top"
        loading={loader}
        noData={noData}
        onLoadProgress={loadProgress}
        onLoadSuccess={onDocumentLoadSuccess}
        className='document'
      >
        <Page pageNumber={pageNumber} scale={0.9}/>
      </Document>

      <p className='pages'><span>{pageNumber}</span> / <span>{numPages}</span></p>
    </div>
  );
}