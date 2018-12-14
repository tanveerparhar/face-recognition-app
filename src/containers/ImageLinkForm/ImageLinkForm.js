import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({oninputchange,onButtonSubmit})=> {
	return (
    <div className='f3 pa4'>
             <p>{'This Magic Brain will detect faces, Try it....'}</p>
              <div className='center'>
                 <div className='form pa3 shadow-5 f4'>
                 <input className='w-70  pa0 b--dark-green' type='text' onChange={oninputchange} />
                 <button className='w-30 br2 grow link ph2 pv0 dib b bg-gold dark-green' 
                         onClick={onButtonSubmit}>DETECT</button>
                 </div>
               </div>
    </div>
		);
}
export default ImageLinkForm;