import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import AuthAdminComp from '../misc_comps/authAdminComp'
import { API_URL, doApiGet, doApiMethod } from '../services/apiService'

function AddProduct(props) {
    let [cat_ar, setCatAr] = useState([]);

    let nav = useNavigate()
    let { register, handleSubmit, formState: { errors } } = useForm();

    let nameRef = register("name", { required: true, minLengt: 2, maxLength: 99 })
    let titleRef = register("title", { required: true, minLengt: 2, maxLength: 299 })
    let textRef = register("text", { required: true, minLengt: 2, maxLength: 5399 })
    let infoRef = register("info", { required: true, minLengt: 2, maxLength: 99 })
    let cat_short_idRef = register("cat_short_id", { required: false, minLengt: 2, maxLength: 99 })
    let img_urlRef = register("img_url", { required: true, minLengt: 2, maxLength: 99 })
    let qtyRef = register("qty", { required: false, min: 1, max: 20 })

    useEffect(() => {
        doApi()
    }, [])
    const doApi = async () => {
        let url = API_URL + "/categories";
        let resp = await doApiGet(url);
        console.log(resp.data);
        setCatAr(resp.data);
    }
    const onSubForm = (formData) => {
        // console.log(formData);
        doFormApi(formData);
    }

    const doFormApi = async (formData) => {
        let url = API_URL + "/products";
        try {
            //console.log(resp.data);
            let resp = await doApiMethod(url, "POST", formData);
            if (resp.data._id) {
                alert("product added");
                nav("/admin/products")
            }
        }
        catch (err) {
            console.log(err.response);
            alert("There problem try again leter")
        }
    }
    return (
        <div className='container'>
            <AuthAdminComp />
            <h1>Add new product</h1>
            <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow'>
                <label>Name:</label>
                <input {...nameRef} type="text" className='form-control' />
                {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99</small> : ""}
                <label>info:</label>
                <textarea {...infoRef} className='form-control' rows="2"></textarea>
                {errors.info ? <small className='text-danger d-block'>* Enter valid info 2 to 299</small> : ""}
                <label>title:</label>
                <input {...titleRef} type="text" className='form-control' />
                {errors.title ? <small className='text-danger d-block'>* Enter valid title 2 to 299</small> : ""}

                <label>text:</label>
                <textarea {...textRef} className='form-control' rows="3"></textarea>
                {errors.text ? <small className='text-danger d-block'>* Enter valid text 2 to 5899</small> : ""}

                <label>qty:</label>
                <input {...qtyRef} type="number" defaultValue="1" className='form-control' />
                {errors.qty ? <small className='text-danger d-block'>* Enter valid qty 2 to 99</small> : ""}

                <label>category:</label>
                <select {...cat_short_idRef} className='form-select'>
                    <option value="" >Choose Category</option>
                    {cat_ar.map(item => {
                        return (
                            <option key={item._id} value={item.short_id}>{item.name}</option>
                        )
                    })}</select>
                {errors.cat_short_id ? <small className='text-danger d-block'>* Choose one categore </small> : ""}
                <label>img url:</label>
                <input {...img_urlRef} type="text" className='form-control' />
                {errors.img_url ? <small className='text-danger d-block'>* Enter valid img_url </small> : ""}
                <button className='btn btn-info mt-2'>Add new product</button>
            </form>
        </div>
    )
}

export default AddProduct