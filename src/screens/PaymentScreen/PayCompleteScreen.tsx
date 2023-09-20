import React, {Fragment, useEffect, useState} from "react";
import './style.css';
import {IMAGES} from "../../constants/images";
import {TEXT} from "../../constants/text";
import * as process from "process";
import {useLocation} from "react-router-dom";

const PayCompleteScreen = () => {

    const [name, setName] = useState<string>('후원자')
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    //pid
    const amount = searchParams.get('amount');

    const handleNextBtn = () => {
        window.location.href = process.env.REACT_APP_PUBLIC_URL+``
    }

    useEffect(() => {
        const slides = document.querySelectorAll(".slide");
        const dots = document.querySelectorAll(".slider-dot");
        let currentSlide = 0;

        function showSlide(n: number) {
            //slides.forEach((slide) => (slide.style.transform = `translateX(-${n * 100}%)`));
            slides.forEach((slide, index) => {
                const slideElement = slide as HTMLElement;
                slideElement.style.transform = `translateX(-${n * 100}%)`;
            });
            dots.forEach((dot) => dot.classList.remove("active"));
            dots[n].classList.add("active");
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        const slideInterval = setInterval(nextSlide, 5000); // 자동 슬라이드 간격 설정

        // 다음 버튼과 이전 버튼을 추가하려면 아래와 같이 사용합니다.
        // const nextButton = document.querySelector(".next-button");
        // const prevButton = document.querySelector(".prev-button");
        // nextButton.addEventListener("click", nextSlide);
        // prevButton.addEventListener("click", prevSlide);

        return () => {
            // 컴포넌트가 언마운트될 때 clearInterval 등의 정리 작업 수행
            clearInterval(slideInterval);
        };
    }, []);

    return (
        <Fragment>
            <div className={"complete-container"}>
                <text className={"complete-txt"}>기부금 결제 완료!</text>

                <div className="slider">
                    <div className="slide">
                        <text className={"complete-body-txt"}>{name}님의 따뜻한 {amount}원이<br/>전달되는 이야기를 곧 들려드릴게요.</text>
                    </div>
                    <div className="slide">
                        <text className={"complete-body-txt"}>기부금이 집행되기 전까지는<br/>언제든지 결제 환불이 가능해요.</text>
                    </div>
                    <div className="slide">
                        <text className={"complete-body-txt"}>MATCH 서비스에 대한<br/>피드백을 받고 있어요.</text>
                    </div>
                </div>
                <div className="slider-dots">
                    <span className="slider-dot"></span>
                    <span className="slider-dot"></span>
                    <span className="slider-dot"></span>
                </div>

                <button className={"okay-btn"}
                        onClick={() => handleNextBtn()}
                >확인
                </button>






            </div>
        </Fragment>
    );
}
export default PayCompleteScreen