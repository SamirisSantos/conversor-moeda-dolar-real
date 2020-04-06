import React, { Component } from 'react'


export default class Conversor extends Component{
    
    constructor (props){
        super(props);

        this.state = {

            moedaDolar_valor: "",
            moedaReal_valor: 0,
        }

        this.converter = this.converter.bind(this);
    }

    converter (){
        console.log(this.state)
        //criar metodo e colocar API
    }
    
    render() {

        return(
            <div className="conversor">
                <h2>{this.props.moedaDolar} para {this.props.moedaReal}</h2>
                <input type="text" onChange={(event)=>{this.setState({moedaDolar_valor:event.target.value})}}></input>
                <input type="button" value="Converte" onClick={this.converter}></input>
                <h2>Valor Convertido:</h2>
            </div>
        )
  
    } 
}