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


const section2 = (props) => {



    return (
        <div id="section2">
        <div id="fauxSection2">w</div>
            <div id="section2topRow">
            <img id="coverArt" style={picStyle} src="pics/gtrv3.jpg"/>
                <div id="whatsInside">$8.99 <span id="mobileDashRemove">-</span> <span id="mobilePackTitle"><br/></span>CEG Guitar Essentials Vol. 1</div>
                <div onClick={props.click} id="addToCart">Add to Cart</div>
            </div>
            <div>
            <div id="tableStyle" style={tableStyle}>
                <table id="samplePackTable">
                <tbody>
                    <tr className="oddRow headerRow">
                        <th></th>
                        <th>Sample Name</th>
                        <th>Genre</th>
                        <th>BPM</th>
                        <th className="mobileHide">Key</th>
                    </tr>

                    {props.samples}
                </tbody>
                </table>
            </div>
            </div>

                <div onClick={props.loadSounds} id="loadMoreSounds">Load More Sounds</div>
        
    </div>
    )
};

export default section2;

