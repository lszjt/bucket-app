import React from 'react';
export default class Bucket extends React.Component{
  render(){
    return(
      <div data-tag ={this.props.bucketId} className={"bucket-tags " + this.props.active} onClick={()=>{
        this.props.changeStateBucket(this.props.bucketId);
      }}>
        <h4>
          {this.props.bucketName}
          {this.props.showDeleteIcon}
        </h4>
      </div>
    );
  }
}
