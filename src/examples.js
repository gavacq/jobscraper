function FunctionalClock()  {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    let timerID = setInterval(() => {setClock(new Date())}, 1000);
    return () => {
      clearInterval(timerID)
    };
  });

  return (
    <div>
      <h2>functional clock: {clock.toLocaleTimeString()}</h2>
    </div>
  );
}

class ClassClock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>class clock: {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}