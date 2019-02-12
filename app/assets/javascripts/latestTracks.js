document.addEventListener("DOMContentLoaded", function () {

    console.log("latest Track test")

    const fakeSubmitBtn = document.getElementById("fakeSubmitBtn");
    const createTrack = document.getElementById("createTrack");

    const trackForm = document.getElementById("trackForm");
    
    
    
    
    const soundcloudEmbed = document.getElementById("track_soundcloud_id")
    
    var spliceSoundcloudId = (event) => { 

        event.preventDefault()
    
        // if((event.type === "click") || (event.keyCode === 13)) {
    
        soundcloudLink = soundcloudEmbed.value.split('tracks/')[1]
        soundcloudEmbed.value = soundcloudLink.split('&')[0]

        // console.log(sound)
        trackForm.submit()
        // }
    
        
        
    };

    var preventDefault = (event) => {
        event.preventDefault()

        console.log("blahdnidj dkj")
    }
    
    trackForm.addEventListener("submit", spliceSoundcloudId);
    
    // fakeSubmitBtn.addEventListener("click", spliceSoundcloudId)
    
    // fakeSubmitBtn.addEventListener("keydown", spliceSoundcloudId)
    
    
    });
    