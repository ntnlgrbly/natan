import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthAdminComp from '../misc_comps/authAdminComp'
import { API_URL, doApiGet, doApiMethod } from '../services/apiService'


function EditProduct(props) {
    let [cat_ar, setCatAr] = useState([]);
    let [product, setProduct] = useState({});
    let params = useParams();
    let nav = useNavigate()
    let { register, handleSubmit, formState: { errors } } = useForm();

    let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
    let infoRef = register("info", { required: true, minLength: 2, maxLength: 500 })
    let titleRef = register("title", { required: true, minLength: 2, maxLength: 150 })
    let textRef = register("text", { required: true, minLength: 2, maxLength: 11150 })
    let cat_short_idRef = register("cat_short_id", { required: true, minLength: 1, maxLength: 99 })
    let img_urlRef = register("img_url", { required: false, minLength: 3, maxLength: 500 })
    let qtyRef = register("qty", { required: true, min: 1, max: 9999 })

    useEffect(() => {
        doApi()
    }, [])

    // get the catgories for select box
    const doApi = async () => {
        let url = API_URL + "/categories";
        let resp = await doApiGet(url);
        console.log(resp.data);
        setCatAr(resp.data);
        // get product props from api 
        let urlProduct = API_URL + "/products/single/" + params.id;
        let resp2 = await doApiGet(urlProduct);
        console.log(resp2.data)
        setProduct(resp2.data);
    }


    const onSubForm = (formData) => {
        // console.log(formData);
        doFormApi(formData);
    }
    const doFormApi = async (formData) => {
        let url = API_URL + "/products/" + params.id;
        try {
            let resp = await doApiMethod(url, "PUT", formData);
            // console.log(resp.data);
            if (resp.data.modifiedCount) {
                alert("Product updated");
                // back to the list of products in the admin panel
                nav("/admin/products")
            }
        }
        catch (err) {
            console.log(err.response);
            alert("There problem try again later")
        }
    }

    return (
        <div className='continer'>
            <AuthAdminComp />
            <h1>updated  product</h1>
            <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow'>
                <label>Name:</label>
                <input defaultValue={product.name} {...nameRef} type="text" className='form-control' />
                {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

                <label>Info:</label>
                <textarea defaultValue={product.info} {...infoRef} className='form-control' rows="3"></textarea>
                {errors.info ? <small className='text-danger d-block'>* Enter valid info, 3 to 500 chars</small> : ""}
                <label>title:</label>
                <textarea defaultValue={product.title} {...titleRef} className='form-control' rows="3"></textarea>
                {errors.title ? <small className='text-danger d-block'>* Enter valid info, 3 to 500 chars</small> : ""}
                <label>text:</label>
                <textarea defaultValue={product.text} {...textRef} className='form-control' rows="3"></textarea>
                {errors.text ? <small className='text-danger d-block'>* Enter valid info, 3 to 500 chars</small> : ""}


                <label>Qty (amount in the stock):</label>
                <input defaultValue={product.qty} {...qtyRef} type="number" className='form-control' />
                {errors.qty ? <small className='text-danger d-block'>* Enter valid  qty, between 1 to 9999</small> : ""}

                <label>Category:</label>
                <select defaultValue={product.cat_short_id} {...cat_short_idRef} className='form-select'>
                    <option value="" >Choose Category</option>
                    {cat_ar.map(item => {
                        return (
                            <option key={item._id} value={item.short_id}>{item.name}</option>
                        )
                    })}
                    {/* loop from api of category */}
                </select>
                {errors.cat_short_id ? <small className='text-danger d-block'>You must choose category from the list </small> : ""}

                <label>Img url:</label>
                <input defaultValue={product.img_url} {...img_urlRef} type="text" className='form-control' />
                {errors.img_url ? <small className='text-danger d-block'>* Enter valid  img url </small> : ""}


                <button className='btn btn-success mt-2 mx-1'>Add new product</button>
                <Link className='btn btn-danger mt-2' to="/admin/products">Canel</Link>
            </form>
        </div>
    )
}

export default EditProduct