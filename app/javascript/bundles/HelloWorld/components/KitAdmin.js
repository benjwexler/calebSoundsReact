import React from "react";

// const kitAdmin = props => {

  const kitAdmin = (props) =>  {
   
  return (
    <tr>
        <td class="littlePadding">
        {/* <div
          style={props.bgImage}
        >
        </div> */}
        <img style={{height: '50px', width: '50px',}} src={props.coverArt} />
        </td>
        <td>
        <a style={{color: 'rgba(45, 51, 221, 0.747)', textDecoration: 'underline'}} href={`/kits/${props.id}`}>{props.name}</a>
        </td>
        <td>{props.price}</td>
        <td class="smallPhoneHide">{props.description}</td>
        <td>
          <i onClick={props.editKit} style={{ marginLeft: "10px", cursor: 'pointer' }} className="far fa-edit">
          </i>
      </td>
      <td style={{ paddingLeft: "15px" }}>
        <i onClick={props.deleteKit} className="far fa-trash-alt" />{" "}
      </td>
    </tr>
  );
};

export default kitAdmin;
