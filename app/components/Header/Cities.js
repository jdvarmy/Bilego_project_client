import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { action, observable } from 'mobx';

import Button from '@material-ui/core/Button';
import ModalAnimated from '../ModalAnimated';
import { BilegoIconCity } from '../../theme/bilegoIcons';
import style from '../../theme/style';

import lama from './lama-priroda-fon-12.jpg';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.div`
  height: ${style.$heightMenu}px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
`;
const StyledButton = styled(Button)`
  margin-top: 4px!important;
  text-transform: none!important;
`;
const Modal = styled.div`
  width: 400px;
  padding: 16px 0px;
  h5{
    padding: 15px 28px;
    a{
      color: ${style.$white};
    }
  }
`;
const StyledIcon = styled.div`
  display: flex;
  & svg{
    font-size: 1.25rem!important;
    margin-right: 7px;
  }
`;
const ImageLama = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('${lama}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
`;
const ImageShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #202124;
  z-index: -1;
  opacity: 0.8;
`;

@withRouter
@inject('globalStore', 'pageStore', 'sliderStore', 'mapStore', 'rightPanelStore', 'searchStore')
@observer
class Cities extends React.Component{
  @observable open = false;

  @action handleOpen = () => {
    this.open = !this.open;
  };

  changeCity = id => {
    const {globalStore:{setCity}, searchStore, pageStore} = this.props;
    setCity(id);

    searchStore.clear();
    pageStore.clear();

    const {baseNameForRouting} = this.props.globalStore;
    this.props.history.push(`/${baseNameForRouting}`);

    this.renderPageContent();
    this.renderRevolutionSlider();
    this.renderTimeLine();
  };

  renderPageContent = () => {
    const {pageStore:{getFrontPageData}, globalStore:{categoryConcertsForFrontPage, apiRoot, setMeta}} = this.props;
    getFrontPageData(apiRoot, {categoryId: categoryConcertsForFrontPage, itemOrderby: 'rand'});

    // todo: не работает мета при переключении города
    setMeta(this.props.pageStore.seoPage);
  };
  renderRevolutionSlider = () => {
    this.props.sliderStore.getMainSlides(this.props.globalStore.apiRoot);
  };
  renderTimeLine = async () =>{
    const {rightPanelStore:{getDataTimeLine}} = this.props;
    this.props.rightPanelStore.clear();
    await getDataTimeLine(this.props.globalStore.apiRoot);
    const {rightPanelStore:{markers}, mapStore:{autoFit}} = this.props;
    autoFit(markers);
  };

  handlerClick = id => {
    if(this.props.globalStore.CITY !== id)
      this.changeCity(id);

    this.handleOpen();
  };

  render(){
    const {globalStore:{CITY, cities}} = this.props;

    return(
      <Wrapper>
        <StyledButton aria-controls="city-menu" aria-haspopup="true" onClick={this.handleOpen}>
          <StyledIcon>{BilegoIconCity}</StyledIcon>
          {cities[CITY].cityRus}
        </StyledButton>
        <ModalAnimated city closable show={this.open} onClose={this.handleOpen} header="Выберите город">
          <ImageLama />
          <ImageShadow />
          <Modal>
            {cities.map(el=>(
              <Typography variant="h5" component="h5" key={el.baseName}>
                <Link to={`/${el.baseName}`} onClick={() => this.handlerClick(el.id)}>{el.cityRus}</Link>
              </Typography>
            ))}
          </Modal>
        </ModalAnimated>
      </Wrapper>
    )
  }
}

export default Cities;
