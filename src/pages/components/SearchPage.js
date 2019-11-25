import React from 'react';
import {SearchBar,WingBlank} from 'antd-mobile'

class SearchPage extends React.Component{
    constructor(){
        super();
        this.state = {
            keyValue : ""
        }
    }
    componentDidMount(){
        this.autoFocusInst.focus();      //自动聚焦
    }
    handleChange = (e) => {
        this.setState({keyValue : e});
    }
    render(){
        return (
            <div>
                <WingBlank>
                    <SearchBar placeholder='搜一搜' value={this.state.keyValue} onChange={this.handleChange} ref={ref => this.autoFocusInst = ref} maxLength={200}/>
                </WingBlank>
                <p>sdadsadada</p>
            </div>
        )
    }
}

export default SearchPage;