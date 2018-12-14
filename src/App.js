import React, { Component } from 'react';
import Navigation from './containers/Navigation/Navigation';
import Logo from './containers/Logo/Logo';
import Rank from './containers/Rank/Rank';
import ImageLinkForm  from './containers/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './containers/FaceRecognition/FaceRecognition';
import SignIn from './containers/SignIn/SignIn';
import Register from './containers/Register/Register';
import Particles from 'react-particles-js';
import './App.css';
//import Clarifai from 'clarifai';



const particleparams={
                particles: {
                  number:{
                    value:80,
                    density:{
                      enable:true,
                      value_area:900
                    }
                  }
                }
              };
const initialState = {
               input:'',
               imageUrl:'',
               box:{},
               route:'signin',
               isSignedIn:false,
               user:{
                      id:'',
                      name:'',
                      email:'',
                      entries:0,
                      joined:''
               }
               }              
class App  extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  OnRouteChange = (route) => {
   if(route === 'home')
   {this.setState({isSignedIn :true})}
   else //if(route === 'signout')
   { this.setState(initialState)
 }
   this.setState({route : route});
 }
  
  loadUser = (data) => {
       this.setState({user:{
                          id:data.id,
                          name:data.name,
                          email:data.email,
                          entries:data.entries,
                          joined:data.joined
                     }})

  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  oninputchange=(event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://lit-tor-15984.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input: this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://lit-tor-15984.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
       <Particles className='particles'
              params={particleparams}
            />
      <Navigation OnRouteChange={this.OnRouteChange} isSignedIn={this.state.isSignedIn}/>    
      { this.state.route === 'home'
       ?
        <div>
       <Logo />
       <Rank name={this.state.user.name} entries={this.state.user.entries}/>
       <ImageLinkForm oninputchange={this.oninputchange} 
                      onButtonSubmit={this.onButtonSubmit}/>
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
       :(this.state.route === 'signin'
        ? 
        <SignIn OnRouteChange={this.OnRouteChange} loadUser={this.loadUser}/>
       : <Register OnRouteChange={this.OnRouteChange} loadUser={this.loadUser}/>
        )
      }
      </div>
    );
  }
}

export default App;
