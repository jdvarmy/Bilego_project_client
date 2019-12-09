import React from 'react';
import styled, { keyframes } from 'styled-components';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop/Backdrop';
import style from '../../theme/style';
import { BilegoIconClose } from '../../theme/bilegoIcons';

export default function ModalAnimated(props) {
  const Animate = styled.div`
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: ${style.$white};
      clip-path: inset(0 100% 0 0);
      animation: ${keyframes`
        0% { clip-path: inset(0 0 0 100%); }
        50% { clip-path: inset(0); }
        100% { clip-path: inset(0 100% 0 0); }
      `} .7s ease-in-out;
    `,
    Children = styled.div`
      visibility: visible;
      opacity: 1;
      background: ${style.$white}
      width: 100%;
      height: 100%;
      animation: ${keyframes`
        0% { visibility: hidden; opacity: 0; }
        50% { visibility: hidden; opacity: 0; }
        51% { visibility: visible; opacity: 1; }
        100% { visibility: visible; opacity: 1; }
      `} .7s ease-in-out;
    `,
    StyledModal = styled(Modal)`
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    FadeWrap = styled.div`
      position: relative;
    `,
    Header = styled.div`
      padding: 16px 24px;
      color: ${style.$black};
      background: ${style.$white};
      border-bottom: 1px solid ${style.$grey};
      border-radius: 3px 3px 0 0;
      & *{
        margin: 0;
        color: ${style.$black};
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        word-wrap: break-word;
      }
    `,
    Body = styled.div`
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
    `,
    Footer = styled.div`
      padding: 10px 16px;
      text-align: right;
      background: ${style.$white};
      border-top: 1px solid ${style.$grey};
      border-radius: 0 0 3px 3px;
    `,
    Close = styled.div``;

  const {header, footer, closable, onClose, show, children, ModalClass} = props;

  return (
    <StyledModal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={show}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{timeout: 350,}}
      className="bilego-modal-wrapper"
    >
      <Fade in={show} timeout={50} className={`bilego-modal-fade ${ModalClass ? ModalClass : ''}`}>
        <FadeWrap>
          <Children className="bilego-modal-ch">
            {closable &&
            <Close className="bilego-close-modal">
              <div onClick={onClose}>
                <IconButton className="bilego-button" aria-label="close">
                  {BilegoIconClose}
                </IconButton>
              </div>
            </Close>
            }
            {header && <Header><div>{header}</div></Header>}
            <Body className="bilego-modal-body">{children}</Body>
            {footer && <Footer><div>{footer}</div></Footer>}
          </Children>
          <Animate />
        </FadeWrap>
      </Fade>
    </StyledModal>
  );
};
