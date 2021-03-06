import React, { Component } from 'react';
import AllCountries  from './components/pickCountry'
import Graphs from './components/chart'
import More from './components/moreinfo'
import Paperdetail from './components/paper'
import {getDailyDataGlobal} from './getApiData/'
import { getCountryData } from "./getApiData/"
//  const divStyle=  {
//    display: 'flex',
//    flexDirection: 'column',
//    alignItems: 'center'
//  }


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      country:"",
      data:{},
      windowidth:window.innerWidth
    };
  }
  handleChange= async (nation)=>{
    const global="Global"
    if(nation===global){
      this.globaldata()
    }else{
    
      const CountryData = await getCountryData(nation)
    this.setState({
      country: nation,
      data:CountryData
    })
  }
    
  }

   globaldata=async ()=>{
    const fetchedGlobal= await getDailyDataGlobal()
    this.setState({data:fetchedGlobal,country:""})
  }
  handleResize=()=>{
    this.setState({ windowidth: window.innerWidth });
  }
 
  async componentDidMount(){
     this.globaldata();
     window.addEventListener('resize', this.handleResize);
    }
  componentDidUpdate(){
    const checkChoice= this.state.country
    console.log(checkChoice)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
 
  render() {
    const country= this.state.country
    const data= this.state.data
    console.log(data)
    const imgStyle={
      width:"100%",
      height:"50%",
      marginBottom:"10px",
      marginRight: "auto",
      marginLeft: "auto",
      display:"block",

    }
    const imgCenter={
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom:"10px",
      width: "60%"
    }
    const divStyle={
      display:"flex",
      justifyContent:"center",
      flexDirection:"column"

    }
    return (
    
              <div style={divStyle}>
                <img  src={require('./images/banna1.jpg')} style={this.state.windowidth>700?imgCenter:imgStyle} alt=""/>
                <Paperdetail data={data}/>
                <AllCountries handleChange={this.handleChange}/>
                <Graphs country={country} data={data}/>
                <div>
                  <h4>For more info:</h4>
                  <More/>                
                </div>
              </div>
          
    );
  }
}


export default App
