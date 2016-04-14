import React from 'react';

import request from 'superagent-bluebird-promise';
// components
import Grid from './Grid.jsx';
import GridItem from './GridItem.jsx';

const App = React.createClass({
	propTypes:{
		dataUri:React.PropTypes.string
	},
	getInitialState:function(){
		return {
			itemIds:[],
			items:{},
			currentPage:1,
			currentPageItems:{},
			itemsPerPage:18,


			// filterOption:null
		};
	},
	totalPages:function(){
		return Math.ceil( this.state.itemIds.length / this.state.itemsPerPage );
	},

	togglePageNext:function(){
		if(this.state.currentPage < this.totalPages()){
			let nextPage = this.state.currentPage++;
			this.setState( {currentPage: nextPage} );
		}
	},
	togglePagePrev:function(){
		let prevPage = this.state.currentPage--;
		if(prevPage > 0){
			this.setState({currentPage:prevPage});
		}
	},
	componentDidMount:function(){
		console.log('componentDidMount')
		this.fetchData();
	},
	getItemArray:function(){
		let aResult = [];
		Object.keys( this.state.items ).forEach( (itemId) => {
			// console.log(itemId);
			let oItem = this.state.items[ itemId ];
			
			if(oItem != undefined){
				aResult.push( oItem );
			}
		} );
		// console.log(aResult);
		return aResult;
	},
	fetchData:function(){
		var self =this;
		// get item ids
		request.get(this.props.dataUri)
			.then(
				function(res) {
					let items = {};
					// set item ids to state
					res.body.forEach( function(itemId) {
						this[ itemId ] = undefined;
					}, items);
					self.setState(
						{
							itemIds:res.body,
							items:items
						},
						function(){
							// console.log(this.state);
							Object.keys(this.state.items).forEach( (itemId) => {
								this.fetchItemData(itemId);
							} );
						}
					);
				},
				function(err){
					console.log('error', err);
				}
			);
	},
	fetchItemData:function(itemId){
		let self = this;
		let itemUri = this.props.itemUri.replace('{}', itemId);
		request.get(itemUri)
			.then(
				function(res) {
					let items = self.state.items;
					items[ itemId ] = res.body;
					self.setState({
						items:items
					});
				},
				function(err){}
			);
	},
	_renderCurrentPage:function(){

	},
	render:function(){
		let aoItems = this.getItemArray();
		// console.log(aoItems);
		// console.log(this.state);
		return (
			<div>
				<header className="header">
				<ul className="nav nav-pills pull-right">
				  <li className="active"><a href="#">Home</a></li>
				  <li><a href="#">About</a></li>
				  <li><a href="#">Contact</a></li>
				</ul>
				<h3 className="text-muted">secretescapes</h3>
				</header>
				<div className="grid">{aoItems.map(
					function(item) {
						// console.log(item);
						return (<GridItem  {...item} key={item.id} />);
					})}
				</div>
				<footer>
					<div className="panel panel-default">
					  <div className="panel-body">
					    Created by Aaron Wilson <a href="http://fwd.london" title="FWD - Frontend Web Developer London">fwd.london</a>
					  </div>
					</div>
				</footer>
			</div>
			
		);
	}
});
export default App;