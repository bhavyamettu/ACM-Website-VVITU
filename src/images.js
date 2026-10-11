// All artwork lives in /src/assets. The CSS refers to it through custom properties
// (e.g. var(--tile)), which are set here so Vite can fingerprint every file.
import rb1_ from './assets/img01.webp';
import rb2_ from './assets/img02.webp';
import rb3_ from './assets/img03.webp';
import rc_ from './assets/img04.webp';
import rm_ from './assets/img05.webp';
import tile_ from './assets/img06.webp';
import mot_ from './assets/img07.webp';
import lfA_ from './assets/img08.webp';
import lfB_ from './assets/img09.webp';
import stamp_ from './assets/img10.webp';
import acmlogo_ from './assets/img11.webp';
import phA_ from './assets/img12.webp';
import phW_ from './assets/img13.webp';
import tm1_ from './assets/img14.webp';
import tm2_ from './assets/img15.webp';
import tm3_ from './assets/img16.webp';
import tm4_ from './assets/img17.webp';
import tm5_ from './assets/img18.webp';
import vlogo_ from './assets/img19.webp';
import vmap_ from './assets/img20.webp';
import rbB1_ from './assets/img21.webp';
import rbB2_ from './assets/img22.webp';
import rbB3_ from './assets/img23.webp';
import rbC1_ from './assets/img24.webp';
import rbC2_ from './assets/img25.webp';
import rbC3_ from './assets/img26.webp';
import rbD1_ from './assets/img27.webp';
import rbD2_ from './assets/img28.webp';
import rbD3_ from './assets/img29.webp';
import collegeImg from './assets/img30.jpg';

export const IMG = {
  rb1: rb1_, rb2: rb2_, rb3: rb3_, rc: rc_, rm: rm_, tile: tile_, mot: mot_, lfA: lfA_, lfB: lfB_, stamp: stamp_, acmlogo: acmlogo_, phA: phA_, phW: phW_, tm1: tm1_, tm2: tm2_, tm3: tm3_, tm4: tm4_, tm5: tm5_, vlogo: vlogo_, vmap: vmap_, rbB1: rbB1_, rbB2: rbB2_, rbB3: rbB3_, rbC1: rbC1_, rbC2: rbC2_, rbC3: rbC3_, rbD1: rbD1_, rbD2: rbD2_, rbD3: rbD3_,
};
export { collegeImg };

export function applyImageVars() {
  const root = document.documentElement;
  Object.entries(IMG).forEach(([k, v]) => root.style.setProperty('--' + k, `url(${v})`));
}
