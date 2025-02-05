import React, { createContext } from 'react'

function Gestion_roles() {
    const RoleContext = createContext();

    const [user, setUser] = useReducer([
        {id : 1, name : 'Ali', role: 'admin'},
        {id : 1, name : 'Ahmed', role: 'utilisateur'},
        {id : 1, name : 'Adil', role: 'visiteur'},
        {id : 1, name : 'Anas', role: 'admin'},
        {id : 1, name : 'Aboud', role: 'utilisateur'},
        {id : 1, name : 'Asil', role: 'visiteur'},
    ])

  return (
    <div></div>
  )
}

export default Gestion_roles