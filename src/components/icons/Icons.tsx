import React from "react";

function Boat() {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 212.5 212.5"
    >
      <path
        d="M210.488,158.491l-32.253,34.631c-1.419,1.523-3.406,2.389-5.488,2.389H26.613c-2.731,0-5.246-1.485-6.566-3.876
	L0.934,157.004c-1.282-2.323-1.241-5.151,0.107-7.437c1.35-2.285,3.806-3.688,6.459-3.688H205c2.985,0,5.686,1.77,6.877,4.507
	C213.068,153.124,212.523,156.307,210.488,158.491z M201.382,119.829L94.401,19.031c-2.179-2.052-5.368-2.612-8.116-1.427
	c-2.748,1.187-4.527,3.893-4.527,6.886v100.799c0,4.142,3.357,7.5,7.5,7.5h106.98c3.074,0,5.837-1.876,6.971-4.733
	C204.344,125.198,203.619,121.937,201.382,119.829z M63.218,76.96c-2.748-1.186-5.938-0.625-8.116,1.427l-43.982,41.442
	c-2.237,2.108-2.962,5.368-1.827,8.225c1.134,2.857,3.896,4.733,6.971,4.733h43.982c4.143,0,7.5-3.358,7.5-7.5V83.846
	C67.745,80.853,65.966,78.147,63.218,76.96z"
      />
    </svg>
  );
}
function DownArrow() {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <g>
        <path d="m480.6,111.5h-74.1v-75.9c0-10.7-8.3-19.6-19-20.4-104-7.5-200.4-3.7-263,0.8-10.7,0.8-19,9.8-19,20.5v74.9h-74.1c-10.9,0-20.9,8.8-20.6,22 40.6,166 230.9,361.7 230.9,361.7 9.8,10.8 25.6,4 28.6,0 0,0 177.1-165.8 230.3-359.4 1.6-5.8-0.5-24.3-20-24.2z" />
      </g>
    </svg>
  );
}

function CheckMark() {
  return (
    <svg
      version="1.1"
      baseProfile="tiny"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="42px"
      height="42px"
      viewBox="0 0 42 42"
    >
      <path
        d="M39.04,7.604l-2.398-1.93c-1.182-0.95-1.869-0.939-2.881,0.311L16.332,27.494l-8.111-6.739
	c-1.119-0.94-1.819-0.89-2.739,0.26l-1.851,2.41c-0.939,1.182-0.819,1.853,0.291,2.78l11.56,9.562c1.19,1,1.86,0.897,2.78-0.222
	l21.079-25.061C40.331,9.294,40.271,8.583,39.04,7.604z"
      />
    </svg>
  );
}
function XInsideCircle() {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z" />
    </svg>
  );
}

export { Boat, DownArrow, CheckMark, XInsideCircle };
