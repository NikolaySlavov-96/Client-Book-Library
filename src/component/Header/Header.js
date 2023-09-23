import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";


export const Header = () => {

    const { email } = useAuthContext();
    const name = email?.split('@')[0];

    return (
        <div>
            <h1>Hello {name ? name : 'Gues'}</h1>

            <nav>
                <ul>
                    <li><NavLink to='/book'>Books</NavLink></li>
                    {
                        email && (<>
                            <li><NavLink to='/userbook/forreading'>For Reading</NavLink></li>
                            <li><NavLink to='/userbook/reading'>Reading</NavLink></li>
                            <li><NavLink to='/userbook/forpurchase'>For Purchase</NavLink></li>
                            <li><NavLink to='/userbook/purchase'>Purchase</NavLink></li>
                        </>)
                    }
                </ul>
            </nav>
        </div>
    );
}