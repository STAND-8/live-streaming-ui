// import React from 'react';
// import ReactDOM from 'react-dom';
// import ShakaPlayer from 'shaka-player-react';

// const STREAMS = [
//   {
//     name: 'Angel One MPEG-DASH',
//     src: 'https://d3ihgx4qqsi5hi.cloudfront.net/out/v1/ea671d64acd1489795d660beeeb547be/index.mpd'
//   },
//   {
//     name: 'Big Buck Bunny HLS',
//     src:
//       'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8'
//   }
// ];

// function App() {
//   const [show, setShow] = React.useState(false);
//   const [chromeless, setChromeless] = React.useState(false);
//   const ref = React.useRef(null);

//   React.useEffect(() => {
//     window.getShakaInst = () => ref.current;
//   }, []);

//   function onToggle() {
//     setShow(!show);
//   }

//   function onChromeless() {
//     setChromeless(!chromeless);
//   }

//   const [src, setSrc] = React.useState(STREAMS[0].src);

//   function onSelectSrc(event) {
//     setSrc(event.target.value);
//   }

//   return (
//     <div>
    
//       <div>
//         <select value={src} onChange={onSelectSrc}>
//           {STREAMS.map(stream => (
//             <option value={stream.src}>{stream.name}</option>
//           ))}
//         </select>
//       </div>
      
//         <ShakaPlayer ref={ref} autoPlay src={src} width={200} height={200} />
      
//     </div>
//   );
// }
import React from 'react';
import ReactDOM from 'react-dom';
import VideoPlayer from './VideoPlayer';
import Header from './Header';

function App() {
  

  return (
    
    
   <div>
     <Header/>
     <h1 className="header">Live Video Session</h1>
     <VideoPlayer />
   </div> 
    
      
    
  );
}
export default App;