import {React, useEffect, useState} from 'react'
import '../css/Productos.css'

const axios=require('axios')
function Tiendas() {
    const [productos, setproductos] = useState([])
    useEffect(() => {
        async function obtener() {
            if (productos.length === 0) {
                const data = await axios.get('http://localhost:3000/GetTiendas');
                console.log(data.data.Tiendas)
                setproductos(data.data.Tiendas)
                //setloading(true)
            }
        }
        obtener()
    });
    return (
        <div className="Productos">
            
        </div>
    )
}

export default Tiendas


