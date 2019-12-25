import React, { Component } from 'react';

export default class EventSingleDoubleEffects extends Component{
  componentDidMount() {
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
  }

  render() {
    const {title1, title2, sub_title, image, video, video_image, sub_image} = this.props;

    return (
      <rs-module-wrap id="rev_slider_13_1_wrapper" data-alias="double-exposure-effect" data-source="gallery"
                      style={{
                        background: 'transparent',
                        padding: 0,
                        margin: '0px auto',
                        marginTop: 0,
                        marginBottom: 0
                      }}>
        <rs-module id="rev_slider_13_1" style={{display: 'none'}}>
          <rs-slides>
            <rs-slide data-key="rs-45" data-title="Slide" data-anim="ei:d;eo:d;s:800;r:0;t:fade;sl:d;">
              <img src={image} data-parallax="8" data-panzoom="d:3000;e:Power4.easeOut;ss:250;se:100;"
                   className="rev-slidebg" data-no-retina alt=""/>
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
                  style={{zIndex: 7, fontFamily: 'Roboto'}}
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
                    style={{zIndex: 8, fontFamily: 'Roboto', width: '100%'}}
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
                      style={{zIndex: 9, fontFamily: 'Roboto', display: 'inline-block'}}
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
                      style={{zIndex: 12, backgroundColor: 'rgba(0,0,0,0)', fontFamily: 'Roboto'}}
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
                      style={{zIndex: 10, fontFamily: 'Roboto', display: 'inline-block'}}
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
                      style={{zIndex: 13, backgroundColor: 'rgba(0,0,0,0)', fontFamily: 'Roboto'}}
                    />
                    {/*<a*/}
                    {/*  id="slider-13-slide-45-layer-7"*/}
                    {/*  className="rs-layer rev-btn"*/}
                    {/*  href="#" target="_blank"*/}
                    {/*  data-type="button"*/}
                    {/*  data-rsp_ch="on"*/}
                    {/*  data-xy="x:l,l,c,c;xo:0,93px,0,0;y:t,b,b,b;yo:0,100px,140px,130px;"*/}
                    {/*  data-text="w:normal,nowrap,nowrap,nowrap;s:15;l:46;fw:700;a:inherit;"*/}
                    {/*  data-margin="l:20,20,0,0;"*/}
                    {/*  data-padding="r:30;l:30;"*/}
                    {/*  data-frame_0="x:100%;o:1;tp:600;"*/}
                    {/*  data-frame_0_mask="u:t;x:-100%;"*/}
                    {/*  data-frame_1="tp:600;e:Power4.easeInOut;st:1000;sp:1500;sR:990;"*/}
                    {/*  data-frame_1_mask="u:t;"*/}
                    {/*  data-frame_999="x:-100%;o:1;tp:600;e:Power4.easeInOut;st:w;sp:750;sR:6500;"*/}
                    {/*  data-frame_999_mask="u:t;x:100%;"*/}
                    {/*  data-frame_hover="c:#2d3032;bgc:#fff;boc:#000;bor:0px,0px,0px,0px;bos:solid;oX:50;oY:50;"*/}
                    {/*  style={{zIndex:11,backgroundColor:'#2d3032',fontFamily:'Roboto',cursor:'pointer',display:'inline-block',outline:'none',boxShadow:'none',boxSizing:'border-box'}}*/}
                    {/*>*/}
                    {/*  HOW TO DOWNLOAD?*/}
                    {/*</a>*/}
                  </rs-column>
                </rs-row>
              </rs-zone>
              <rs-layer
                id="slider-13-slide-45-layer-1"
                class="rs-fsv rs-nolc rs-layer-video"
                data-type="video"
                data-rsp_ch="on"
                data-xy="x:0;y:0;"
                data-text="l:22;a:inherit;"
                data-dim="w:100%;h:100%;"
                data-basealign="slide"
                data-blendmode="overlay"
                data-video="vd:100;rwd:f;fc:true;l:true;ptimer:false;nse:f;sav:f;inl:f;"
                data-poster={video_image}
                data-mp4={video}
                data-frame_0="tp:600;"
                data-frame_1="tp:600;st:400;sp:2000;sR:400;"
                data-frame_999="o:0;tp:600;e:Power4.easeInOut;st:w;sp:1000;sR:6600;"
                style={{zIndex: 5, fontFamily: 'Roboto'}}
              />
              <rs-layer
                id="slider-13-slide-45-layer-3"
                class="rs-pxl-4"
                data-type="image"
                data-rsp_ch="on"
                data-xy="x:c;y:m;"
                data-text="l:22;a:inherit;"
                data-dim="w:['100%','100%','100%','100%'];h:['100%','100%','100%','100%'];"
                data-basealign="slide"
                data-blendmode="screen"
                data-frame_0="tp:600;"
                data-frame_1="tp:600;st:400;sp:2000;sR:400;"
                data-frame_999="o:0;tp:600;e:Power4.easeInOut;st:w;sp:1000;sR:6600;"
                style={{zIndex: 6, fontFamily: 'Roboto'}}
              >
                <img src={sub_image} width="1920" height="1080" data-c="cover-proportional" data-no-retina alt=""/>
              </rs-layer>
            </rs-slide>
          </rs-slides>
          <rs-progress class="rs-bottom" style={{visibility: 'hidden!important'}}/>
        </rs-module>
      </rs-module-wrap>
    );
  }
}