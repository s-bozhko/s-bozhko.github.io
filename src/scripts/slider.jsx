import React from 'react';
import ReactDOM from 'react-dom';

var Slider = require('react-slick');
var Scroll = require('react-scroll');
var Link = Scroll.Link;



const PrevArrow = React.createClass({
    render() {
        return (
            <span {...this.props} className="slider__control slider__control-prev" href="#">
            	<i className="fa fa-angle-left"></i>
            </span>
        );
    }
});

const NextArrow = React.createClass({
    render() {
        return (
            <span {...this.props} className="slider__control slider__control-next" href="#">
            	<i className="fa fa-angle-right"></i>
            </span>
        );
    }
});




var SimpleSlider = React.createClass({

  render: function () {

    var settings = {
      infinite: true,
      speed: 750,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: false
    };

    return (
      	<div className="intro">
	        <div className="intro__slider slider">
	            <div className="container">
	                <div className="slider__wrapper">
	                    <div className="slider__viewport">
	                        <div className="slider__slider-list list clearfix">
		                        <Slider {...settings}>	
		                            <div className="slider__item clearfix">
		                                <p className="slider__subtitle">The Ham is <span className="highlight">a PSD template</span></p>
		                                <h1 className="slider__title">We are creative</h1>
		                                <p className="slider__description">Nam varius accumsan elementum aliquam</p>

		                                <div className="slider__btn-container">
		                                    <Link className="slider__btn" to="work" smooth={true} duration={1000} offset={-120}>Explore now</Link>
		                                    <Link className="slider__btn slider__btn_blue" to="contacts" smooth={true} duration={1500} offset={-120}>Purchase now</Link>
		                                </div>
		                            </div>

		                            <div className="slider__item clearfix">
		                                <p className="slider__subtitle">Quisquam velit <span className="highlight">neque doloribus</span></p>
		                                <h1 className="slider__title">We are creative</h1>
		                                <p className="slider__description">Lorem ipsum dolor sit amet</p>

		                                <div className="slider__btn-container">
		                                    <Link className="slider__btn" to="work" smooth={true} duration={1000} offset={-120}>Explore now</Link>
		                                    <Link className="slider__btn slider__btn_blue" to="contacts" smooth={true} duration={1500} offset={-120}>Purchase now</Link>
		                                </div>
		                            </div>

                                <div className="slider__item clearfix">
                                    <p className="slider__subtitle">Temporibus numquam <span className="highlight"> eveniet dolorem</span></p>
                                    <h1 className="slider__title">We are creative</h1>
                                    <p className="slider__description">Fugit deleniti facilis incidunt</p>

                                    <div className="slider__btn-container">
                                        <Link className="slider__btn" to="work" smooth={true} duration={1000} offset={-120}>Explore now</Link>
                                        <Link className="slider__btn slider__btn_blue" to="contacts" smooth={true} duration={1500} offset={-120}>Purchase now</Link>
                                    </div>
                                </div>
		                        </Slider>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
        </div>
    );
  }
});






export default SimpleSlider;