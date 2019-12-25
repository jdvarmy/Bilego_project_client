import React from 'react';
import styled from 'styled-components';
import NoDramaLama from './No-Drama-Lama.jpg';

// https://revolution.themepunch.com/404-error-page-template/
const Wrapper = styled.div`
  min-height: 533px;
`;

class Page404 extends React.Component{
  componentDidMount() {
    const slider = document.getElementById('rev_slider_16_1');

    if(window.$(slider).revolution !== undefined) {
      window.$(slider).show().revolution({
        sliderType:"hero",
        jsFileLocation:"scripts/",
        sliderLayout:"fullscreen",
        visibilityLevels:"1240,1024,778,480",
        gridwidth:"1240,1024,778,480",
        gridheight:"868,768,960,720",
        minHeight:"",
        responsiveLevels:"1240,1024,778,480",
        fullScreenOffset:"60px",
        disableProgressBar:"on",
        navigation: {
          onHoverStop:false
        },
        parallax: {
          levels:[2,4,6,4,5,30,35,40,45,46,47,48,49,50,51,55],
          type:"mouse",
          origo:"slidercenter",
          speed:2000
        },
        fallbacks: {
          allowHTML5AutoPlayOnAndroid:true
        },
      })
    }
  }
  
  render(){
    return(
      <Wrapper>
        <rs-module-wrap id="rev_slider_16_1_wrapper" data-alias="404-error-page" data-source="gallery" style={{background:'transparent',padding:0}}>
          <rs-module id="rev_slider_16_1" style={{display:'none'}}>
            <rs-slides>
              <rs-slide data-key="rs-51" data-title="Slide" data-anim="ei:d;eo:d;s:600;r:0;t:fade;sl:d;">
                <img src={NoDramaLama} data-parallax="off" className="rev-slidebg" data-no-retina />
                  <rs-layer
                    id="slider-16-slide-51-layer-3"
                    className="tp-imgopacity rs-pxl-1"
                    data-type="image"
                    data-rsp_ch="on"
                    data-xy="x:c;y:m;"
                    data-text="l:22;a:inherit;"
                    data-dim="w:['100%','100%','100%','100%'];h:['100%','100%','100%','100%'];"
                    data-basealign="slide"
                    data-frame_0="tp:600;blu:10px;"
                    data-frame_1="tp:600;st:200;sp:2000;sR:200;blu:0px;"
                    data-frame_999="o:0;tp:600;st:w;sR:6800;"
                    data-loop_0="x:-5;"
                    data-loop_999="x:5;sp:2000;e:Power1.easeInOut;yym:t;yys:t;yyf:t;"
                    style={{zIndex:5,opacity:'0.5 !important'}}
                  ><img src={NoDramaLama} width="1920" height="1823" data-c="cover-proportional" data-no-retina />
                  </rs-layer>
                  <rs-layer
                    id="slider-16-slide-51-layer-5"
                    className="tp-imgopacity rs-pxl-2"
                    data-type="image"
                    data-rsp_ch="on"
                    data-xy="x:c;y:m;"
                    data-text="l:22;a:inherit;"
                    data-dim="w:['100%','100%','100%','100%'];h:['100%','100%','100%','100%'];"
                    data-basealign="slide"
                    data-frame_0="tp:600;blu:10px;"
                    data-frame_1="tp:600;st:300;sp:2000;sR:300;blu:0px;"
                    data-frame_999="o:0;tp:600;st:w;sR:6700;"
                    data-loop_0="y:-5;"
                    data-loop_999="y:5;sp:2000;e:Power1.easeInOut;yym:t;yys:t;yyf:t;"
                    style={{zIndex:6,opacity:'0.5 !important'}}
                  ><img src={NoDramaLama} width="1920" height="1823" data-c="cover-proportional" data-no-retina />
                  </rs-layer>
                  <rs-layer
                    id="slider-16-slide-51-layer-7"
                    className="tp-imgopacity rs-pxl-3"
                    data-type="image"
                    data-rsp_ch="on"
                    data-xy="x:c;y:m;"
                    data-text="l:22;a:inherit;"
                    data-dim="w:['100%','100%','100%','100%'];h:['100%','100%','100%','100%'];"
                    data-basealign="slide"
                    data-frame_0="tp:600;blu:10px;"
                    data-frame_1="tp:600;st:400;sp:2000;sR:400;blu:0px;"
                    data-frame_999="o:0;tp:600;st:w;sR:6600;"
                    data-loop_0="xR:15px;yR:15px;oX:50;oY:50;"
                    data-loop_999="xR:15px;yR:15px;crd:t;sp:10000;yys:t;yyf:t;"
                    style={{zIndex:7,opacity:'0.5 !important'}}
                  ><img src={NoDramaLama} width="1920" height="1823" data-c="cover-proportional" data-no-retina />
                  </rs-layer>
                  <rs-layer
                    id="slider-16-slide-51-layer-14"
                    className="rs-pxl-1"
                    data-type="text"
                    data-color="rgba(255,0,255,1)"
                    data-xy="x:c;y:m;yo:-67px,-67px,-47px,-67px;"
                    data-text="s:250,250,200,150;l:250,250,200,150;fw:700;a:center;"
                    data-rsp_o="off"
                    data-rsp_bd="off"
                    data-frame_0="sX:2;tp:600;blu:20px;"
                    data-frame_1="tp:600;st:800;sp:2000;sR:800;"
                    data-frame_999="o:0;tp:600;st:w;sR:6200;"
                    data-loop_0="xR:2px;yR:2px;oX:50;oY:50;"
                    data-loop_999="xR:2px;yR:2px;crd:t;sp:3000;yys:t;yyf:t;"
                    style={{zIndex:8,letterSpacing:'-10px'}}
                  >404
                  </rs-layer>
                  <rs-layer
                    id="slider-16-slide-51-layer-13"
                    className="rs-pxl-1"
                    data-type="text"
                    data-color="rgba(255,255,0,1)"
                    data-xy="x:c;xo:-3px;y:m;yo:-70px,-70px,-50px,-70px;"
                    data-text="s:250,250,200,150;l:250,250,200,150;fw:700;a:center;"
                    data-rsp_o="off"
                    data-rsp_bd="off"
                    data-frame_0="sX:2;tp:600;blu:20px;"
                    data-frame_1="tp:600;st:700;sp:2000;sR:700;"
                    data-frame_999="o:0;tp:600;st:w;sR:6300;"
                    data-loop_0="xR:2px;yR:2px;oX:50;oY:50;"
                    data-loop_999="xR:2px;yR:2px;crd:t;sp:3000;yys:t;yyf:t;"
                    style={{zIndex:9,letterSpacing:'-10px'}}
                  >404
                  </rs-layer>
                  <rs-layer
                    id="slider-16-slide-51-layer-12"
                    className="rs-pxl-1"
                    data-type="text"
                    data-color="rgba(0,255,255,1)"
                    data-xy="x:c;xo:3px;y:m;yo:-70px,-70px,-50px,-70px;"
                    data-text="s:250,250,200,150;l:250,250,200,150;fw:700;a:center;"
                    data-rsp_o="off"
                    data-rsp_bd="off"
                    data-frame_0="sX:2;tp:600;blu:20px;"
                    data-frame_1="tp:600;st:600;sp:2000;sR:600;"
                    data-frame_999="o:0;tp:600;st:w;sR:6400;"
                    data-loop_0="xR:2px;yR:2px;oX:50;oY:50;"
                    data-loop_999="xR:2px;yR:2px;crd:t;sp:3000;yys:t;yyf:t;"
                    style={{zIndex:10,letterSpacing:'-10px'}}
                  >404
                  </rs-layer>
                  <rs-layer
                    id="slider-16-slide-51-layer-11"
                    className="rs-pxl-1"
                    data-type="text"
                    data-color="rgba(255,255,255,1)"
                    data-xy="x:c;y:m;yo:-70px,-70px,-50px,-70px;"
                    data-text="s:250,250,200,150;l:250,250,200,150;fw:700;a:center;"
                    data-rsp_o="off"
                    data-rsp_bd="off"
                    data-frame_0="sX:2;tp:600;blu:20px;"
                    data-frame_1="tp:600;st:500;sp:2000;sR:500;"
                    data-frame_999="o:0;tp:600;st:w;sR:6500;"
                    style={{zIndex:11,letterSpacing:'-10px'}}
                  >404
                  </rs-layer>
                  <rs-layer
                    id="slider-16-slide-51-layer-2"
                    className="rs-pxl-1"
                    data-type="text"
                    data-color="rgba(255,255,255,1)"
                    data-xy="x:c;y:m;yo:55px,55px,65px,15px;"
                    data-text="s:50,50,40,30;l:50,50,40,30;fw:700;a:inherit;"
                    data-rsp_o="off"
                    data-rsp_bd="off"
                    data-frame_0="sX:2;tp:600;blu:20px;"
                    data-frame_1="tp:600;st:900;sp:2000;sR:900;"
                    data-frame_999="o:0;tp:600;st:w;sR:6100;"
                    style={{zIndex:12}}
                  >PAGE NOT FOUND
                  </rs-layer>
              </rs-slide>
            </rs-slides>
            <rs-progress className="rs-bottom" style={{visibility: 'hidden !important'}} />
          </rs-module>
        </rs-module-wrap>
      </Wrapper>
    );
  }
}

export default Page404;
