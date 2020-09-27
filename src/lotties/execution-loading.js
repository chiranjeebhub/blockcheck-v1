import React, {Component} from 'react';
import Lottie from 'react-lottie';
import * as animatedData from './coin-stack'
const ExecutionLoading = () =>{
    let animate = null;
    animate = animatedData.default;
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animate,
        rendererSettings:
            {
                preserveAspectRatio: 'xMidYMid slice'
            }
    };
    return(
        <React.Fragment>
            <Lottie height={120} width={160} options={defaultOptions}/>
        </React.Fragment>
    )

}

export default ExecutionLoading;
