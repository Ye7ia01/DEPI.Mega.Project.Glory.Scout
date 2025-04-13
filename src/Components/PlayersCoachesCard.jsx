import {Image} from "react-bootstrap";
import IconPhone from '../assets/iconPhone.svg'
import IconEmail from '../assets/iconEmail.svg'

export const PlayersCoachesCard = ({player}) => {
    return (
        <div className='players-coaches-card d-flex flex-column align-items-center justify-content-evenly'>
            <div>
                <Image src={player?.image}
                       width='100px'
                       height='100px'
                       rounded
                       className='player-image'
                />
            </div>
            <div className='d-flex flex-column align-items-center justify-content-between w-100 overflow-hidden'
                 style={{height: '75px'}}>
                <div>
                    <span className='player-name text-break flex-wrap'>{player?.name}</span>
                </div>
                <div className='d-flex flex-column'>
                    <span className='player-position'>{player?.jobPosition} at</span>
                    <span className='player-company'>{player?.company}</span>
                </div>
            </div>
            <div className='d-flex flex-column align-items-start align-content-between gap-2'>
                <div className='d-flex flex-row gap-3 align-items-center'>
                    <Image src={IconPhone}
                           className='img-fluid'
                           width='30'
                           height='30'
                    />
                    <span className='player-contact'>{player?.mobileNumber}</span>

                </div>
                <div className='d-flex flex-row gap-3 align-items-center'>
                    <Image src={IconEmail}
                           className='img-fluid'
                           width='30'
                           height='30'
                    />
                    <span class='player-contact'>{player?.email}</span>

                </div>
            </div>
        </div>
    )
}