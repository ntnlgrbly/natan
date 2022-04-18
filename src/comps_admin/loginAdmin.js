import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod } from '../services/apiService';

function LoginAdmin(props) {
    let nav = useNavigate();
    let { register, handleSubmit, formState: { errors } } = useForm();

    const onSubForm = (data) => {
        console.log(data);
        doApi(data)

    }
    const doApi = async (_dataBody) => {
        let url = API_URL + "/users/login"
        try {

            let resp = await doApiMethod(url, "POST", _dataBody)
            console.log(resp.data);
            if (resp.data.token) {
                localStorage.setItem("tok", resp.data.token);
                // send user to product list
                nav("/admin/products")
            }
            else {
                alert("There some error come back later...")
            }
        }
        catch (err) {
            alert(err.response.data.err)
            console.log(err.response.data)
        }
    }
    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    })
    let passwordRef = register("password", { required: true, minLength: 3 });

    return (

        <div className='container'>
            <h1> LoginAdmin to system</h1>
            <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 border'>
                <label>Email</label>
                <input {...emailRef} type='text' className='form-control' />
                {errors.email ? <small className='text-danger d-block'>* Email invalid </small> : ""}
                <label>Password:</label>
                <input {...passwordRef} type='text' className='form-control' />
                {errors.password ? <small className='text-danger d-block'>* Enter  Password invalid you need min 3 chars</small> : ""}
                <button className='btn btn-info mt-4'>Login</button>
            </form>
        </div>
    )
}

export default LoginAdmin