import { Vortex } from 'react-loader-spinner';
import css from './Loader.module.css';
export function Loader() {
  return (
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass={css.loader}
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  );
}
