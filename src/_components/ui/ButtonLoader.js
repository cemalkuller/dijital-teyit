import React, { Component } from "react";

export default class ButtonLoader extends Component {
  state = {
    loading: this.props.loading
  };

  componentDidUpdate(prevProps) {
      console.log(prevProps);
    if(this.props.loading != prevProps.loading)
    {
      
        this.setState({
            loading: prevProps.loading
        });

    }
  } 

  render() {
    const loading  =  this.props.loading;

    return (
        <button className={this.props.className} disabled={loading}>
          {loading && (
            <i
              className="fa fa-circle-o-notch  fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>Lütfen Bekleyiniz</span>}
          {!loading && <span>{this.props.text}</span>}
        </button>
    );
  }
}

export default ButtonLoader