import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';



function ProductAdminList(props) {
    let [ar, setAr] = useState([]);
    let nav = useNavigate();

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        // get the product list from server api
        let url = API_URL + "/products";
        try {
            let resp = await doApiGet(url);
            // console.log(resp.data);
            setAr(resp.data);
        }
        catch (err) {
            alert("there problem come back later")
            if (err.response) {
                console.log(err.response.data)
            }
        }
    }

    const delProduct = async (_idDel) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                let url = API_URL + "/products/" + _idDel;
                let resp = await doApiMethod(url, "DELETE", {});
                console.log(resp.data);
                if (resp.data.deletedCount) {
                    alert("product delted !");
                }
                // for show the new list without the product that we deleted
                doApi();
            }
            catch (err) {
                console.log(err.response);
                alert("there problem , try again later")
            }
        }
    }

    return (
        <div className='container'>
            <AuthAdminComp />
            <h1>List of articles in system</h1>
            <Link to="/admin/addProduct" className="btn btn-success">Add new product</Link>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th># </th>
                        <th>name</th>
                        <th>info </th>
                        <th>title </th>
                        <th>short_id </th>
                        <th>text </th>
                        <th>qty </th>
                        <th>category</th>
                        <th>del/edit </th>
                    </tr>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.info}</td>
                                <td>{item.title}</td>
                                <td>{item.short_id}</td>
                                <td>{item.text}</td>
                                <td>{item.qty}</td>
                                <td>{item.cat_short_id}</td>

                                <td>
                                    <button onClick={() => delProduct(item._id)} className='badge bg-danger mt-2'>x</button>
                                    <button onClick={() => { nav("/admin/editProduct/" + item._id) }} className='badge bg-info'>Edit</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ProductAdminList