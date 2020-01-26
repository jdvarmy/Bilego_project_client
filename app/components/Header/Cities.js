import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { action, observable } from 'mobx';

import Button from '@material-ui/core/Button';
import ModalAnimated from '../ModalAnimated';
import { BilegoIconCity } from '../../theme/bilegoIcons';
import style from '../../theme/style';

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
  p{
    cursor: pointer;
    padding: 8px 28px;
  }
`;
const StyledIcon = styled.div`
  display: flex;
  & svg{
    font-size: 1.25rem!important;
    margin-right: 7px;
  }
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
    const {pageStore:{getFrontPageData}, globalStore:{categoryConcertsForFrontPage, apiRoot}} = this.props;
    getFrontPageData(apiRoot, {categoryId: categoryConcertsForFrontPage, itemOrderby: 'rand'});
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
        <ModalAnimated closable show={this.open} onClose={this.handleOpen} header="Выберите город">
          <Modal>
            {cities.map(el=>(
              <p key={el.baseName}>
                <Link to={`/${el.baseName}`} onClick={() => this.handlerClick(el.id)}>{el.cityRus}</Link>
              </p>
            ))}
          </Modal>
        </ModalAnimated>
      </Wrapper>
    )
  }
}

export default Cities;
