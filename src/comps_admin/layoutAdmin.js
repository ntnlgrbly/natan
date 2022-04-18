import React from 'react'
import { Outlet } from 'react-router-dom'

function LayoutAdmin(props) {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}

export default LayoutAdmin