import React, { Component } from 'react';
import './Conversor.css';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FormGroup, Label, Col, Button } from 'reactstrap';
import { CardBody, Card, Container } from 'reactstrap';

// estilo https://reactstrap.github.io/

export default class Conversor extends Component{
    
    constructor (props){
        super(props);

        this.state = {
           
            moedaDolar_valor: "-",
            moedaReal_valor: "-",
            moedaDolar_imposto: "-",
            moedaReal_imposto: "-",
            taxa: "",
            iof: "-",
            //iof_cartao: 0.0064 , // IOF cartão 6.4%
            //iof_dinheiro: 0.011 , // IOF cartão 1,1%
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
            //let moedaReal_valor = (parseFloat(parseFloat(this.state.moedaDolar_valor * cotacao))).toFixed(2);

            let moedaReal_valor =  (parseFloat((parseFloat((this.state.moedaDolar_valor * cotacao) * (parseFloat( this.state.iof / 100)))) + (parseFloat(this.state.moedaDolar_valor * cotacao)))).toFixed(2);
            

            let moedaDolar_imposto = (parseFloat((parseFloat(this.state.moedaDolar_valor)) + (this.state.moedaDolar_valor * (this.state.taxa/100)))).toFixed(2);
            let moedaReal_imposto =  (parseFloat((parseFloat((moedaDolar_imposto * cotacao) * (parseFloat( this.state.iof / 100)))) + (parseFloat(moedaDolar_imposto * cotacao)))).toFixed(2);
            
            
            
            this.setState({moedaDolar_imposto});
            this.setState({moedaReal_valor});
            this.setState({moedaReal_imposto});
            this.setState({cotacao});
            
        })
        }
    
    render() {

        return(
            <div className="conversor">
                <Container className="themed-container">
                <br/>
                <h2>Conversão {this.props.moedaDolar} - {this.props.moedaReal}</h2>
                <br/>
                <Col sm={10}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Valor em Dolár" onChange={(event)=>{this.setState({moedaDolar_valor:event.target.value})}} block />
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Taxa do estado USA" onChange={(event)=>{this.setState({taxa:event.target.value})}} block />
                </InputGroup>
                <br/>
                </Col>
                <h4>Forma de Pagamento</h4> 
                <Col sm={10}>
                <FormGroup check>
                    <Label check><Input type="radio" value="1.1" name="iof" checked={this.state.iof === "1.1"} onChange={(event)=>{this.setState({iof:event.target.value})}}/> Dinheiro</Label>                 
                </FormGroup>
                <FormGroup check>
                    <Label check><Input type="radio" value="6.4" name="iof" checked={this.state.iof === "6.4"} onChange={(event)=>{this.setState({iof:event.target.value})}}/> Cartão</Label>                 
                </FormGroup>
                </Col>
                <br/>
                <Button color="primary"  value="Converte" style={{ marginBottom: '1rem' }} onClick={this.convert} block>Converter</Button>
               
                    <Card>
                        <CardBody>
                            <p>Cotação Dolar: {this.state.cotacao}</p>
                            <p>IOF: {this.state.iof}%</p>
                            <p>Total em dólar sem imposto: {this.state.moedaDolar_valor} </p>
                            <p>Total em dólar com imposto: {this.state.moedaDolar_imposto}</p>
                            <p>Total em real sem imposto: {this.state.moedaReal_valor}</p>
                            <p>Total em real com imposto: {this.state.moedaReal_imposto}</p>
                        </CardBody>
                    </Card>
              
                
                <br/>
    
                </Container>
            </div>
        )
  
    } 
}