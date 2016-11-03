import React from 'react';
import AddModal from './utilities/AddBucketModal';
import {Grid, Row, Col} from 'react-bootstrap';
import Sidebar from './utilities/Sidebar';
import Cards from './buckets/Cards';
import uuid from 'uuid';
import update from 'react-addons-update';

export default class Component extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      showModal : false,
      bucketList: [],
      buckets: [],
      selectedBucket: {},
      currentBucketId: 0,
      allGroups:[],
      currentGroupId: 0
    }

    //Bind our functions to the current scope
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeState = this.changeState.bind(this);
    this.addCard = this.addCard.bind(this);
    this.addBucket = this.addBucket.bind(this);
    this.moveCard = this.moveCard.bind(this);
  }

  componentWillMount(){
    this.initializeBucket(this.props.currentGroup.buckets);
  }

  componentWillReceiveProps(nextProps){
    this.initializeBucket(nextProps);
  }

  render() {
    const cardArray = this.state.selectedBucket.cards;
    console.log('card array ', cardArray);
    const closeModal = () => this.setState({ showModal: false });

    return (
      <div>
        <Sidebar
          selectedBucket = {this.state.currentBucketId}
          bucketList = {this.state.bucketList}
          changeStateBucket = {this.changeState}
          addBucket = {this.addBucket} />

        <div className="main-container">
          {
            this.state.showModal ?
            <AddModal
              addCard = {this.addCard}
              close = {this.closeModal}
              addBucket = {this.createBucket}
              bucketTags = {this.state.bucketList}
              />
            : null
          }

              { cardArray.map((cardEntry) => { return(
                  <Cards
                    key = {cardEntry.id.toString()}
                    activities = {cardEntry}
                    moveCard={this.moveCard}
                    bucketTags = {this.state.bucketList}
                    />
              )})}
          <div className='add-btn' onClick = {this.showModal}>+</div>
        </div>
      </div>
    )
  }

  //Functions for Buckets and stuff
  showModal(){
    this.setState({showModal: true})
  }

  closeModal(){
    this.setState({showModal:false});
  }

  changeState(bucketId) {
    console.log(this.state.buckets);
    const bucketArray = this.state.buckets.cards;
    console.log(bucketArray);
    console.log(this.state.buckets);
    const nextBucket = bucketId !== 0 ? bucketArray.filter((bucket)=>(bucket.tags[0] == bucketId)) : bucketArray;

    const changeBucket = {
      cards: nextBucket
    }

    this.setState({
      selectedBucket: changeBucket,
      currentBucketId: bucketId
    });
  }

  addCard(card, bucketId){
    const newCard = {
      id: uuid.v4(),
      yelpId: card.id,
      img: card.image_url,
      rating: card.rating_img_url,
      city: card.location.city,
      reviewCount: card.review_count,
      title: card.name,
      tags: [bucketId]
    }

    const currentBucketId = this.state.currentBucketId;
    const currentBucket = this.state.buckets.cards;
    const updatedGroup = update(this.state.buckets, {cards: {$push: [newCard]}});
    const selectedBucket = bucketId === currentBucketId || currentBucketId === 0 ? update(this.state.selectedBucket, {cards: {$push: [newCard]}}) : this.state.selectedBucket;

    this.props.updateAllGroups(newCard, this.state.currentGroupId, bucketId);

    this.setState({
      buckets: updatedGroup,
      selectedBucket: selectedBucket
    });

  }

  moveCard(card, newTag){
    console.log('moving card ', card , ' to bucket ', newTag);
    card.tags[0] = newTag;
    var nextSelectedState ={};

    const newCard = card;
    const nextState = this.state.buckets.cards.map((oldCard) => {
      if(oldCard === card.id){
        return card;
      }
      else{
        return oldCard;
      }
    });

    if(newTag !== this.state.currentBucketId && this.state.currentBucketId != 0){
      nextSelectedState.cards = this.state.selectedBucket.cards.filter((oldCard)=>(oldCard.id !== card.id));
    }
    else{
      nextSelectedState = this.state.selectedBucket;
    }

    console.log('next selected state ', nextSelectedState);

    // var currentBucket = this.state.selectedBucket.id;
    // const nextSelectedBucketState = this.state.selectedBucket.cards.filter((currentCard)=>(currentCard.id !== card.id));
    // console.log(this.state.buckets);
    //
    // const nextBucketState = this.state.buckets.cards.map((bucket)=>{
    //   if(bucket.id === newTag){
    //     return newCard;
    //   }
    //   if(bucket.id === currentBucket){
    //     bucket.cards = nextSelectedBucketState;
    //   }
    //   return bucket;
    // });
    this.setState({
      buckets: update(this.state.buckets, {cards: {$set: nextState}}),
      selectedBucket: nextSelectedState
    });
  }

  initializeBucket(buckets){
    console.log('initializing buckets ', buckets);

    const currentBucket = buckets.currentGroup;
    const selected = currentBucket ? currentBucket.buckets : {cards:[]}
    const listOfBuckets = currentBucket ? currentBucket.tags : []
    const allBuckets = currentBucket ? currentBucket.buckets : null;
    const currentGroup = currentBucket ? buckets.currentGroup.id : 0;

    this.setState({
      bucketList: listOfBuckets,
      buckets: allBuckets,
      selectedBucket: selected,
      allGroups: buckets.allGroups,
      currentGroupId: currentGroup
    });
  }

  addBucket(name) {
    if (name != "") {
      var newBucket = {id: uuid.v4(), title: name, cards: []};
      var newBucketList = [...this.state.bucketList, newBucket];
      var newBuckets = [...this.state.buckets, newBucket];
      this.setState({
        bucketList: newBucketList,
        selectedBucket: newBucket,
        buckets: newBuckets
      });

      // not sure if i can do this; trying to keep the newly created buckets in the groups, 
      // so that they still show up when switching between groups
      this.props.currentGroup.buckets = newBuckets;
    }
  }

}
