import {Image} from "react-bootstrap";
// import IconPhone from '../assets/iconPhone.svg'
// import IconEmail from '../assets/iconEmail.svg'
import {Link} from "react-router-dom";

export const PlayersCoachesCard = ({data, type}) => {
    // console.log("Type : ", type);
    return (

        <>

            {type == 'players' &&
                <Link className="Player-Links" to={`${`/home/player/${data?.id}`}`}>
                <div className='players-coaches-card d-flex flex-column align-items-center justify-content-evenly'>

                    <div className="outer">
                        <Image src={data?.profilePhoto} width='100%' height='100px' roundedCircle className='player-image'/>
                    </div>

                    <div className='d-flex flex-column align-items-center justify-content-between w-100 overflow-hidden'
                         >
                        <div>
                            <span className='player-name text-break flex-wrap'>{data?.userName}</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <span className='player-position'>{data?.position}</span>
                            <span className='player-company'>{data?.currentTeam || 'club'}</span>
                        </div>
                    </div>

                    <div className='detalis d-flex flex-row justify-content-evenly w-100 '>

                        <div className='d-flex flex-column align-items-center'>
                            <p>Age</p>
                            <p>{data?.age}</p>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <p>Height</p>
                            <p>{data?.height}</p>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <p>Weight</p>
                            <p>{data?.weight}</p>
                        </div>

                    </div>
                    <p>{data?.nationality}</p>
                </div>
                </Link>
            }


            {type == 'coaches' &&
                <Link className="Player-Links" to={`${`/home/player/${data?.id}`}`}>
                <div className='players-coaches-card d-flex flex-column align-items-center justify-content-evenly'>

                    <div className="outer">
                        <Image src={data?.profilePhoto} width='100%' height='100px' roundedCircle className='player-image'/>
                    </div>

                    <div className='d-flex flex-column align-items-center justify-content-between w-100 overflow-hidden'
                         >
                        <div>
                            <span className='player-name text-break flex-wrap'>{data?.userName}</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <span className='player-position'>{data?.position}</span>
                            <span className='player-company'>{data?.currentTeam || 'club'}</span>
                        </div>
                    </div>

                    <div className='detalis d-flex flex-row justify-content-evenly w-100 '>

                        <div className='d-flex flex-column align-items-center'>
                            <p>Age</p>
                            <p>{data?.age}</p>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <p>Height</p>
                            <p>{data?.height}</p>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <p>Weight</p>
                            <p>{data?.weight}</p>
                        </div>

                    </div>
                    <p>{data?.nationality}</p>
                </div>
                </Link>
                // <div className='players-coaches-card d-flex flex-column align-items-center justify-content-evenly'>
                //     <div>
                //         <Image src={data?.profilePhoto}
                //                width='100px'
                //                height='100px'
                //                rounded
                //                className='player-image'
                //         />
                //     </div>

                //     <div className='d-flex flex-column align-items-center justify-content-between w-100 overflow-hidden'
                //          style={{height: '75px'}}>
                //         <div>
                //             <span className='player-name text-break flex-wrap'>{data?.userName}</span>
                //         </div>
                //         <div className='d-flex flex-column'>
                //             <span className='player-position'>{data?.specialization} at</span>
                //             <span className='player-company'>{data?.currentClubName || 'No Club'}</span>
                //         </div>
                //     </div>
                //     {/*<div className='d-flex flex-column align-items-start align-content-between gap-2'>*/}
                //     {/*    <div className='d-flex flex-row gap-3 align-items-center'>*/}
                //     {/*        <Image src={IconPhone}*/}
                //     {/*               className='img-fluid'*/}
                //     {/*               width='30'*/}
                //     {/*               height='30'*/}
                //     {/*        />*/}
                //     {/*        <span className='player-contact'>{data?.mobileNumber}</span>*/}

                //     {/*    </div>*/}
                //     {/*    <div className='d-flex flex-row gap-3 align-items-center'>*/}
                //     {/*        <Image src={IconEmail}*/}
                //     {/*               className='img-fluid'*/}
                //     {/*               width='30'*/}
                //     {/*               height='30'*/}
                //     {/*        />*/}
                //     {/*        <span className='player-contact'>{data?.email}</span>*/}

                //     {/*    </div>*/}
                //     {/*</div>*/}
                // </div>
            }
        </>
    )
}

