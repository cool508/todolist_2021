import React from 'react';
import { TextField, Typography, Button, List, ListItem, ListItemText} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';

import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      todoList: [],
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null
    }
  }
  checkValidate(){
    const { 
      title, content, startDate, startTime, endDate, endTime 
    } = this.state;
    if (!title || !content || !startDate || !startTime || !endDate || !endTime) {
      return false
    }
    return true
  }


saveTodoList() {
  if (this.checkValidate()) {
    const {todoList, title, content, startDate, startTime, endDate, endTime} = this.state;
    todoList.push({title: title.trim(), content: content.trim(), startDate, startTime, endDate, endTime});
    this.setState({
      todoList: todoList,
      // title: "",
      // content: "",
      // startDate: null,
      // startTime: null,
      // endDate: null,
      // endTime: null
      });
  }else {
      alert("입력값을 확인해 주세요.")
  }
}
  render() {
    return (
      <div className="App">
        <div className="header">TODO LIST</div>
        <div className="input_area"> 
          {/* 인풋 영역 */}
          <TextField label="제목" size="normal" margin="normal" fullWidth required 
            value={this.state.title}
            onChange = {
              (e) => this.setState({title:e.target.value})
            }
          />
          <TextField label="상세내용" size="normal" margin="normal" fullWidth multiline 
            value={this.state.content}
            onChange = {
              (e) => this.setState({content:e.target.value})
            }
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy/MM/DD"
            margin="normal"
            label="시작 예정일"
            value={this.state.startDate}
            onChange={(value) => {
                this.setState({startDate:value})
              }
            } 
            style = {{width: '50%'}}     
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            label="시작시간"
            variant="inline"
            value={this.state.startTime}
            onChange={(value) => {
                this.setState({startTime:value})
              }
            }   
            style = {{width: '50%'}}   
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy/MM/DD"
            margin="normal"
            label="종료 예정일"
            value={this.state.endDate}
            onChange={(value) => this.setState({endDate:value})}
            style= {{ width: '50%' }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            variant="inline"
            margin="normal"
            label="종료 시간"
            value={this.state.endTime}
            onChange={(value) => this.setState({endTime:value})}
            style= {{ width: '50%' }}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <Button 
            variant="outlined"
            startIcon={<SaveIcon />}
            style={{float: 'right'}}
            onClick={() => this.saveTodoList()}
          >
            Save
          </Button>
        </div>
        <div className="list_area">
          {/* 리스트 영역 */}
          <List>
            {this.state.todoList.map((todoItem, idx) => {
              const {
                title, content, startDate, startTime, endDate, endTime
              } = todoItem;
              return (
                <ListItem key={ idx } role={undefined} dense button>
                  <ListItemText 
                  primary={title}
                  secondary={
                    startDate?.format('yyyy-MM-DD')+' '+startTime?.format('HH:MM')+' ~ '+endDate?.format('yyyy-MM-DD')+' '+endTime?.format('HH:MM')}
                  />
                </ListItem>
              )
            })}
          </List>
        </div>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © JB '+new Date().getFullYear()+'.'}         
        </Typography>
      </div>
    );
  }

}

export default App;
