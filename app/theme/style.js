const
  baseSize = 8,
  borderRadius = 2,
  borderWidth = 1;

export default {
  // background
  $first: '#ffffff',
  $second: '#202124',
  // plank
  $opacity: '52%',
  // colors
  $black: '#12141f',
  $white: '#ffffff',
  $shadowWhite: 'rgba(255,255,255,0.3)',
  $grey: '#c8ccd4',
  $greydark: 'rgba(0, 0, 0, 0.5)',
  // buttons
  $blackdark: '#040714',
  $shadowblack: 'drop-shadow(0 30px 20px rgba(16,23,37,0.27))',
  $red: '#f6255a',
  $redtr: 'rgba(246, 37, 90, 0.6)',
  $shadowred: 'drop-shadow(0 14px 32px rgba(251,29,88,0.23))',

  $border: '2px solid #525667',

  $heightMenu: '80',

  $transition: '0.35s',
  $transitionfast: '0.10s',
  $transitionanimation: 'cubic-bezier(0.645, 0.045, 0.355, 1)',

  $rightBodyPanel: '27%',
  $leftBodyPanel: '73%',

  sizes: {
    borderRadius: `${borderRadius}px`,
    base: `${baseSize}px`,
    xs: `${baseSize / 2}px`,
    xd: `${baseSize * 3 / 2}px`,
    md: `${baseSize * 2}px`,
    lg: `${baseSize * 3}px`,
    xl: `${baseSize * 4}px`,
    xxl: `${baseSize * 5}px`,
    xxxl: `${baseSize * 6}px`,
    borderWidth: `${borderWidth}px`,
  },
};
