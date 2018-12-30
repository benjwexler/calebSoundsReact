import React from 'react';

class Section2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tracks: undefined,
        }
    }

    componentDidMount() {
        console.log('GrandChild did mount.');




        let that = this 

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/tracks?limit=4",
            success: function(json){
               console.log(json)
               that.setState({
                tracks: json
                })
            },
            error: function(xhr) { 
            }, 
            dataType: "json"
          });

        
        
      }

    render() {
       

        let tracks = this.state.tracks



        if(tracks !== undefined) {
        
            tracks = (
                <div id="mainContainer">
                    <div className="cardsContainer">
                    {tracks.map(function(track, index){
                    return (
                        <div className="card" key={ index }>
                            <div className="playIcon">
                                <i id={"playAndPauseIcon" + (index+1)} className="fas fa-3x playAndPauseIcon fa-play"></i>
                            </div>
                            <h5 className="card-title">{track.name}</h5>
                            <img class="card-img-top" src={track.image} alt="Card image cap"/>
                        <div className="card-body">
                            <p className="card-text">Released: {track.release_date}</p>
                        </div>
                        </div>
                        );
                    }
                    )}
                    </div>
                </div> 
            )

        
        }

        
        return (
            <div id="section2">
                <div id="section2title">Latest Releases </div>
                {tracks}
            </div>
        )
    }

};


// const section2 = (props) => {

//     return (
//         <div id="section2">
//             <div id="section2title">Latest Releases</div>
//         </div>
//     )
// };s

export default Section2;