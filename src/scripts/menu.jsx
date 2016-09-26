import React from 'react';
import ReactDOM from 'react-dom';
var Scroll = require('react-scroll');


var Link       = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;


var Menu = React.createClass({
  componentDidMount: function() {

    Events.scrollEvent.register('begin', function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });

    scrollSpy.update();
  },

  componentWillUnmount: function() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  },

  render: function () {
    return (
      <div>
         <nav className="navbar-collapse header__navigation clearfix collapse" id="bs-navbar"> 
            <ul className="nav navbar-nav navigation list"> 
                <li className="navigation__item">
                  <Link activeClass="navigation__link_active" className="navigation__link" to="intro" offset={-120} spy={true} smooth={true} duration={500}>Home</Link>
                </li>
                <li className="navigation__item">
                  <Link activeClass="navigation__link_active" className="navigation__link" to="company" offset={-120} spy={true} smooth={true} duration={500}>About</Link>
                </li>
                <li className="navigation__item">
                  <Link activeClass="navigation__link_active" className="navigation__link" to="services" offset={-120} spy={true} smooth={true} duration={500}>Service</Link>
                </li>
                <li className="navigation__item">
                  <Link activeClass="navigation__link_active" className="navigation__link" to="work" offset={-120} spy={true} smooth={true} duration={500}>Work</Link>
                </li>
                <li className="navigation__item">
                  <Link activeClass="navigation__link_active" className="navigation__link" to="feedback" offset={-120} spy={true} smooth={true} duration={500}>Testimonial</Link>
                </li>
                <li className="navigation__item">
                  <Link activeClass="navigation__link_active" className="navigation__link" to="news" offset={-120} spy={true} smooth={true} duration={500}>Blog</Link>
                </li>
                <li className="navigation__item">
                  <Link activeClass="navigation__link_active" className="navigation__link" to="team" offset={-120} spy={true} smooth={true} duration={500}>Team</Link>
                </li>
                <li className="navigation__item">
                  <Link activeClass="navigation__link_active" className="navigation__link" to="contacts" offset={-120} spy={true} smooth={true} duration={500}>Contact</Link>
                </li>
            </ul>
        </nav> 
      </div>
    );
  }
});



export default Menu;