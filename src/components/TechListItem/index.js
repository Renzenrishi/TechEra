import './index.css'

import {Link} from 'react-router-dom'

const TechListItem = props => {
  const {details} = props

  const {id, name, logoUrl} = details

  return (
    <Link className="link-item" to={`/courses/${id}`}>
      <li className="tech-list-item">
        <img src={logoUrl} alt={name} />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default TechListItem
