import React from 'react';

class Main extends React.Component{
    constructor(){
        super();
        this.state = {
            text : "happy every day!"
        };
        this.goLogin();
    }
    render(){
        return (
            <div className='containter'>
                <div className='main'>
                    <span></span>
                    <p>{this.state.text}<br/>即将进入系统，请稍后！</p>
                </div>
            </div>
        );
    }
    goLogin(){
        setTimeout(() => {
            this.props.history.push("/login");
        },3000);
    }
}

export default Main;