import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';

let sliderLayer = 1;

@withRouter
@inject('sliderStore', 'globalStore')
@observer
class MainSlider extends React.Component {
  componentDidMount = async () => {
    const {globalStore: {baseNameForRouting}, sliderStore:{getMainSlides, setRevapi}} = this.props;
    await getMainSlides({city: baseNameForRouting});

    const slider = document.getElementById('rev_slider_18_1');
    if (window.$(slider).revolution !== undefined) {
      const sliderApi = window.$(slider).show().revolution({
        jsFileLocation:"scripts/",
        sliderLayout:"auto",
        visibilityLevels:"1240,1024,778,480",
        gridwidth:"1240,1024,778,480",
        gridheight:"590,490,960,720",
        minHeight:"",
        editorheight:"590,490,960,720",
        responsiveLevels:"1240,1024,778,480",
        disableProgressBar:"on",
        navigation: {
          keyboardNavigation:true,
          keyboard_direction:"vertical",
          onHoverStop:false
        },
        parallax: {
          levels:[5,10,15,20,25,30,35,40,45,46,47,48,49,50,51,55],
          type:"mouse",
          origo:"slidercenter"
        },
        fallbacks: {
          allowHTML5AutoPlayOnAndroid:true
        },
      });

      setRevapi(sliderApi);
    }

    console.log('slider')
  };

  componentDidUpdate = async (prevProps) => {
    if(prevProps.location.key !== this.props.location.key){
      const slider = document.getElementById('rev_slider_18_1');

    }
  };

  renderPosts = () => {
    const slides = this.props.sliderStore.slides;

    return slides.length > 0 ? slides.map((slide, k) => (
      <Slide id={slide.id} key={slide.id} title={slide.title}>
        {slide.youtybe_id
          ? <SliderVideo src={slide.image_src} youid={slide.youtybe_id} mlVideoSrc={slide.ml_video_src}/>
          : <SliderImage src={slide.image_src}/>
        }
        <rs-zone id={`rrzm_${slide.id}`} class="rev_row_zone_middle" style={{zIndex: 18}}>
          <rs-row id={`slider-18-slide-${slide.id}-layer-3`}
            data-type="row"
            data-xy="y:m;yo:-426px;"
            data-text="l:22;a:inherit;"
            data-dim="w:1240;"
            data-cbreak="3"
            data-basealign="slide"
            data-rsp_bd="off"
            data-frame_0="tp:600;"
            data-frame_1="tp:600;sR:10;"
            data-frame_999="o:0;tp:600;st:w;sR:8690;sA:9000;"
            style={{zIndex:1,fontFamily:'Roboto'}}>
            <rs-column id={`slider-18-slide-${slide.id}-layer-4`}
              data-type="column"
              data-xy="xo:100px;yo:100px;"
              data-text="l:22;a:right;"
              data-rsp_bd="off"
              data-column="w:50%;"
              data-frame_0="tp:600;"
              data-frame_1="tp:600;"
              data-frame_999="o:0;tp:600;st:w;sR:8690;sA:9000;"
              style={{zIndex:2,fontFamily:'Roboto',width:'100%'}}>
              <rs-layer id={`slider-18-slide-${slide.id}-layer-1`}
                data-type="text"
                data-text="w:normal;s:100,80,60,60;l:80,65,50,50;ls:-7px,-6px,-4px,-4px;a:right;"
                data-dim="w:100%;"
                data-rsp_o="off"
                data-rsp_bd="off"
                data-margin="t:30;b:70;"
                data-frame_0="o:1;tp:600;blu:10px;"
                data-frame_0_chars="x:50px;o:0;blu:10px;"
                data-frame_1="tp:600;e:Power4.easeOut;st:300;sp:1000;sR:290;"
                data-frame_1_chars="dir:middletoedge;d:3;"
                data-frame_999="o:0;tp:600;e:Power4.easeOut;st:w;sp:100;sR:7340;"
                style={{zIndex:3,fontFamily:'Limelight',display:'inline-block'}}>
                {slide.image_title}
                {slide.image_title1 && <br/>}
                {slide.image_title1}
                {slide.image_title2 && <br/>}
                {slide.image_title2}
              </rs-layer>
            </rs-column>
            <rs-column id={`slider-18-slide-${slide.id}-layer-5`}
              data-type="column"
              data-xy="xo:100px;yo:100px;"
              data-text="l:22;a:inherit;"
              data-rsp_bd="off"
              data-column="w:50%;"
              data-frame_0="tp:600;"
              data-frame_1="tp:600;"
              data-frame_999="o:0;tp:600;st:w;sR:8690;sA:9000;"
              style={{zIndex:4,fontFamily:'Roboto',width:'100%'}}>
            </rs-column>
          </rs-row>
        </rs-zone>

        <SliderGroup id={slide.id} slidesCnt={slides.length} slideNumber={k + 1}/>
        <SliderLayer id={slide.id} link={`/${this.props.baseNameForRouting}/event/${slide.name}`}/>
      </Slide>
    ))
      : null
  };

