import {useState} from 'react';
import {useSelector} from 'react-redux';

function Dash () {
    const data = useSelector(state => state);


    return(
        <div>
            <h1>Dashboard</h1>
            <h2>logged in as: {data.data.name}</h2>
            <h2>Email:  {data.data.email}</h2>
            <h2>Phone: {data.data.phone}</h2>
        </div>
    )

}
export default Dash;