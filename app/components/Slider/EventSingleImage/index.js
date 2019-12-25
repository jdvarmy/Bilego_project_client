import React from 'react';

export default class EventSingleDoubleEffects extends React.Component {
  componentDidMount = () => {
    const slider = document.getElementById('rev_slider_13_1');

    if(window.$(slider).revolution !== undefined) {
      window.$(slider).show().revolution({
        sliderType:"hero",
        jsFileLocation:"scripts/",
        visibilityLevels:"1240,1024,778,480",
        gridwidth:"1240,1024,778,480",
        gridheight:"590,500,480,480",
        minHeight:"",
        editorheight:"590,500,480,480",
        responsiveLevels:"1240,1024,778,480",
        disableProgressBar:"on",
        navigation: {
          onHoverStop:false
        },
        parallax: {
          levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,55],
          type:"scroll",
          origo:"slidercenter"
        },
        fallbacks: {
          allowHTML5AutoPlayOnAndroid:true
        },
      })
    }
  };

  render() {
    const {image, title1, title2, sub_title} = this.props;

    return (
      <rs-module-wrap id="rev_slider_13_1_wrapper" data-alias="double-exposure-effect" data-source="gallery"
                      style={{background:'transparent',padding:0,margin:'0px auto',marginTop:0,marginBottom:0}}>
        <rs-module id="rev_slider_13_1" style={{display:'none'}}>
          <rs-slides>
            <rs-slide data-key="rs-45" data-title="Slide" data-anim="ei:d;eo:d;s:800;r:0;t:fade;sl:d;">
              <img src={image} data-parallax="8" data-panzoom="d:3000;e:Power4.easeOut;ss:250;se:100;" className="rev-slidebg" data-no-retina  alt=""/>
              <rs-zone id="rrzb_45" class="rev_row_zone_bottom" style={{zIndex: 7}}>
                <rs-row
                  id="slider-13-slide-45-layer-9"
                  data-type="row"
                  data-xy="xo:100px;y:b;"
                  data-text="l:22;a:inherit;"
                  data-rsp_bd="off"
                  data-margin="b:130,100,100,80;"
                  data-frame_0="tp:600;"
                  data-frame_1="tp:600;sR:10;"
                  data-frame_999="o:0;tp:600;st:w;sR:8690;sA:9000;"
                  style={{zIndex:7,fontFamily:'Roboto'}}
                >
                  <rs-column
                    id="slider-13-slide-45-layer-10"
                    data-type="column"
                    data-xy="xo:100px;yo:100px;"
                    data-text="l:22;a:inherit,inherit,center,center;"
                    data-rsp_bd="off"
                    data-column="w:100%;"
                    data-padding="r:50,50,50,20;l:50,50,50,20;"
                    data-frame_0="tp:600;"
                    data-frame_1="tp:600;"
                    data-frame_999="o:0;tp:600;st:w;sR:8690;sA:9000;"
                    style={{zIndex:8,fontFamily:'Roboto',width:'100%'}}
                  >
                    <rs-layer
                      id="slider-13-slide-45-layer-5"
                      data-type="text"
                      data-color="#2d3032"
                      data-rsp_ch="on"
                      data-xy="x:l,l,c,c;xo:0,73px,0,0;y:t,b,b,b;yo:0,230px,270px,250px;"
                      data-text="w:normal;s:100,100,70,50;l:80,80,60,40;ls:-7px,-7px,-5px,-3px;fw:700;a:inherit,inherit,center,center;"
                      data-dim="w:auto,auto,480px,360px;"
                      data-padding="t:10;r:20;l:13;"
                      data-frame_0="x:100%;o:1;tp:600;"
                      data-frame_0_mask="u:t;x:-100%;"
                      data-frame_1="tp:600;e:Power4.easeInOut;st:500;sp:2000;sR:490;"
                      data-frame_1_mask="u:t;"
                      data-frame_999="x:-100%;o:1;tp:600;e:Power4.easeInOut;st:w;sp:750;sR:6500;"
                      data-frame_999_mask="u:t;x:100%;"
                      style={{zIndex:9,fontFamily:'Roboto',display:'inline-block'}}
                    >
                      {title1}<br/>{title2}
                    </rs-layer>
                    <rs-layer
                      id="slider-13-slide-45-layer-12"
                      class="tp-shape tp-shapewrapper"
                      data-type="shape"
                      data-rsp_ch="on"
                      data-text="w:normal;a:inherit;"
                      data-dim="w:100%;h:20px,20px,10px,10px;"
                      data-frame_0="tp:600;"
                      data-frame_1="tp:600;"
                      data-frame_999="o:0;tp:600;st:w;sR:8690;"
                      style={{zIndex:12,backgroundColor:'rgba(0,0,0,0)',fontFamily:'Roboto'}}
                    />
                    <rs-layer
                      id="slider-13-slide-45-layer-6"
                      data-type="text"
                      data-color="#2d3032"
                      data-rsp_ch="on"
                      data-xy="x:l,l,c,c;xo:0,72px,0,0;y:t,b,b,b;yo:0,190px,230px,210px;"
                      data-text="w:normal;l:20;fw:700;a:inherit,inherit,center,center;"
                      data-dim="w:auto,auto,480px,360px;"
                      data-padding="t:5;r:20;l:20;"
                      data-frame_0="x:100%;o:1;tp:600;"
                      data-frame_0_mask="u:t;x:-100%;"
                      data-frame_1="tp:600;e:Power4.easeInOut;st:500;sp:2000;sR:490;"
                      data-frame_1_mask="u:t;"
                      data-frame_999="x:-100%;o:1;tp:600;e:Power4.easeInOut;st:w;sp:750;sR:6500;"
                      data-frame_999_mask="u:t;x:100%;"
                      style={{zIndex:10,fontFamily:'Roboto',display:'inline-block'}}
                    >
                      {sub_title}
                    </rs-layer>
                    <rs-layer
                      id="slider-13-slide-45-layer-13"
                      class="tp-shape tp-shapewrapper"
                      data-type="shape"
                      data-rsp_ch="on"
                      data-text="w:normal;a:inherit;"
                      data-dim="w:100%;h:40px,40px,30px,30px;"
                      data-frame_0="tp:600;"
                      data-frame_1="tp:600;"
                      data-frame_999="o:0;tp:600;st:w;sR:8690;"
                      style={{zIndex:13,backgroundColor:'rgba(0,0,0,0)',fontFamily:'Roboto'}}
                    />
                  </rs-column>
                </rs-row>
              </rs-zone>
            </rs-slide>
          </rs-slides>
          <rs-progress class="rs-bottom" style={{visibility: 'hidden!important'}} />
        </rs-module>
      </rs-module-wrap>
    );
  }
}