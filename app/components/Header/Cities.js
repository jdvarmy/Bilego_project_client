import React from 'react';
import styled from 'styled-components';
import {ModalAnimated, Wrapper} from '../../theme/elements';
import {observer, inject} from 'mobx-react';
import {action, observable} from 'mobx';
import Button from '@material-ui/core/Button';
import {BilegoIconCity} from '../../theme/BilegoIcons';
import {Link, withRouter} from 'react-router-dom';

const SWrapper = styled(Wrapper)`
  justify-content: flex-end;
  margin-right: 20px;
`;
const StyledButton = styled(Button)`
  margin-top: 4px!important;
  text-transform: none!important;
`;
const SModal = styled.div`
  width: 400px;
  padding: 16px 0px;
  p{
    cursor: pointer;
    padding: 8px 28px;
  }
`;

@withRouter
@inject('globalStore', 'pageStore', 'sliderStore', 'mapStore', 'rightPanelStore')
@observer
class Cities extends React.Component{
  @observable open = false;

  @action handleOpen = () => {
    this.open = !this.open;
  };

  changeCity = id => {
    const {globalStore:{setCity}} = this.props;
    setCity(id);

    const {baseNameForRouting} = this.props.globalStore;
    this.props.history.push(`/${baseNameForRouting}`);

    this.renderPageContent();
    this.renderRevolutionSlider();
    this.renderTimeLine();
  };

  renderPageContent = () => {
    const {pageStore:{getEventsConcerts, getEventsHot, getEventsSoon, getItemsFrontPage}, globalStore:{categoryConcertsForFrontPage}} = this.props;
    getEventsSoon();
    getEventsHot();
    getEventsConcerts({categoryId: categoryConcertsForFrontPage});
    getItemsFrontPage({orderby: 'rand'});
  };
  renderRevolutionSlider = () => {
    this.props.sliderStore.getMainSlides();
  };
  renderTimeLine = async () =>{
    const {rightPanelStore:{getDataTimeLine}} = this.props;
    this.props.rightPanelStore.clear();
    await getDataTimeLine();
    const {rightPanelStore:{markers}, mapStore:{autoFit}} = this.props;
    autoFit(markers);
  };

  handlerClick = id => {
    if(this.props.globalStore.city !== id)
      this.changeCity(id);

    this.handleOpen();
  };

  render() {
    const StyledIcon = styled.div`
      display: flex;
      & svg{
        font-size: 1.25rem!important;
        margin-right: 7px;
      }
    `;

    const {globalStore:{city, citys}} = this.props;

    return (
      <SWrapper>
        <StyledButton aria-controls="city-menu" aria-haspopup="true" onClick={this.handleOpen}>
          <StyledIcon>{BilegoIconCity}</StyledIcon>
          {citys[city].cityRus}
        </StyledButton>
        <ModalAnimated closable show={this.open} onClose={this.handleOpen} header="Выберите город">
          <SModal>
            {citys.map(el=>(
              <p key={el.baseName}>
                <Link to={`/${el.baseName}`} onClick={() => this.handlerClick(el.id)}>{el.cityRus}</Link>
              </p>
            ))}
          </SModal>
        </ModalAnimated>
      </SWrapper>
    );
  }
}

export default Cities;