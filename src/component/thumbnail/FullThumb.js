import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import moment from 'moment'

class FullThumb extends React.Component {
  render() {
    const dur = moment.duration(this.props.duration,'seconds')
    let duration = `${dur.minutes()}:${dur.seconds()}`
    let hours = dur.hours() + dur.days()*24
    if (hours > 0) duration = `${dur.hours()}:${duration}`
    if (dur.days()) duration = `${dur.days()}d ${duration}`
    return (
      <Link to={this.props.link.path}>
        {this.props.image ? <Image fixed={this.props.image.childImageSharp.fixed} /> : ''}
        <h4>{this.props.title}</h4>
        <p>{this.props.timeSince} - {duration}</p>
      </Link>
    )
  }
}

export default FullThumb
