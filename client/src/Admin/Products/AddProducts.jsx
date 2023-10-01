import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { useAlert } from 'react-alert';

import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { CLEARPRODUCTERROR, CREATEPRODUCT } from '../Actions/productaction';
import Loader from '../../components/layout/Loader.js/Loader'

import Sidebar from '../Dashboard/Sidebar';
const AddProducts = () => {
   const alert = useAlert();
   const navigate= useNavigate()
 const dispatch=useDispatch();
    const Categories=[
        "smartphones","laptops","fragrances","groceries","skincare","homedecoration"
      ]
      const [image,setimage]=useState([])
      const [imagePreview,setimagePreview]=useState([])
    const {products,Error,Loading}=useSelector((state=>state.Products))
    const [prodata, setprodata] = useState({
        name:'',
        category:'',
        description:'',
        stock: 0,
        price: 0,
        image:'',
  

  });
  
  const handleAvatarchange=(e)=>{
   
    const selectedImages = e.target.files;

    if (selectedImages.length > 4) {
        alert.error('You can only upload up to 4 images.');
        return;
      }
  
      const previews = [];
      for (let i = 0; i < selectedImages.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          previews.push(reader.result);
          if (previews.length === selectedImages.length) {
            setimagePreview([...previews]);
            setimage([...previews]);
          }
        };
        reader.readAsDataURL(selectedImages[i]);
      }
    };
  
  
const handleInputChange=(e)=>{
    const {name,value}=e.target;

    setprodata({...prodata,[name]:value})
    console.log(prodata)

}

      const handlesubmit=(e)=>{
        e.preventDefault()
        console.log(prodata)
        const myform= new FormData();

        myform.append('name',prodata.name)
        myform.append('category',prodata.category)
        myform.append('description',prodata.description)
        myform.append('stock',prodata.stock)
        myform.append('price',prodata.price)
      
        image.forEach((img)=>{
          myform.append('images',img)
        })

        dispatch(CREATEPRODUCT(myform))
        if(products!==[] && Error===null){
          alert.success("Products added successfully")
          navigate("/admin/products")
        }

        console.log(image);
        console.log("submit succesfully")
       
      
      }
      useEffect(()=>{
        const callback=()=>{
          alert.error(Error)
          dispatch(CLEARPRODUCTERROR())
        }
        if(Error){
          return callback
        }
        
        
      },[Error,dispatch,alert])

      if(Loading){
        return <Loader />
      }
  return (
    <>
<div className="dashboard">
      

      <div className="dashboard-main">
    
      

    <Sidebar/>
    <div className="dashboard-body">
      
      <div>

                <h2 className='myorders-h2'>Add new Product</h2>
                <div className="addproducts">
            <div>
            <h2>Product/Add new Product</h2>
                <form action="
                " onSubmit={handlesubmit}>
                
                    <div className='addproduct-category'>
                    <h2>Category<sup>*</sup></h2>
                     <select name='category' id="" onChange={handleInputChange}  >
                     
                        <option  value='' >Select Category</option>
                        { Categories.map((category)=>(
                      
                        <option  value={category} >{category}</option>
                      
                       
                        ))}
                     </select>
                     </div>
                     <div className='addproduct-detail'>
                     <div>

                   
                      <div>
                    <h2>Product name</h2>
                    <input value={prodata.name} onChange={handleInputChange} type="text" name="name"    />
                        
                 
                    </div>
                      <div>
                      <h2>Product price</h2>
                        <input  min={1} onChange={handleInputChange} value={prodata.price} type="number" name="price" />
                    
                   
                        
                 
                    </div>
                    </div>
                    <div>

                    
                    <div>
                    <h2>Product Despcription</h2>
                    <input onChange={handleInputChange} value={prodata.description}   type="text" name="description"    />
                    </div>
                   
                    </div>
                    <div>
                    <div>
                        <h2>Product Stock</h2>
                        <input value={prodata.stock} min={0} onChange={handleInputChange} type="number" name="stock" id=""/>
                    
                    </div>
                    <div>
                        <h2>Choose Images</h2>
                        <div className="addprod-img">
                            <input 
                            multiple
                            onChange={handleAvatarchange}  type="file" name="" id=""    accept='image/*' />

                            <div>
                            {imagePreview && imagePreview.map((preview, index) => (
                               
        <img key={index} src={preview} alt='all' />
      ))}
      </div>
                        </div>
                        
                    
                    </div>
                    </div>
                  <Button className='addproduct-btn' variant="contained" type='submit'   >Submit</Button>
        
                    </div>
                 
                </form>
            </div>
          
        </div>
      </div>
    </div>
         
      </div>
  </div>

      
    </>
  )
}

export default AddProducts