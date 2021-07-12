import React,{useState} from 'react'
import Appbar from '../reuseableComponent/Appbar'
import '../pages/style.css'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import axios from 'axios';




  


export default function Services(){

    var random = Math.random();
    
    const [outputimage, setoutputimage] = useState("")
    const [image, setimage] = useState(null)
    const [showOutput, setshowOutput] = useState(false)

    const changeHandler = (event)=>{
     console.log(event.target.files)
     setimage(event.target.files[0])
    }
   
    const handleSubmit = (e)=>{
    setshowOutput(false) 
      
     e.preventDefault()
     var formdata = new FormData()
     formdata.append(
         "mri", image
     )
     axios.post("http://127.0.0.1:8000/app/detect/",formdata).then((res)=>{
          setoutputimage("")
          console.log(res)
          setoutputimage(res.data.result['output_image'])
          setshowOutput(true)

     }).catch((err)=>{
          console.log(err)
     })
    }
     
    

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <Appbar></Appbar>
            <center>
            <div className='container'>
            <h1>Upload MRI Scan Image</h1>
            <TextField id="outlined-basic" required variant="outlined" type='file'
            onChange={changeHandler}
           />
            <br></br>
            <br></br>
            <Button type="submit" variant="contained" color="secondary" >
        Submit
      </Button>

            
            </div>
            </center>
            </form>
       <br></br> <br></br>
        {showOutput ? <div>
            <center>
                 <h6>{console.log(outputimage)}</h6>
                <h1>Segmented Output Image</h1>
                <img width={700} height={400} src={outputimage+`?${random}`} alt="not found"/>
            </center>
            </div>  : ""  
            
        }
        </div>
    )
}