// import Intro from '../components/Intro';
// import Portfolio from '../components/Portfolio';
// import Services from '../components/Services';
import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, } from "@tosspayments/payment-widget-sdk";
import NavBar from '../components/Navbar/NavBar'

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "dmMpEvazSogyiWiI9Z2nr";

export default function Books() {
    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(50000);
    useEffect(() => {
        (async () => {
            // ------  결제위젯 초기화 ------
            // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
            // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS)  // 비회원 결제
            // ------  결제 UI 렌더링 ------
            // 결제 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
            // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
            // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
            const paymentMethodsWidget = paymentWidget.renderPaymentMethods("#payment-widget", { value: price },
                // 렌더링하고 싶은 결제 UI의 variantKey
                // 아래 variantKey는 문서용 테스트키와 연동되어 있습니다. 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
                // https://docs.tosspayments.com/guides/payment-widget/admin#멀티-결제-ui
                { variantKey: "DEFAULT" });
            // ------  이용약관 UI 렌더링 ------
            // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
            // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
            paymentWidget.renderAgreement('#agreement', { variantKey: "AGREEMENT" } // 기본 이용약관 UI 렌더링
            );
            paymentWidgetRef.current = paymentWidget;
            paymentMethodsWidgetRef.current = paymentMethodsWidget;
        })();
    }, []);
    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;
        if (paymentMethodsWidget == null) {
            return;
        }
        // ------ 금액 업데이트 ------
        // 새로운 결제 금액을 넣어주세요.
        // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
        paymentMethodsWidget.updateAmount(price);
    }, [price]);
    return (

        <div>
            <div>
                <NavBar />
            </div>
            <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6" data-aos="zoom-in">
                <div className="flex flex-col py-8 justify-between text-center">
                    <div className="flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="200">
                        <h1 className="mb-5 md:text-5xl text-3xl font-bold text-blue-900">
                            {/* We build digital solutions to help businesses scale */}
                            Redwood 북스토어에 오신 것을 환영합니다!
                        </h1>
                        <div className="text-xl font-semibold tracking-tight mb-5 text-gray-500">We are a team of highly motivated and skilled developers dedicated to delivering only the best software.</div>
                    </div>
                    {/* <div className="flex lg:justify-end w-full lg:w-1/2" data-aos="fade-up" data-aos-delay="700">
                <img alt="cåard img" className="rounded-t float-right duration-1000 w-full" src={heroImg} />
            </div> */}
                </div>
            </div>
            <h1>주문서</h1>
            <span>{`${price.toLocaleString()}원`}</span>
            <div>
            </div>
            <div id="payment-widget" />
            <div id="agreement" />
            <button
                onClick={async () => {
                    const paymentWidget = paymentWidgetRef.current

                    try {
                        // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                        // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
                        // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
                        await paymentWidget?.requestPayment({
                            orderId: "dmMpEvazSogyiWiI9Z2nr",
                            orderName: "토스 티셔츠 외 2건",
                            customerName: "김토스",
                            customerEmail: "customer123@gmail.com",
                            customerMobilePhone: "01012341234",
                            successUrl: `${window.location.origin}/success`,
                            failUrl: `${window.location.origin}/fail`,
                        })
                    } catch (error) {
                        // 에러 처리하기
                        console.error(error)
                    }
                }}
            >
                결제하기
            </button>
        </div>
    )
    // return (React.createElement("div", null,
    //     React.createElement("h1", null, "\uC8FC\uBB38\uC11C"),
    //     React.createElement("span", null, `${price.toLocaleString()}원`),
    //     React.createElement("div", null,
    //         React.createElement("label", null,
    //             React.createElement("input", { type: "checkbox", onChange: (event) => {
    //                     setPrice(event.target.checked ? price - 5000 : price + 5000);
    //                 } }),
    //             "5,000\uC6D0 \uD560\uC778 \uCFE0\uD3F0 \uC801\uC6A9")),
    //     React.createElement("div", { id: "payment-widget" }),
    //     React.createElement("div", { id: "agreement" }),
    //     React.createElement("button", { onClick: async () => {
    //             const paymentWidget = paymentWidgetRef.current;
    //             try {
    //                 // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    //                 // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
    //                 // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
    //                 await (paymentWidget === null || paymentWidget === void 0 ? void 0 : paymentWidget.requestPayment({
    //                     orderId: "dmMpEvazSogyiWiI9Z2nr",
    //                     orderName: "토스 티셔츠 외 2건",
    //                     customerName: "김토스",
    //                     customerEmail: "customer123@gmail.com",
    //                     customerMobilePhone: "01012341234",
    //                     successUrl: `${window.location.origin}/success`,
    //                     failUrl: `${window.location.origin}/fail`,
    //                 }));
    //             }
    //             catch (error) {
    //                 // 에러 처리하기
    //                 console.error(error);
    //             }
    //         } }, "\uACB0\uC81C\uD558\uAE30")));
}
