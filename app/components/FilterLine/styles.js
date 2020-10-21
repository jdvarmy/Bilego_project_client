import makeStyles from '@material-ui/core/styles/makeStyles';
import style from '../../theme/style';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';

export const useStyles = makeStyles({
  dayWrapper: {
    position: "relative",
  },
  day: {
    // todo: неверно расчитываются размеры блока дат при маленьком экране
    width: 36,
    height: 36,
    fontSize: "0.95em",
    margin: "0 2px",
    color: "inherit",
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid #202124`,
    borderRadius: "50%",
  },
  beforeCurrentDay: {
    color: style.$grey,
  },
  selectedDay: {
    color: '#fff',
    fontWeight: '500',
    backgroundColor: style.$red,
    '&:hover': {backgroundColor: style.$red},
  },
  nonCurrentMonthDay: {
    visibility: 'hidden',
  },
  highlightNonCurrentMonthDay: {
    color: style.$black,
  },
  highlight: {
    background: style.$redtr,
    color: style.$white,
  },
  firstHighlight: {
    extend: "highlight",
    background: `linear-gradient(90deg, rgba(255,255,255,0) 50%, ${style.$redtr} 51%, ${style.$redtr} 100%)`,
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    background: `linear-gradient(90deg, ${style.$redtr} 49%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)`,
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
  calendarWrap: {
    overflow: "hidden",
    maxWidth: "390px"
  },
  maxWidth: {
    maxWidth: "390px",
    display: "flex",
    justifyContent: "center"
  }
});

export const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {borderBottomColor: style.$red}
  }
})(TextField);
