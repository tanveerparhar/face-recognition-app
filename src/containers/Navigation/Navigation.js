import React from 'react';
const Navigation = ({OnRouteChange,isSignedIn}) =>{
	if(isSignedIn === true) {
		return(
		 <nav style={{display: 'flex', justifyContent:'flex-end'}}>
		 <p className='f3 link dim black underline grow pa3 pointer'
            onClick={() => OnRouteChange('signout')}>
		    Sign Out
		 </p>
		 </nav>
         );
     }
     else {return(
           <nav style={{display: 'flex', justifyContent:'flex-end'}}>
		 <p className='f3 link dim black underline grow pa3 pointer'
            onClick={() => OnRouteChange('signin')}>
		    Sign In
		 </p>
		 <p className='f3 link dim black underline grow pa3 pointer'
            onClick={() => OnRouteChange('register')}>
		    Register
		 </p>
		 </nav>
		 );
     }
}
export default Navigation;