import React from 'react';

export default class SearchEntry extends React.Component {
  render(){

    return(
      <div className="search-entry-card">
        <p style ={{color: 'black', marginBottom: 5}}>{this.props.ItemEntry.name}</p>
        <img src={this.props.ItemEntry.image_url} width="75"/>
      </div>
    )
  }
}
