import { WiStars } from "react-icons/wi";
import { Link } from 'react-router-dom';
import { FaRegComment, FaSpinner } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { formatDistanceToNow } from 'date-fns';
import useGetPlayersScouts from "../API/players/useGetPlayersScouts";
import { CiHeart } from "react-icons/ci";

const HomePage = () => {
    const { user, authenticated } = useContext(AuthContext);
    const [getData, setData] = useState(null);
    const {isLoading} = useGetPlayersScouts();

    useEffect(() => {
        const fetchData = async () => {
            if (authenticated && user?.token) {
                try {
                    const response = await axios.get('http://glory-scout.tryasp.net/api/HomePage/feed', {
                        headers: {
                            "Authorization": `Bearer ${user.token}`,
                            "Content-Type": "application/json"
                        }
                    });
                    console.log(response.data);
                    setData(response.data.posts);
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            }
        };

        fetchData();
    }, [authenticated, user?.token]);

    // This part handles the like functionality
    const handleLikeClick = async (postId, isLikedByCurrentUser) => {
        if (!authenticated || !user?.token) return;

        try {
            const url = `http://glory-scout.tryasp.net/api/Post/${postId}/like`;
            const method = isLikedByCurrentUser ? 'delete' : 'post';
            await axios({
                method,
                url,
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            });
            setData(prevData => 
                prevData.map(e => 
                    e.id === postId 
                        ? { ...e, isLikedByCurrentUser: !isLikedByCurrentUser, likesCount: e.likesCount + (isLikedByCurrentUser ? -1 : 1) }
                        : e
                )
            );
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    return (
        <div>
             {isLoading && (
                 <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '3rem', zIndex: 1000,}}>
                    <FaSpinner className="loading-login" />
                    </div>)}
            <div className="hero-homepage">
                <div className="container">
                    <div className="cards">
                        <div className="text">
                            <h1><Link to="/home">Home</Link></h1>
                            <button><WiStars /></button>
                        </div>
                        {getData?.map((e, index) => {
                            const timeAgo = formatDistanceToNow(new Date(e.createdAt), { addSuffix: true });
                            return (
                                <div className="cardx" key={index}>
                                    <div className="detalis-profile">
                                        {/* to={`/home/player/${e.userId}`} */}
                                        <Link><img src={e.userProfilePicture} alt="" /></Link>
                                        <h3>{e.username}</h3>
                                        <h4>@Mohamed@gmail.com</h4>
                                        <p>{timeAgo}</p>
                                    </div>
                                    <div className="box-img">
                                        <img src={e.posrUrl} alt="" />
                                    </div>
                                    <div className="icons">
                                        <div className="cent">
                                            <button  onClick={() => handleLikeClick(e.id, e.isLikedByCurrentUser)}  style={{ color: e.isLikedByCurrentUser ? 'red' : 'white' , fontSize:"22px"}} >
                                                <CiHeart /> <span> {e.likesCount}</span>
                                            </button>
                                            <button><FaRegComment /> <span>0</span></button>
                                            <button><PiShareFat /> <span>0</span></button>
                                        </div>
                                    </div>
                                    <div className="description">
                                        <h3>{e.username}: </h3>
                                        <p><p>{e.description}</p></p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
