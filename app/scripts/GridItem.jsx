import React from 'react';

const GridItem = React.createClass({
	getInitialState:function(){
		return {
			bOpen:false
		};
	},
	toggleOpenState:function(e){
		this.setState(
			{
				bOpen:!this.state.bOpen
			},
			function(){
				// console.log(this.state);
			}
		);
	},
	getRawMarkup:function(){
		return {
			__html:this.props.text
		};
	},

	render:function(){
		let aGridClasses = ['griditem'];
		let aGridTextClasses = ['griditem__text'];
		if(this.state.bOpen === true){
			aGridClasses.push('griditem--open');
		}
		if(this.state.bOpen === false){
			aGridTextClasses.push('griditem__text--closed');
		}
		return (
			<article className={aGridClasses.join(' ')} data-item-id={this.props.id} onClick={this.toggleOpenState}>
				<h1 className="griditem__title">{this.props.title}</h1>
				<p className="griditem__byline">By: {this.props.by}</p>
				<p className={aGridTextClasses.join('')} dangerouslySetInnerHTML={this.getRawMarkup()}></p>
			</article>
			);
	}
});

export default GridItem;