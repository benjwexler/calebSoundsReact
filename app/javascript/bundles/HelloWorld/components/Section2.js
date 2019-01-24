import React from 'react';


const section2 = (props) => {

    return (
        <div id="section2">
            <div id="section2topRow">
                <div id="whatsInside">$24.99 - CEG Guitar Essentials Vol 1.</div>
                <div onClick={props.click} id="addToCart">Add to Cart</div>
            </div>

                <table id="samplePackTable">
                    <tr className="oddRow headerRow">
                        <th></th>
                        <th>Sample Name</th>
                        <th>Genre</th>
                        <th className="smallPhoneHide">Category</th>
                        <th>BPM</th>
                        <th className="mobileHide">Energy</th>
                    </tr>

                    {props.samples}
                </table>

                <div onClick={props.loadSounds} id="loadMoreSounds">Load More Sounds</div>
        
    </div>
    )
};

export default section2;

