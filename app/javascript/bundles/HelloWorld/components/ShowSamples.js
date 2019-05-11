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


const showSamples = (props) => {



    return (
        <div style={{ paddingTop: "100px" }} id="section2">
      <div
        style={{ height: "auto", display: "flex" }}
      >
        <div style={{ margin: "auto", marginBottom: '20px', display: 'flex' }}>
          <div style={{margin: 'auto'}} onClick={props.openModal}>
            ADD SOUNDS
          </div>

          <div onClick={props.openModal}>
            <i style={{fontSize: '28px', marginLeft: '5px', color: 'rgba(45, 51, 221, 0.747)'}} class="fas fa-plus-square" />
          </div>
        </div>
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
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>

                    {props.samples}
                </tbody>
                </table>
            </div>
            </div>

                
        
    </div>
    )
};

export default showSamples;