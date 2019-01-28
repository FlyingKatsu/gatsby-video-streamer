import React from 'react'
import { Link } from 'gatsby'

class HorizontalList extends React.Component {
  render() {
    
    return (
      <section className='list-horiz'>
        <header>
            <h3>{this.props.title}</h3>
            <Link to={this.props.link.path}>{this.props.link.name}</Link>
        </header>
        <div>
            <button>Previous</button>

            <ol>
                {this.props.children ? this.props.children.map( (child,index) => (
                    <li key={index}>{child}</li>
                )) : ''}
            </ol>
            
            <button>Next</button>
        </div>
      </section>
    )
  }
}

export default HorizontalList
