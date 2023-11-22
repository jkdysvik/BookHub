import { FrontPageLogoProps } from '../types.ts';
import logo from '../../../assets/logo2.png';

const FrontPageLogo = ({ page, logo_num, toggleLogo }: FrontPageLogoProps) => {

    return (
        <div>
            {page === 0 && logo_num === 1 && (
                < div >
                    <img className="homepage-logo" src={logo} onClick={toggleLogo} />
                </div >)}
            {page === 0 && logo_num === 2 && (
                <div>
                    <img className="homepage-logo1" src={logo} onClick={toggleLogo} />
                </div>
            )}
            {page === 0 && logo_num === 3 && (
                <div>
                    <img className="homepage-logo2" src={logo} onClick={toggleLogo} />
                </div>)}

            {page === 0 && logo_num === 4 && (<div>
                <img className="homepage-logo3" src={logo} onClick={toggleLogo} />
            </div>)}
        </div >
    );
};

export default FrontPageLogo;