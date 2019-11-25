import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreator from '../store/actionCreator';
import { Tabs, NavBar, Icon} from 'antd-mobile' ;
import Home from './components/Home';
import SearchPage from './components/SearchPage';
import My from './components/My';

class Index extends React.Component{
    constructor(){
        super();
        this.state = {
            tabs : [
                {title : "首页",key : 0},
                {title : "发现",key : 1},
                {title : "我的",key : 2},
            ],
            clickIndex : 0
        }
    }
    handleTabs = (e) => {
        this.setState({
            clickIndex : e.key
        });
        this.props.saveIndexOfCurrentPage(e.key);
    }
    render(){
        return(
            <div className='home'>
                <NavBar mode="light" leftContent={[<Icon key='3' type='left'/>]} onLeftClick={() => console.log('onLeftClick')} rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />]}> {this.state.clickIndex === 0 ? '首页' : this.state.clickIndex === 1 ? '发现' : '我的'}
                </NavBar>
                <Tabs tabs={this.state.tabs} initialPage={this.state.clickIndex} tabBarPosition='bottom' onTabClick={this.handleTabs} onChange={this.handleTabs}>
                    <div className='contentIndex'>
                        {this.state.clickIndex === 0 ? <Home/> : this.state.clickIndex === 1 ? <SearchPage/> : <My/>}
                    </div>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        clickIndex : state.context.currentIndex
    }
}

export default connect(mapStateToProps,dispatch => bindActionCreators(actionCreator,dispatch))(Index);