import {React, useState} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../css/Nav.css'

const colores=['pink', 'green', 'purple']
const opciones=['Código','Tablas','Arbol AST']
const url=['/codigo','/tablas','/arbol']
function NavBar() {
    const [activo, setactivo] = useState(colores[0])
    return (
        <Menu inverted className="Nav">
            {
                colores.map((c, index) => (
                    <Menu.Item as={Link} to={url[index]}
                        key={c}
                        name={opciones[index]}
                        active={activo === c}
                        color={c}
                        onClick={() => setactivo(c)}
                    />
                ))
            }
        </Menu>
    )
}

export default NavBar
