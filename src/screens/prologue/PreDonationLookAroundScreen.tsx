import React, {Fragment, useEffect, useState} from "react";
import './styles.css';
import {IMAGES} from "../../constants/images";
import {Prologuimages} from "../../constants/prologuimages";
import {PrologueText} from "../../constants/prologueText";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {useRecoilState} from "recoil";
import {accessTokenState} from "../../state/loginState";

const baseUrl = 'https://www.match-api-server.com';

const PreDonationLookAroundScreen = () => {
    const [token, setToken] = useRecoilState(accessTokenState);

    const location = useLocation();
    const {donationKind} = location.state

    const [items, setItems] = useState<any[]>([]);


    useEffect(() => {
        const data = {
            page : 0,
            size : 10,
            donationKind : donationKind,
        }
        axios.get(
            baseUrl + `/donation-temporaries`,
            {
                params: data,
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
            }
        )
            .then((response) => {
                setItems(response.data.result.contents);
                console.log('# 기부금 ::::: '+items);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    },[])

    const handleComplete = () => {
        const completepage = process.env.REACT_APP_PUBLIC_URL+`/menu`;
        window.location.href = completepage
    }

    return (
        <Fragment>
            <div>
                <div className={"donation_container"}>
                    <div className={"donation-icon-container"}>
                        <img className={"donation-money-icon"} style={{marginBottom: "-6rem"}} src={Prologuimages.moneyIcon}/>
                        <text className={"donate_info_txt"} style={{marginBottom: "-6rem"}}
                        >dkdk</text>
                        <div className={"donate_info_txt"}>
                            <ul>
                                {items.map((item) => (
                                    <ListItem
                                        key={item.name}
                                        name={item.name}
                                        amount={item.amount}
                                        donationDate={item.donationDate}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>


                    <img className={"donation_icon"} src={Prologuimages.catIcon1}/>
                    <text className={"donate_txt"}
                          style={{marginBottom: "-3rem"}}>{PrologueText.donationLookDesc1}</text>
                    <text className={"alert_txt"} style={{marginBottom: "1rem"}}>*{PrologueText.donationAlert}</text>

                    {donationKind === "DOG" && (
                        <div className={"info_txt"}>
                            {PrologueText.donateForDesc1}{PrologueText.donationLookDesc2}
                        </div>
                    )}
                    {donationKind === "CHILD" && (
                        <div className={"info_txt"}>
                            {PrologueText.donateForDesc2}{PrologueText.donationLookDesc2}
                        </div>
                    )}
                    {donationKind === "OCEAN" && (
                        <div className={"info_txt"}>
                            {PrologueText.donateForDesc3}{PrologueText.donationLookDesc2}
                        </div>
                    )}
                    {donationKind === "VISUALLY_IMPAIRED" && (
                        <div className={"info_txt"}>
                            {PrologueText.donateForDesc4}{PrologueText.donationLookDesc2}
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}
interface ListItemProps {
    name: string;
    amount: string;
    donationDate: string;
}
const ListItem: React.FC<ListItemProps> = ({ name, amount, donationDate }) => {

    return (
        <>
            <text className={"donate_info_txt"} style={{marginBottom: "-6rem"}}
            > + {amount} / {donationDate} / {name} 님</text>
        </>
    );
}
export default PreDonationLookAroundScreen