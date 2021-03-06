import React from "react";

const tableStyle = {
  maxHeight: "700px",
  overflowY: "auto"
  // width: '500px,'
};

const wrapper = {
  // width: "100%",
  // overflow: "scroll"
};

let picStyle = {
  width: "80px",
  height: "80px",
  marginTop: "20px",
  borderRadius: "5px",
  marginLeft: "3px"
};

const showKits = props => {
  return (
    <div style={{ paddingTop: "100px" }} id="section2">
      <div
        style={{ height: "auto", display: "flex" }}
      >
        <div style={{ margin: "auto", marginBottom: '20px', display: 'flex' }}>
          <a style={{margin: 'auto'}} href="/kits/new">
            ADD NEW KIT
          </a>

          <a href="/kits/new">
            <i style={{fontSize: '28px', marginLeft: '5px', color: 'rgba(45, 51, 221, 0.747)'}} class="fas fa-plus-square" />
          </a>
        </div>
      </div>
      <div id="section2topRow" />
      <div>
        <div id="tableStyle" style={tableStyle}>
          <table id="samplePackTable">
            <tbody>
              <tr className="oddRow headerRow">
                <th />
                <th>Kit Name</th>
                <th>Price </th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>

              {props.kits}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default showKits;