  render() {
    return (
      <rs-module-wrap id="rev_slider_18_1_wrapper" data-alias="clear-cut" data-source="gallery" style={{background:'transparent',padding:0}}>
        <rs-module id="rev_slider_18_1" style={{display:'none'}}>
          <rs-slides>
            {this.renderPosts()}
          </rs-slides>
          <rs-progress class="rs-bottom" style={{visibility:'hidden!important'}}/>
        </rs-module>
      </rs-module-wrap>
    );
  }
}

function Slide(props){
  const {children, id, title} = props;
  return (
    <rs-slide data-key={`rs-${id}`} data-title={title} data-anim="ei:d;eo:d;s:d;r:0;t:fade;sl:d;">
      {children}
    </rs-slide>
  );
}

function SliderImage(props){
  const {src} = props;
  return (
    <img src={src} data-parallax="off"
         data-panzoom="d:2000;e:Power3.easeInOut;ss:110;se:100;bs:20;" className="rev-slidebg" data-no-retina />
  );
}
function SliderVideo(props){
  const {src, youid=false, mlVideoSrc=false} = props;
  return (
    <Fragment>
      <img src={src} data-parallax="off" className="rev-slidebg"
           data-no-retina />
      {youid && !mlVideoSrc &&
      <Fragment>
        <rs-bgvideo
          data-video="vc:none;w:100%;h:100%;nse:false;l:true;ptimer:false;"
          data-ytid={youid}
          data-vatr="version=3&amp;enablejsapi=1&amp;html5=1&amp;hd=1&amp;wmode=opaque&amp;showinfo=0&amp;rel=0&amp;"
        />
      </Fragment>}
      {mlVideoSrc && !youid &&
      <Fragment>
        <rs-bgvideo
          data-video="w:100%;h:100%;nse:false;l:loop;ptimer:true;"
          data-mp4={mlVideoSrc}
        />
      </Fragment>}
    </Fragment>
  );
}

