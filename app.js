class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play")
        this.currentKick = './sounds/kick-classic.mp3';
        this.currentClap = './sounds/clap-1.mp3';
        this.currentHihat = './sounds/hihat-1.mp3';
        this.currentChant = './sounds/chant-1.mp3';
        this.kickAudio = document.querySelector(".kick-sound");
        this.clapAudio = document.querySelector(".clap-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.chantAudio = document.querySelector(".chant-sound");
        this.index = 0;
        this.bpm = 160;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        // Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                        this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("clap-pad")) {
                        this.clapAudio.currentTime = 0;
                    this.clapAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                        this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
                if (bar.classList.contains("chant-pad")) {
                        this.chantAudio.currentTime = 0;
                    this.chantAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
    const interval = (60/this.bpm) * 1000;
    // Check if it's playing
    if (!this.isPlaying) {
    this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
    } else {
        //clear the interval
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        }
    }
    updateBtn(){
        if (!this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");

        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "clap-select":
                this.clapAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
            case "chant-select":
                this.chantAudio.src = selectionValue;
                break;
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.clapAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
                case "3":
                    this.chantAudio.volume = 0;
                    break;
            }
        } else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.clapAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
                case "3":
                    this.chantAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function(){
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener('click', function(){
        drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});
drumKit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
})