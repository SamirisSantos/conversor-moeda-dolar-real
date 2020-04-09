import React, { Component } from 'react';
import './Conversor.css';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FormGroup, Label, Col, Button } from 'reactstrap';

export default class Conversor extends Component{
    
    constructor (props){
        super(props);

        this.state = {
           
            moedaDolar_valor: "",
            moedaReal_valor: "",
            moedaDolar_imposto: "",
            taxa: "",
            iof_cartao: 0.0064 , // IOF cartão 6.4%
            iof_dinheiro: 0.011 , // IOF cartão 1,1%
            buy_cartao: "",
            buy_dinheiro: "",
            cotacao: "",

        
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
            // comprando com dinheiro: [(dólar) + (taxa)] x ( dólar + IOF dinheiro)
            // Comprando com cartão: [(dólar) + (taxa) + (IOF cartao)] x (dólar)
            
            let cotacao = (parseFloat(data.USD.high)).toFixed(2);
            let moedaReal_valor = (parseFloat(this.state.moedaDolar_valor * cotacao)).toFixed(2);
            let moedaDolar_imposto = (parseFloat((parseFloat(this.state.moedaDolar_valor)) + (this.state.moedaDolar_valor * (this.state.taxa/100)))).toFixed(2);

            //let moedaDolar_imposto = (parseFloat(this.state.moedaDolar_valor * this.state.taxa)).toFixed(2);
            
            this.setState({moedaDolar_imposto})
            this.setState({moedaReal_valor});
            this.setState({cotacao});
            
        })
        }
    
    render() {

        return(
            <div className="conversor">
                <h2>{this.props.moedaDolar} para {this.props.moedaReal}</h2>
                <Col sm={10}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Valor em Dolár" onChange={(event)=>{this.setState({moedaDolar_valor:event.target.value})}}  />
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Taxa do estado USA" onChange={(event)=>{this.setState({taxa:event.target.value})}} />
                </InputGroup>
                <br/>
                </Col>
                <h4>Forma de Pagamento</h4> 
                <Col sm={10}>
                <FormGroup check>
                    <Label check><Input type="radio" name="dinheiro"/> Dinheiro - IOF 1,1% </Label>                 
                </FormGroup>
                <FormGroup check>
                
                    <Label check><Input type="radio" name="cartao"/> Cartão - IOF 6,1% </Label>                 
                </FormGroup>
                </Col>
                <br/>
                <Button color="primary" value="Converte" onClick={this.convert}>Converter</Button>
                <br/>
                
                <p>Cotação Dolar: {this.state.cotacao}</p>
                <p>IOF:</p>
                <p>Total em dólar sem imposto: {this.state.moedaDolar_valor} </p>
                <p>Total em dólar com imposto: {this.state.moedaDolar_imposto}</p>
                <p>Total em real sem imposto: {this.state.moedaReal_valor}</p>
                <p>Total em real com imposto:</p>
                
               
            </div>
        )
  
    } 
}