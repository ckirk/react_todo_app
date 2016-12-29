var data = [  
  {key: 0, text: 'Buy milk', status: 'completed'}, 
  {key: 1, text: 'Call Sharon back', status: ''},
  {key: 2, text: 'Mow the lawn', status: ''} 
];

var test = 'test';

var TodoContainer = React.createClass({
  getInitialState: function() {
    return { text: '', data: data };
  },
  addTodoItem: function(e) {
    e.preventDefault();

    // push to list
    var nextKey = this.state.data.length + 1;
    this.state.data.push({key: nextKey, text: this.state.text});

    // clear input box
    this.setState({text: ''});
  },
  removeTodoItem: function(index) {
    this.state.data.splice(index, 1);

    // set state to update
    this.setState({data: this.state.data});
  },
  handleItemChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {
    var todoItems = this.state.data.map(function(object, i) {
      return (
        <TodoItem text={object.text} status={object.status} delete={this.removeTodoItem} key={object.key} index={i} />
      );
    }, this);
    return (
      <div className="todoContainer">
        <h1>{this.props.title}</h1>
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
  <div>
    <TodoContainer title="Activatr Todo List" data={data} />
  </div>,
  document.getElementById('content')
);