function SliderGroup(props){
  const {id, slideNumber, slidesCnt} = props;
  return (
    <rs-group
      id={`slider-7-slide-${id}-layer-${sliderLayer++}`}
      data-type="group"
      data-rsp_ch="on"
      data-xy="x:r;y:b;"
      data-text="w:normal;s:20,16,12,7;l:0,20,15,9;"
      data-dim="w:292px,241px,183px,112px;h:80px,66px,50px,30px;"
      data-frame_0="o:1;"
      data-frame_999="o:0;st:w;sA:9000;"
      style={{zIndex:17,backgroundColor:'#ffffff',fontFamily:'Roboto'}}
    >
      <rs-layer
        id={`slider-7-slide-${id}-layer-${sliderLayer++}`}
        data-type="text"
        data-color="#c8ccd4||#c8ccd4||#c8ccd4||#ffffff"
        data-xy="x:r,r,r,l;y:m,m,m,t;"
        data-text="s:12;l:30;a:inherit;"
        data-rsp_o="off"
        data-rsp_bd="off"
        data-margin="r:30,30,30,10;l:0,0,0,30;"
        data-padding="t:5,5,5,0;r:5;l:5;"
        data-frame_0="o:1;tp:600;"
        data-frame_0_sfx="se:blocktoright;"
        data-frame_1="tp:600;st:200;sp:500;sR:190;"
        data-frame_1_sfx="se:blocktoright;"
        data-frame_999="o:0;tp:600;e:Power4.easeOut;st:w;sp:500;sR:8300;"
        style={{zIndex:14,fontFamily:'Roboto'}}
      ><span style={{fontWeight:700,fontSize:'45px',color:'#f6255a'}}>{slideNumber}</span>
        <span style={{fontSize:'25px',verticalAlign:'sub'}}>/</span>
        <span style={{verticalAlign:'sub'}}>{slidesCnt}</span>
      </rs-layer>
      <rs-layer
        id={`slider-7-slide-${id}-layer-${sliderLayer++}`}
        data-type="text"
        data-color="#c8ccd4||#c8ccd4||#c8ccd4||rgba(255, 255, 255, 0.5)"
        data-xy="xo:20px,20px,20px,0;y:m,m,m,t;"
        data-text="s:30,30,30,15;l:30;a:center;"
        data-dim="w:50px,50px,50px,30px;h:50px,50px,50px,30px;"
        data-actions='o:click;a:jumptoslide;slide:previous;'
        data-rsp_o="off"
        data-rsp_bd="off"
        data-margin="r:5;"
        data-padding="t:8,8,8,0;"
        data-border="bos:solid;boc:#c8ccd4;bow:2px,2px,2px,2px;bor:50px,50px,50px,50px;"
        data-frame_0="o:1;tp:600;"
        data-frame_0_sfx="se:blocktobottom;"
        data-frame_1="tp:600;st:250;sp:500;sR:240;"
        data-frame_1_sfx="se:blocktobottom;"
        data-frame_999="o:0;tp:600;e:Power4.easeOut;st:w;sp:500;sR:8250;"
        data-frame_hover="c:#f6255a;boc:#f6255a;bor:50px,50px,50px,50px;bos:solid;bow:2px,2px,2px,2px;oX:50;oY:50;sp:0;"
        style={{zIndex:15,fontFamily:'Open Sans',cursor:'pointer'}}
      ><i className="material-icons bilego-icons left">
        <SvgIcon viewBox="0 0 240.823 240.823">
          <path id="Chevron_Right" d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179
          l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816
          C52.942,116.507,52.942,124.327,57.633,129.007z"/>
        </SvgIcon>
      </i>
      </rs-layer>
      <rs-layer
        id={`slider-7-slide-${id}-layer-${sliderLayer++}`}
        data-type="text"
        data-color="#c8ccd4||#c8ccd4||#c8ccd4||rgba(255, 255, 255, 0.5)"
        data-xy="xo:90px,90px,90px,0;y:m,m,m,t;"
        data-text="s:30,30,30,15;l:30;a:center;"
        data-dim="w:50px,50px,50px,30px;h:50px,50px,50px,30px;"
        data-actions='o:click;a:jumptoslide;slide:next;'
        data-rsp_o="off"
        data-rsp_bd="off"
        data-padding="t:8,8,8,0;"
        data-border="bos:solid;boc:#c8ccd4;bow:2px,2px,2px,2px;bor:50px,50px,50px,50px;"
        data-frame_0="o:1;tp:600;"
        data-frame_0_sfx="se:blocktotop;"
        data-frame_1="tp:600;st:300;sp:500;sR:290;"
        data-frame_1_sfx="se:blocktotop;"
        data-frame_999="o:0;tp:600;e:Power4.easeOut;st:w;sp:500;sR:8200;"
        data-frame_hover="c:#f6255a;boc:#f6255a;bor:50px,50px,50px,50px;bos:solid;bow:2px,2px,2px,2px;oX:50;oY:50;sp:0;"
        style={{zIndex:16,fontFamily:'Open Sans',cursor:'pointer'}}
      ><i className="material-icons bilego-icons right">
        <SvgIcon viewBox="0 0 240.823 240.823">
          <path id="Chevron_Right_1_" d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
          l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
          C187.881,124.315,187.881,116.495,183.189,111.816z"/>
        </SvgIcon>
      </i>
      </rs-layer>
    </rs-group>
  );
}
function SliderLayer(props){
  const {id, link} = props;
  return (
    <rs-layer id={`slider-7-slide-${id}-layer-${sliderLayer++}`} class="rs-layer"
      href={link} target="_blank" rel="nofollow"
      data-type="text"
      data-xy="x:c,c,c,l;y:b,b,b,t;yo:60px,60px,60px,0;"
      data-text="s:25,25,25,15;l:30;a:center;"
      data-rsp_o="off"
      data-rsp_bd="off"
      data-padding="r:10;l:30;"
      data-border="bos:solid;boc:#ffffff;bow:1px,5px,1px,5px;bor:30px,30px,30px,30px;"
      data-frame_0="o:1;tp:600;"
      data-frame_0_sfx="se:blocktoleft;"
      data-frame_1="tp:600;st:150;sp:500;sR:140;"
      data-frame_1_sfx="se:blocktoleft;"
      data-frame_999="o:0;tp:600;e:Power4.easeOut;st:w;sp:500;sR:8350;"
      data-frame_hover="c:#f6255a;boc:#f6255a;bor:30px,30px,30px,30px;bos:solid;bow:1px,5px,1px,5px;oX:50;oY:50;sp:0;"
      style={{zIndex:13,fontFamily:'Open Sans',cursor:'pointer'}}
    >
      <Link className="bilego-ticket-view" to={link}>Купить билеты <i className="fa-ticket" style={{marginLeft:'10px'}} /></Link>
    </rs-layer>
  );
}

export default MainSlider;
