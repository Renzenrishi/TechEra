import {Component} from 'react'

import Loader from 'react-loader-spinner'
import TechListItem from '../TechListItem'

import './index.css'
import Header from '../../Header'

class TechEra extends Component {
  state = {
    apiStatus: '',
    coursesData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: 'LOADING'})

    const response = await fetch('https://apis.ccbp.in/te/courses')

    if (response.ok) {
      const data = await response.json()

      const realData = data.courses

      const coursesData = realData.map(each => ({
        name: each.name,
        id: each.id,
        logoUrl: each.logo_url,
      }))

      this.setState({apiStatus: 'SUCCESS', coursesData})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderSuccessView = () => {
    const {coursesData} = this.state

    return (
      <>
        <h1>Courses</h1>
        <ul className="tech-items-container">
          {coursesData.map(eachItem => (
            <TechListItem details={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-btn" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        <div className="tech-era-container">{this.renderApiStatus()}</div>
      </div>
    )
  }
}

export default TechEra
