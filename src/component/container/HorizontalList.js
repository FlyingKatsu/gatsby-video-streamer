import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import media from '../styled/MediaQueries'

const ListItem = styled.li`
    display: inline-block;
    vertical-align: top;
    width: 16em;
    height: 18em;
    margin: 0 0.5em;
`
const List = styled.ol`
    padding: 0;
`
const Button = styled.button`
    width: 6em;
    height: 6em;
    border-radius: 3em 3em;
    border-style: none;
`
const Container = styled.div`
`
const Header = styled.header`
`
const Heading = styled.h3`
    text-align: left;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
`
const StyleLink = styled.p`
    text-align: right;
    display: inline-block;
    vertical-align: bottom;
    width: 25%;
`
const Wrapper = styled.section`
    margin: 2em auto;
    text-align: center;
    border-top: 1px solid white;
    width: 68em;
    ${media.desktop`width: 68em;`}
    ${media.tablet`width: 34em;`}
    ${media.phone`width: 17em;`}
`

class HorizontalList extends React.Component {
  render() {
    
    return (
      <Wrapper>
        <Header>
            {(this.props.title) ? <Heading>{this.props.title}</Heading> : ''}
            {(this.props.link) ? <StyleLink><Link to={this.props.link.path}>{this.props.link.name}</Link></StyleLink> : ''}
        </Header>
        <Container>
            {
            //<Button style={{right:'40%'}}>{'<'} Prev</Button>
            }
            <List>
                {this.props.children ? this.props.children.map( (child,index) => (
                    <ListItem key={index}>{child}</ListItem>
                )) : ''}
            </List>
            {
            //<Button style={{left:'40%'}}>Next {'>'}</Button>
            }
        </Container>
      </Wrapper>
    )
  }
}

export default HorizontalList
