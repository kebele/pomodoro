function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class PomodoroFinally extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "timer",


















    () => {
      //saatin geriye doğru sayması
      let minutes = Math.floor(this.state.defaultTime / 60);
      let seconds = this.state.defaultTime - minutes * 60;
      //eğer 10 saniyenin altında ise 00 şeklinde görünmesi
      if (seconds < 10) {
        seconds = "0" + seconds;
      } else {
        //değilse normal
        seconds = seconds;
      }
      //eğer 10 dakikanın altında ise 00 şeklinde görünmesi
      if (minutes < 10) {
        minutes = "0" + minutes;
        //değilse normal
      } else {
        minutes = minutes;
      }
      //saatin görünümü dd:ss şeklinde
      return minutes + ":" + seconds;
    });_defineProperty(this, "decreaseTime",

    () => {
      this.setState({ defaultTime: this.state.defaultTime - 1 });
    });_defineProperty(this, "checkTime",

    () => {
      let timer = this.state.defaultTime;
      this.sound(timer); //defaultTime = 0 old. çalacak
      if (timer < 0) {
        //defaultTime 0 old
        //timeType session iken 

        if (this.state.timeType === "Session") {
          clearInterval(this.state.countDown); //interval ı durduracak
          this.startClock(); // saati çalıştıracak
          this.setState({
            //default time ı break için ayrlanana eşitleyecek
            defaultTime: this.state.breakTime * 60,
            timeType: "Break" // timeType ı break yapacak
          });
        } else {
          // working de değilsek saat çalışacak, workTime olarak gidecek
          //session olacak
          clearInterval(this.state.countDown);
          this.startClock();
          this.setState({
            defaultTime: this.state.workTime * 60,
            timeType: "Session" });

        }
      }
    });_defineProperty(this, "sound",


    time => {
      if (time < 0) {
        this.audioAlarm.play();
      }
    });_defineProperty(this, "startClock",


    () => {
      this.setState({
        countDown: setInterval(() => {
          this.decreaseTime();
          this.checkTime();
        }, 1000) });

    });_defineProperty(this, "startStopButton",


    () => {
      if (!this.state.isWorking) {
        //isWorking başlangıçta false, startClock() daki interval çalışacak sonrasında isWorking true yapaca
        this.startClock();
        this.setState({
          isWorking: true });

      } else if (this.state.isWorking) {
        this.setState({
          isWorking: false });

        clearInterval(this.state.countDown);
      }
    });_defineProperty(this, "resetButton",


    () => {
      this.setState({
        breakTime: 5,
        workTime: 25,
        defaultTime: 1500,
        isWorking: false,
        timeType: "Session" });

      clearInterval(this.state.countDown);
      this.audioAlarm.pause();
      this.audioAlarm.currentTime = 0;
    });_defineProperty(this, "decrementBreak",


    () => {
      if (this.state.breakTime != 1) {
        if (this.state.timeType == "Break") {
          this.setState({
            breakTime: this.state.breakTime - 1,
            defaultTime: this.state.breakTime * 60 - 60 });

        } else if (this.state.timeType = "Session") {
          this.setState({ breakTime: this.state.breakTime - 1 });
        }
      }
    });_defineProperty(this, "incrementBreak",
    () => {
      if (this.state.breakTime != 60) {
        if (this.state.timeType == "Break") {
          this.setState({
            breakTime: this.state.breakTime + 1,
            defaultTime: this.state.breakTime * 60 + 60 });

        } else if (this.state.timeType = "Session") {
          this.setState({ breakTime: this.state.breakTime + 1 });
        }
      }
    });_defineProperty(this, "decrementWorking",


    () => {
      if (this.state.workTime != 1) {
        if (this.state.timeType == "Session") {
          this.setState({
            workTime: this.state.workTime - 1,
            defaultTime: this.state.workTime * 60 - 60 });

        } else if (timeType = "Break") {
          this.setState({ workTime: this.state.workTime - 1 });
        }
      }
    });_defineProperty(this, "incrementWorking",
    () => {
      if (this.state.workTime != 60) {
        if (this.state.timeType == "Session") {
          this.setState({
            workTime: this.state.workTime + 1,
            defaultTime: this.state.workTime * 60 + 60 });

        } else if (timeType = "Break") {
          this.setState({ workTime: this.state.workTime + 1 });
        }
      }
    });this.state = { breakTime: 5, workTime: 25, defaultTime: 1500, isWorking: false, timeType: "Session", countDown: "", button: "play" };} //gerekli fonksiyonlar
  //saatin geriye gitmesi timer
  //start-stop-reset
  //saatin geriye başlaması
  //default sürenin kontrolu
  //alarm çalması
  //SAAT
  render() {return React.createElement("div", null, React.createElement("div", null, React.createElement("h1", null), React.createElement(Break, {
      break: this.state.breakTime,
      decrementBreak: this.decrementBreak,
      incrementBreak: this.incrementBreak }),


    React.createElement(Working, {
      decrementWorking: this.decrementWorking,
      incrementWorking: this.incrementWorking,
      session: this.state.workTime })),



    React.createElement(Display, { timer: this.timer(), session: this.state.timeType }),
    React.createElement(Buttons, {
      resetButton: this.resetButton,
      playPauseButton: this.startStopButton }),

    React.createElement("audio", {
      id: "beep",
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
      ref: audio => {
        this.audioAlarm = audio;
      } }));



  }}


class Break extends React.Component {
  render() {
    return (
      React.createElement("div", null,
	  React.createElement("h1", { className: "center btn-outline-info text-dark" }, "p o m o d o r o"),
	  React.createElement("br"),
      React.createElement("h3", { id: "break-label" }, "b r e a k"),
      React.createElement("div", { className: "center" },
      React.createElement("button", {
        className: "btn btn-warning m-4",
        id: "break-decrement",
        onClick: this.props.decrementBreak },

      React.createElement("i", { class: "fas fa-arrow-left" })),

      React.createElement("div", { id: "break-length" }, this.props.break),
      React.createElement("button", {
        className: "btn btn-success m-4",
        id: "break-increment",
        onClick: this.props.incrementBreak },

      React.createElement("i", { class: "fas fa-arrow-right" })))));




  }}

class Working extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement("h3", { id: "session-label" }, "w o r k i n g"),
      React.createElement("div", { className: "center" },
      React.createElement("button", {
        className: "btn btn-danger m-5",
        id: "session-decrement",
        onClick: this.props.decrementWorking },

      React.createElement("i", { class: "fas fa-arrow-left" })),

      React.createElement("div", { id: "session-length" }, this.props.session),
      React.createElement("button", {
        className: "btn btn-primary m-5",
        id: "session-increment",
        onClick: this.props.incrementWorking },

      React.createElement("i", { class: "fas fa-arrow-right" })))));




  }}


class Display extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "display" },
      React.createElement("div", { id: "timer-label" }, this.props.session),
      React.createElement("div", { id: "time-left" }, this.props.timer)));


  }}

class Buttons extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "center" },
      React.createElement("button", {
        className: "btn",
        id: "start_stop",
        onClick: this.props.playPauseButton },


      React.createElement("i", { class: "fas fa-play fa-2x m-3 btn-outline-success" })),

      React.createElement("button", { className: "btn", onClick: this.props.resetButton, id: "reset" },
      React.createElement("i", { class: "fas fa-sync fa-2x m-3 btn-outline-primary" }))));



  }}


ReactDOM.render(React.createElement(PomodoroFinally, null), document.getElementById("app"));