import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function ArrowSvgComponent(props: any) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <G
        stroke="none"
        strokeWidth={0}
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        fill="none"
        fillRule="nonzero"
        opacity={1}>
        <Path
          d="M87.85 41.551L5.545 1.167C2.414-.369-.979 2.725.263 5.984l14.342 37.648a3.836 3.836 0 010 2.735L.263 84.016c-1.241 3.259 2.152 6.353 5.282 4.817L87.85 48.449c2.867-1.406 2.867-5.492 0-6.898z"
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          stroke="none"
          strokeWidth={1}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
          fill="#ff0000"
          fillRule="nonzero"
          opacity={1}
        />
      </G>
    </Svg>
  );
}

export default ArrowSvgComponent;
