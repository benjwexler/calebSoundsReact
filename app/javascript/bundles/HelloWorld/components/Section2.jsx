import React from 'react';

class Section2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nonsense: 5,
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
                nonsense: json[0].name
                })
            },
            error: function(xhr) { 
            }, 
            dataType: "json"
          });

        
        
      }

    render() {
        return (
            <div id="section2">
                <div id="section2title">Latest Releases {this.state.nonsense}</div>
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