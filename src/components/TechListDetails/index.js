import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../../Header'

class TechListItemDetails extends Component {
  state = {
    apiStatus: '',
    courseDetails: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: 'LOADING'})
    const {match} = this.props

    const {params} = match

    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      const courseDetails = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({apiStatus: 'SUCCESS', courseDetails})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderSuccessView = () => {
    const {courseDetails} = this.state

    const {name, imageUrl, description} = courseDetails

    return (
      <div className="item-detail">
        <img src={imageUrl} alt={name} className="detail-img" />
        <div className="desc-container">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
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
      <>
        <Header />
        <div className="course-list-item-details">{this.renderApiStatus()}</div>
      </>
    )
  }
}

export default TechListItemDetails
