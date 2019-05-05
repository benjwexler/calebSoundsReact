import React from "react";

// const kitAdmin = props => {

  const kitAdmin = (props) =>  {
   
  return (
    <tr>
        <td class="littlePadding"></td>
        <td>
        <a style={{color: 'rgba(45, 51, 221, 0.747)', textDecoration: 'underline'}} href={`/kits/${props.id}`}>{props.name}</a>
        </td>
        <td>{props.price}</td>
        <td class="smallPhoneHide">{props.description}</td>
        <td>Delete</td>
    </tr>
  );
};

export default kitAdmin;
