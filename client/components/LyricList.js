import React, {Component}  from 'react';
import gql from 'graphql-tag';
import  {graphql} from 'react-apollo';
import query from '../query/fetchSpecificSong';
import { Link } from 'react-router';

class LyricList extends Component{
 onLike(id,likes){
    this.props.mutate({
      variables:{id},
      optimisticResponse:{
        __typename:'Mutation',
        likeLyric:{id:id,__typename:'LyricType',likes:likes + 1}
      }

    });
  }
  //
  // onLyricDelete(id){
  //   // delete song and refresh the queries
  //   this.props.mutate({variables:{id}}).then(()=>this.props.data.refetch());
  // }

  renderLyrics(){
    return this.props.lyrics.map(({id,content,likes})=>{
      return (
        <li key= {id} className ="collection-item">

          {content}
          <div className = "vote-box">
          <i className ="material-icons" onClick={()=>this.onLike(id,likes)}>thumb_up</i>
          {likes}
        </div>
        </li>
      );
    });
  }
  render(){
  //  if(this.props.data.loading){return <div> Loading just wait.. </div>; }
    return (
      <ul className = "collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation  = gql `
mutation likeLyric($id:ID){
  likeLyric(id:$id){
    id
    likes
  }
}

`;

export default graphql(mutation)(LyricList);
