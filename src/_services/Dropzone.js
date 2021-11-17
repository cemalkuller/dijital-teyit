import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CommonLoading } from 'react-loadingg';
import { userService } from '../_services/user.service';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';


const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 20,
  borderColor: "#26C2E7",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#c4c4c4",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#f2f"
};

const acceptStyle = {
  borderColor: "#f8f"
};

const rejectStyle = {
  borderColor: "#f2f"
};



function InputFiles(props) {
  const [types, setNameState] = useState(props)
  const [token, setTokenState] = useState(props)
  useEffect(() => {
    setNameState(props);
  }, [props])

  useEffect(() => {
    setTokenState(props);
  }, [props])
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    fileRejections,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) =>
        acceptedFiles.reduce(
          (acc, file) => ({
            ...acc,
            [file.name]: {
              file,
              fileType: ""
            }
          }),
          prevFiles
        )
      );
    },
    accept: "image/*,.pdf"
  });

   const uploadDoc = (e) => {

    setLoading(true);
    var formData = new FormData();

    Object.keys(files).map((fileName, index) => {
      formData.append(`image${index}`, files[fileName].file);
      formData.append(`doctype${index}`, files[fileName].fileType);


    });


    formData.append("token", token.token);


    userService.uploadDoc(formData).then(result => {

      setLoading(false);
      if (result.success) {
        setFiles((prevFiles) => ({}));
        store.addNotification({
          title: 'İşlem Başarılı',
          message: result.message,
          type: 'success',                         // 'default', 'success', 'info', 'warning'
          container: 'top-center',               // where to position the notifications
          animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
          dismiss: {
            duration: 3000
          }
        });

        props.callback();

      }
      else {
        store.addNotification({
          title: 'Hata Oluştu',
          message: result.message,
          type: 'warning',                         // 'default', 'success', 'info', 'warning'
          container: 'top-center',                // where to position the notifications
          animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
          dismiss: {
            duration: 3000
          }
        });
      }

    }

    );

  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const acceptedFileItems = Object.keys(files).map((fileName, i) => {
    const currentFile = files[fileName].file;

    const onSelectChange = (e) => {
      e.persist();
      setFiles((prevFiles) => {
        return {
          ...prevFiles,
          [fileName]: {
            ...prevFiles[fileName],
            fileType: e.target.value
          }
        };
      });
    };



    return (
      <div className="row evrak_div" key={fileName}>

        <div className="col-lg-4">
          <div className="form-item evrak_image_div">

            <img style={{ width: '80px', maxHeight: '50px' }} src={currentFile.type == 'application/pdf' ? './assets/img/pdf.svg' : window.URL.createObjectURL(currentFile)} />
          </div>
        </div>

        <div className="col">
          <div className="form-item">
            <label className="uzunyazi">{currentFile.name}</label>
            <select className="form-control bg-white" value={currentFile.fileType} onChange={onSelectChange}>
              <option value="">Evrak Tipi Seçiniz</option>
              {
                props.types.map((doc, index) => {
                  return <option key={`doc${index}`} value={doc.id} >{doc.name}</option>
                })
              }
            </select>
          
          </div>
          <FontAwesomeIcon icon={faTrash} onClick={() => remove(i)} />
        
        </div>

      </div>

    );
  });
 
  const remove = (file) => {

    let newFiles = [...Object.keys(files)];
    let temp = { ...files }
    delete temp[newFiles[file]];


    if (Object.keys(files).length) {
      setFiles((prevFiles) => (temp));


    }

    else {
      setFiles((prevFiles) => ({}));
    }


  };
  return (
    <section className="drop_image">
      {loading ? <div className="overlay_load"> <CommonLoading color="#38d8ee" speed="1.2" /></div> : <></>}
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p  >Yüklemek istediğiniz evrağı buraya sürükleyin veya tıklayın.</p>
        <em>Resim dosyaları  veya PDF yükleyebilrisiniz.</em>
      </div>
      <aside>
        {acceptedFileItems}


      </aside>
     
      <button className="btn_blue" disabled={!Object.keys(files).length} onClick={(e) => uploadDoc()}  >Evrakları Yüklemeyi Başlat</button>

    </section>
  );
}

export default InputFiles;
