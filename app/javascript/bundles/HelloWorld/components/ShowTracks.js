import React from 'react';

const tableStyle = {
    maxHeight: '700px',
    overflowY: 'auto',
    // width: '500px,'
  };

  const wrapper = {
    
        // width: "100%",
        // overflow: "scroll"
  
  }

    let picStyle = {
      width: '80px',
      height: '80px',
      marginTop: '20px',
      borderRadius: '5px',
      marginLeft: '3px'
  }


const showTracks = (props) => {



    return (
        <div style={{paddingTop: '100px'}} id="section2">
            <div id="section2topRow">
           
            </div>
            <div>
            <div id="tableStyle" style={tableStyle}>
                <table id="samplePackTable">
                <tbody>
                    <tr className="oddRow headerRow">
                        <th></th>
                        <th>Track Name</th>
                        <th className="centerColContent">Release <span className="mobileHide">Date</span></th>
                        <th className="centerColContent">Soundcloud</th>
                        <th className="centerColContent">Spotify</th>
                        <th className="centerColContent">Youtube</th>
                        <th className="centerColContent">Apple <span className="mobileHide">Music</span></th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>

                    {props.tracks}
                </tbody>
                </table>
            </div>
            </div>

                
        
    </div>
    )
};

export default showTracks;