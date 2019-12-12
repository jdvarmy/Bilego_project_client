import React, {Component} from 'react';
import {Input} from 'antd';
import styled from 'styled-components';
import {style} from '../../theme';
import {BilegoIconSearch, BilegoIconClose} from '../../theme/BilegoIcons';
import {observer, inject} from 'mobx-react';
import {observable, action} from 'mobx';
import IconButton from '@material-ui/core/IconButton';

const Container = styled.div`
  height: ${style.$heightMenu}px;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  & svg{
    vertical-align: middle;
  }
`;
const Border = styled('span')`
  position: absolute;
  bottom: 20px;
  left: 0;
  height: 2px;
  width: calc(100% - 30px);
  background ${style.$red};
  transform: scaleX(0);
  transform-origin: 0 0;
  transition: all ${style.$transitionfast} ${style.$transitionanimation};
  &.show{
    transform: scaleX(1);
  }
`;
const StyledInput = styled(Input)`
  width: 100%;
  color: ${style.$second};
  background: none;
  transition: all ${style.$transition} ${style.$transitionanimation};
  & input{
    border: none;
    width: 100%;
    padding: 0px 70px 0 40px;
    background-color: transparent;
  }
  .ant-input-suffix, .ant-input-prefix{
    position: absolute;
    color: ${style.$second};
    & svg:hover{
      fill: ${style.$red};
    }
  }
  .ant-input-suffix{
    right: 30px;
  }
`;
const Placeholder = styled('span')`
  position: absolute;
  overflow: hidden;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 70px 0 40px;
  z-index: -1;
  & span{
    white-space: nowrap;
    display: inline-block;
    will-change: transform;
    opacity: ${(props)=> {
      const {Hide, Focus} = props;
      if(Focus && Hide === -1) return 0.5;
      if(Focus && Hide >= 0) return 0;
      if(!Focus && Hide >= 0) return 0;
      return 1;
    }};
    transform: ${(props)=> props.Focus ? `translateX(${props.Width}px)` : `translateX(0px)`};
    color: ${style.$second};
    transition:
      opacity ${style.$transitionfast} ${style.$transitionanimation},
      transform ${style.$transition} ${style.$transitionanimation};
    transition-delay: 0s;
  }
`;
const SIconButton = styled(IconButton)`
  & svg{
    font-size: 0.9rem!important;
  }
`;

@inject('searchStore')
@observer
class Search extends Component{
  constructor(props) {
    super(props);
    this.refPlaceholder = React.createRef();
    this.refInput = React.createRef();
  }

  time;
  componentWillUnmount(){
    clearTimeout(this.time);
  };

  @observable PlaceholderWidth = 0;

  @action placeholderWidthFunc(e){
    const {current} = this.refPlaceholder,
      {firstChild} = current;
    this.PlaceholderWidth = firstChild.clientWidth - 38 - current.clientWidth / 2;
  }

  onInputChange = e => {
    const {target:{value}} = e,
      {searchStore:{changeSearchStatus, setRequest, getSearchResult}} = this.props;
    switch (true) {
      case value.length === 0:
        changeSearchStatus(-1);
        setRequest(value);
        break;
      case value.length === 1:
        changeSearchStatus(0);
        setRequest(value);
        break;
      case value.length > 1:
        changeSearchStatus(1);
        setRequest(value);
        this.time = setTimeout(function(){
          getSearchResult();
        }, 100);
        break;
      default:
        break;
    }
  };
  clearValue = () => {
    const {searchStore:{changeSearchStatus, setRequest}} = this.props;
    changeSearchStatus(-1);
    setRequest('');
    this.refInput.current.focus();
  };

  render() {
    const
      {searchStore:{search, request, changeFocus, focus}} = this.props,
      prefix = search === 0 || search === 1
        ? <SIconButton className="bilego-button" onClick={this.clearValue} aria-label="cancel">
            {BilegoIconClose}
          </SIconButton>
        : '',
      suffix = <IconButton className="bilego-button" aria-label="search" onClick={()=>{this.refInput.current.focus();}}>
          {BilegoIconSearch}
        </IconButton>;

    return(
      <Container className="bilego-search-input-wrap">
        <StyledInput onChange={this.onInputChange}
                     prefix={prefix}
                     suffix={suffix}
                     onFocus={() => {changeFocus(true); this.placeholderWidthFunc()}}
                     onBlur={() => changeFocus(false)}
                     value={request}
                     ref={this.refInput}/>
        <Placeholder ref={this.refPlaceholder}
                     Width={this.PlaceholderWidth}
                     Focus={focus}
                     Hide={search}>
          <span>События, артисты и места…</span>
        </Placeholder>
        <Border className={(focus || search === 0 || search === 1) && 'show'}/>
      </Container>
    );
  }
}

export default Search;