import { IMG } from '../images.js';
import { IM } from '../data/layouts.js';

/* Hand-drawn sketch shapes (building, compass, books, leaves …).
   P() joins path strings with a NUL separator so the original concatenation-style
   helpers can stay as they are; G() turns the three layers into <g> groups. */
const P = (d) => d + '\0';
const G = (id, a, b, c) =>
  [a, b, c].map((x, i) => (
    <g id={id + (i + 1)} key={id + (i + 1)}>
      {x.split('\0').filter(Boolean).map((d, j) => (
        <path key={j} pathLength="1" d={d} />
      ))}
    </g>
  ));

function bld(w,h){let a=P(`M0 ${h}H${w}`)+P(`M${w*.04} ${h}V${h*.45}H${w*.38}V${h*.16}H${w*.64}V${h*.4}H${w*.96}V${h}`)+P(`M${w*.38} ${h*.16}L${w*.51} ${h*.04}L${w*.64} ${h*.16}`)+P(`M${w*.04} ${h*.6}H${w*.96}M${w*.04} ${h*.78}H${w*.96}`)+P(`M${w*.46} ${h}V${h*.86}h${w*.08}V${h}`);
let b='';[.5,.66,.84].forEach(r=>{let d='';for(let i=0;i<15;i++){if(r>.8&&i>6&&i<9)continue;const x=w*.06+i*w*.06;d+=`M${x} ${h*r}h${w*.035}v${h*.08}h-${w*.035}z`}b+=P(d)});
[.24,.34].forEach(r=>{let d='';for(let i=0;i<5;i++)d+=`M${w*.41+i*w*.045} ${h*r}h${w*.025}v${h*.06}h-${w*.025}z`;b+=P(d)});
let c='';for(let i=0;i<7;i++){const x=w*(.06+i*.15);c+=P(`M${x} ${h}V${h*.93}M${x-16} ${h*.93}q-8 -34 16 -44q26 10 16 44z`)}
c+=P(`M0 ${h+8}H${w}M20 ${h+16}H${w-40}`);return G('bld',a,b,c)}
let tk = '';for(let i=0;i<36;i++){const t=i*Math.PI/18;tk+=`M${100+80*Math.cos(t)} ${100+80*Math.sin(t)}L${100+90*Math.cos(t)} ${100+90*Math.sin(t)}`}
const AS = [bld(520,260),
G('cmp',P('M190 100a90 90 0 1 0-180 0a90 90 0 1 0 180 0M170 100a70 70 0 1 0-140 0a70 70 0 1 0 140 0')+P(tk),P('M100 10L112 88L190 100L112 112L100 190L88 112L10 100L88 88Z'),P('M130 100a30 30 0 1 0-60 0a30 30 0 1 0 60 0M106 100a6 6 0 1 0-12 0a6 6 0 1 0 12 0M30 30L170 170M170 30L30 170')),
G('bk',P('M10 130h180v-30h-180zM20 100h160v-30h-160zM14 70h170v-30h-170z'),P('M10 122h180M20 92h160M14 62h170M30 130v-30M30 100v-30'),P('M150 40v-25l8 8 8-8v25M40 110h40M50 80h50M44 50h60')),
G('lf',P('M60 158C60 100 70 60 92 8'),P('M62 120q-32-8-38-40q32 6 38 40M66 96q30-14 34-46q-30 10-34 46M76 60q-26-10-28-38q26 6 28 38M84 40q22-8 26-30q-22 4-26 30'),P('M62 120q-18-18-38-40M66 96q18-24 34-46M76 60q-14-16-28-38')),
G('sl',P('M134 70a64 64 0 1 0-128 0a64 64 0 1 0 128 0M124 70a54 54 0 1 0-108 0a54 54 0 1 0 108 0'),P('M104 70a34 34 0 1 0-68 0a34 34 0 1 0 68 0M70 30v-10M70 120v-10M30 70H20M120 70h-10'),P('M48 62h44M52 78h36M70 42l3 8h8l-6 5 2 8-7-5-7 5 2-8-6-5h8z')),
G('mp',P('M0 200C80 120 160 220 240 120S360 60 400 20'),P('M0 60C90 90 150 20 260 70S380 200 400 180'),P('M60 0V260M200 0C190 100 230 180 210 260M0 130H400')),
G('fl',P('M60 158C58 110 62 80 60 56'),P('M60 56m-14 0a14 14 0 1 0 28 0a14 14 0 1 0-28 0M60 22a12 20 0 1 0 .1 0M28 44a20 12 0 1 0 .1 0M92 44a20 12 0 1 0 .1 0M38 78a12 20 0 1 0 .1 0M82 78a12 20 0 1 0 .1 0'),P('M60 56m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0M60 110q-30-10-36-30M60 120q26-6 34-26'))];

/* Hidden <svg> that holds every reusable definition: sketches + the artwork <image>s */
export default function SvgDefs() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>{AS.flat()}</defs>
      </svg>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {Object.keys(IM).map((k) => (
            <image key={k} id={'img_' + k} width={IM[k][0]} height={IM[k][1]} href={IMG[k]} />
          ))}
        </defs>
      </svg>
    </>
  );
}
