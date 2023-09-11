import React, {Fragment, useState} from "react";
import './styles.css';
import {IMAGES} from "../constants/images";
import {Prologuimages} from "../constants/prologuimages";
import {PrologueText} from "../constants/prologueText";
import {TEXT} from "../constants/text";
import {Link, useLocation} from "react-router-dom";

const Menu = () => {

    const [kind, setKind] = useState<string>('');

    const handleComplete = () => {
        const completepage = process.env.REACT_APP_PUBLIC_URL+`/menu`;
        window.location.href = completepage
    }
    const handleSetKind = (dKind: string) => {
        setKind(dKind)
        console.log('# Menu --기부유형: '+dKind);
    }
    const generateDonationLink = (donationKind: string) => (
        <Link
            to={`/pre/donate/lookAround`}
            state={{ donationKind: donationKind }}
            style={{ textDecoration: "none", color: "black", width: "17rem", marginBottom: "-2.11rem" }}
        >
            <text className={"menu_detail_txt"} onClick={() => handleSetKind(donationKind)}>
                {PrologueText[`menu2_${donationKind}` as keyof typeof PrologueText]}
            </text>
        </Link>
    );

    return (
        <Fragment>
            <div className={"menu_container"}>
                <text className={"menu_txt"}>{TEXT.menu1}</text>
                <text className={"menu_txt"}>{TEXT.menu2}</text>
                <div className={"menu_detail_container"}>
                    <Link to={`/pre/donate/lookAround`} state={{donationKind: 'DOG'}}
                          style={{textDecoration: "none", color: "black"}}>
                        <text className={"menu_detail_txt"}>{TEXT.menu2_1}</text>
                    </Link>
                    <Link to={`/pre/donate/lookAround`} state={{donationKind: 'CHILD'}}
                          style={{textDecoration: "none", color: "black"}}>
                        <text className={"menu_detail_txt"}>{TEXT.menu2_2}</text>
                    </Link>
                    <Link to={`/pre/donate/lookAround`} state={{donationKind: 'OCEAN'}}
                          style={{textDecoration: "none", color: "black"}}>
                        <text className={"menu_detail_txt"}>{TEXT.menu2_3}</text>
                    </Link>
                    <Link to={`/pre/donate/lookAround`} state={{donationKind: 'VISUALLY_IMPAIRED'}}
                          style={{textDecoration: "none", color: "black"}}>
                        <text className={"menu_detail_txt"}>{TEXT.menu2_4}</text>
                    </Link>
                    {/*{generateDonationLink("DOG")}
                    {generateDonationLink("CHILD")}
                    {generateDonationLink("OCEAN")}
                    {generateDonationLink("VISUALLY_IMPAIRED")}*/}


                    {/*<Link to={`/pre/donate/lookAround`} state={{donationKind: 'DOG'}}
                          style={{textDecoration: "none", color: "black"}}>
                        <text className={"menu_detail_txt"}>{TEXT.menu2_1}</text>
                    </Link>
                    <text className={"menu_detail_txt"}>{TEXT.menu2_2}</text>
                    <text className={"menu_detail_txt"}>{TEXT.menu2_3}</text>
                    <text className={"menu_detail_txt"}>{TEXT.menu2_4}</text>*/}
                </div>

                <text className={"menu_txt"}>{TEXT.menu3}</text>
            </div>
        </Fragment>
    );
}
export default Menu