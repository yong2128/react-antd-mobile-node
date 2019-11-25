import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreator from '../store/actionCreator';
import { TabBar, NavBar, Icon} from 'antd-mobile' ;
import Home from './components/Home';
import SearchPage from './components/SearchPage';
import My from './components/My';

class Index extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedTab : 'home',
            tabs : [
                {title : "首页",key : 1,selected : 'home',url : 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',sUrl : 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'},
                {title : "发现",key : 2,selected : 'search',url : 'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',sUrl : 'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg'},
                {title : "我的",key : 3,selected : 'my',url : 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',sUrl : 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg'},
            ],
            clickIndex : 1,
            hidden : false
        }
    }
    handleTabs = (e) => {
        this.setState({
            clickIndex : e.key
        });
        this.props.saveIndexOfCurrentPage(e.key);
    }
    handlePress(val){
        this.setState({
            selectedTab: val.selected,
            clickIndex : val.key
        });
        this.props.saveIndexOfCurrentPage(val.key);    //在redux中存储当前页面的key即下标，用于返回当前页面
    }
    componentWillMount(){
        this.setState({
            clickIndex : this.props.clickIndexOfCurrent      //this.props.clickIndex 是存储在redux中的下标，是mapStateToProps()方法中定义的值
        });
    }
    render(){
        return(
            <div className='home'>
                <NavBar mode="light" leftContent={[<Icon key='3' type='left'/>]} onLeftClick={() => console.log('onLeftClick')} rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />]}> {this.state.clickIndex === 1 ? '首页' : this.state.clickIndex === 2 ? '发现' : '我的'}
                </NavBar>
                <TabBar unselectedTintColor='#334422' tintColor='#33A3F4' barTintColor='white' hidden={this.state.hidden}>
                    {this.state.tabs.map(val => (
                        <TabBar.Item title={val.title} key={val.key} icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background : `url(` + val.url + `) center center /  21px 21px no-repeat`
                            }}/>
                        } selectedIcon={
                            <div style={{
                                width : '22px',
                                height: '22px',
                                background: 'url(' + val.sUrl + ') center center /  21px 21px no-repeat'
                            }}/>
                        }
                        selected={val.key === this.state.clickIndex}
                        onPress={this.handlePress.bind(this,val)}>
                        {this.state.clickIndex === 1 ? <Home/> : (this.state.clickIndex === 2 ? <SearchPage/> : <My history={this.props.history}/>)}
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        clickIndexOfCurrent : state.context.currentIndex
    }
}

export default connect(mapStateToProps,dispatch => bindActionCreators(actionCreator,dispatch))(Index);