import React from 'react';
import { hydrate } from 'react-dom';

export const BilegoGateUi = () => {
  hydrate(
    <div>
      12
    </div>,
    document.getElementById('app'),
  );
};
