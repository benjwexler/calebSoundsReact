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
                        <th>Release Date</th>
                        <th>Soundcloud</th>
                        <th>Spotify</th>
                        <th>Youtube</th>
                        <th>Apple Music</th>
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