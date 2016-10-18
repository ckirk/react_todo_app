// var data = [  
//   {key: 0, text: 'Buy milk', status: 'completed'}, 
//   {key: 1, text: 'Call Caron back', status: ''},
//   {key: 2, text: 'Mow the lawn', status: ''} 
// ];

var TodoContainer = React.createClass({
  getInitialState: function() {
    return { text: '', data: []};
  },
  // fired when component first loads (only 1x)
  componentDidMount: function() {
    this.getTodosFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  getTodosFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTodoSubmit: function(text) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: text,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  // fired on form submit
  addTodoItem: function(e) {
    e.preventDefault();

    // push to list
    this.handleTodoSubmit({text: this.state.text, status: ''});
    console.log(this.state.text);
    // var nextKey = this.state.data.length + 1;
    // this.state.data.push({key: nextKey, text: this.state.text});

    // clear input box
    this.setState({text: ''});
  },
  removeTodoItem: function(index) {
    this.state.data.splice(index, 1);

    // set state to update
    this.setState({data: this.state.data});
  },
  // triggered with each keystroke
  handleItemChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {
    var todoItems = this.state.data.map(function(object, i) {
      return (
        <TodoItem text={object.text} status={object.status} delete={this.removeTodoItem} key={object.id} index={i} />
      );
    }, this);
    return (
      <div className="todoContainer">
        <h1>My Todo List</h1>
        <form onSubmit={this.addTodoItem}>
          <input
            type="text"
            placeholder="Add something to get done..."
            value={this.state.text}
            onChange={this.handleItemChange}
          />
          <input type="submit" value="Post" />
        </form>
        <ul>
          {todoItems}
        </ul>
      </div>
    );
  }
});


var TodoItem = React.createClass({
  getInitialState: function() {
    return { status: this.props.status };
  },
  toggleCompleted: function() {
    if (this.state.status === 'completed') {
      this.setState({status: 'incomplete'});
    } else {
      this.setState({status: 'completed'});
    }    
  },
  render: function() {
    return (
      <li className={this.state.status + ' noselect todoItem'} onClick={this.toggleCompleted}>
        {this.props.text}
        <div className="right" onClick={this.props.delete.bind(null, this.props.index)}>delete</div>
      </li>
    );
  }
});

ReactDOM.render(
  <TodoContainer url="/api/todos" />,
  document.getElementById('content')
);