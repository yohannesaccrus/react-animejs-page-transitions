import React, { Component } 					from 'react'
import { Transition } 							from 'react-transition-group'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import anime from 'animejs'
import Home  from './pages/Home'
import About from './pages/About'

class Application extends Component {
  state = {
    in: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        in: true,
	  })
    }, 1000)
  }

  changePage = () => {
	  this.setState({
		  in: false
	  })
	  anime({
		targets: '.page',
		translateX: [0, -1500],
		opacity: [1, 0],
		duration: 100,
		easing: 'linear'
	})
	  setTimeout(() => {
		this.setState({
		  in: true,
		})
		anime({
			targets: '.page',
			translateX: [1500, 0],
			opacity: [0, 1],
			duration: 100,
			easing: 'linear'
		})
	  }, 800)
  }

  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link onClick={(e) => this.changePage(e)} to={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link onClick={(e) => this.changePage(e)} to={'/about'}>
                About
              </Link>
            </li>
          </ul>
        </nav>
        <Transition
          in={this.state.in}
		  timeout={{enter: 0, exit: 200}}
		  mountOnEnter
        >
          {(status) => {
            return (
              <div className={`page page-${status}`}>
                <Route path={'/'} component={Home} exact/>
				<Route path={'/about'} component={About}/>
              </div>
            )
          }}
        </Transition>
      </Router>
    )
  }
}

export default Application
