import {AuthenticatedNavBar} from "../components/AuthenticatedNavBar.jsx";
import {useEffect, useState} from "react";
import getPlayers from '../api/players/players.js';
import getCoaches from '../api/coaches/coaches.js'
import {PlayersCoachesCard} from '../components/PlayersCoachesCard.jsx';
import {Button, Image} from "react-bootstrap";
import newPlayer from '../assets/newPlayer.svg';
import {NewPlayerButton} from "../components/NewPlayerButton.jsx";
import {NewClubButton} from "../components/NewClubButton.jsx";

/**
 * PlayersCoachesHomeScreen component
 *
 * This component displays a list of players or coaches based on the `dataType` prop.
 * It includes a navigation bar, a header, and a grid of player/coach cards.
 *
 * @param {Object} props - The component props
 * @param {string} props.dataType - The type of data to display ('players' or 'coaches')
 * @returns {JSX.Element} The rendered component
 */
export const PlayersCoachesHomeScreen = ({dataType}) => {
    // State to manage the collapsed state of the navigation bar
    const [collapsed, setCollapsed] = useState(false);
    // State to store the data (players or coaches)
    const [data, setData] = useState([])

    // Effect to fetch data based on the dataType prop
    useEffect(() => {
        if (dataType == 'players') {
            setData(getPlayers)
        } else if(dataType == 'coaches') {
            setData(getCoaches)
        }
    }, [dataType]);

    return (
        <div className='players-home-screen'>
            {/* Navigation bar component */}
            <AuthenticatedNavBar collapsed={collapsed} setCollapsed={setCollapsed}/>

            {/* Header section */}
            <div className='d-flex align-items-center justify-content-between flex-wrap players-header-div'>
                <div className='d-flex ms-sm-5 ms-md-5 ps-sm-5 ps-md-5 ps-lg-5 ms-lg-5 mt-sm-4 mt-md-4 mt-lg-4'>
                    <h1 className='players-heading'>
                        {dataType == 'players' && (<span>Players</span>)}
                        {dataType == 'coaches' && (<span>Coaches</span>)}
                    </h1>
                </div>

                <div className=''>
                    {dataType == 'players' && (<NewPlayerButton/>)}
                    {dataType == 'coaches' && (<NewClubButton/>)}
                </div>
            </div>

            {/* Grid of player/coach cards */}
            <div className="row g-4 m-auto mt-5 mb-5" style={{width: '95%'}}>
                {data?.map((player, index) => (
                    <div key={index} className='col-12 col-lg-3 col-md-4 col-sm-6 custom-col-sm'>
                        <PlayersCoachesCard player={player}/>
                    </div>
                ))}
            </div>
        </div>
    )
}