import React, { Component } from 'react'


export default class Conversor extends Component{
    
    constructor (props){
        super(props);

        this.state = {

            moedaDolar_valor: "",
            moedaReal_valor: 0,
        }

        this.convert = this.convert.bind(this);
        //bind() método que cria função que passa um objeto pra ser reconhecido
    }

    // metodo para converter os valores
    convert (){
        //criar metodo e colocar API
        /* Retorno 
        {
            "USD": {
                "code": "USD",
                "codein": "BRL",
                "name": "Dólar Comercial",
                "high": "5.2862",
                "low": "5.1839",
                "varBid": "-0.051",
                "pctChange": "-0.97",
                "bid": "5.2347",
                "ask": "5.2358",
                "timestamp": "1586290261",
                "create_date": "2020-04-07 17:11:04"
            }
        }   
        */
        let url =`https://economia.awesomeapi.com.br/json/all/USD-BRL`;
        //console.log(this.state.moedaDolar_valor);

        fetch(url)
        .then(res=>res.json())
        .then((data)=>{

            console.log(data.USD.high);

            let moedaReal_valor = (parseFloat(this.state.moedaDolar_valor)* data.USD.high ).toFixed(2);
            this.setState({moedaReal_valor});
            
        })
        }
    
    render() {

        return(
            <div className="conversor">
                <h2>{this.props.moedaDolar} para {this.props.moedaReal}</h2>
                <input type="text" onChange={(event)=>{this.setState({moedaDolar_valor:event.target.value})}}></input>
                <input type="button" value="Converte" onClick={this.convert}></input>
                <h2>Valor Convertido:{this.state.moedaReal_valor}</h2>

            </div>
        )
  
    } 
}