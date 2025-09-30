'use client'

export default function ChristmasLights() {
  return (
    <>
      <style jsx>{`
        @keyframes light1 {
          25% { opacity: 0.45; }
          50% { opacity: 0; }
          75% { opacity: 0.64; }
          100% { opacity: 0.45; }
        }
        @keyframes light2 {
          25% { opacity: 0.61; }
          50% { opacity: 0; }
          75% { opacity: 0.29; }
          100% { opacity: 0.61; }
        }
        @keyframes light3 {
          25% { opacity: 0.57; }
          50% { opacity: 0; }
          75% { opacity: 0.5; }
          100% { opacity: 0.57; }
        }
        @keyframes light4 {
          25% { opacity: 0.62; }
          50% { opacity: 0; }
          75% { opacity: 0.54; }
          100% { opacity: 0.62; }
        }
        @keyframes light5 {
          25% { opacity: 0.71; }
          50% { opacity: 0; }
          75% { opacity: 0.46; }
          100% { opacity: 0.71; }
        }
        @keyframes light6 {
          25% { opacity: 0.68; }
          50% { opacity: 0; }
          75% { opacity: 0.43; }
          100% { opacity: 0.68; }
        }

        .bokeh {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          top: 0;
          left: 0;
        }

        .light {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
        }
      `}</style>

      <div className="bokeh">
        <div className="light" style={{width: '94px', height: '94px', top: '57%', left: '44%', background: '#FFD700', filter: 'blur(4px)', animation: '24s light2 linear infinite'}} />
        <div className="light" style={{width: '89px', height: '89px', top: '47%', left: '30%', background: '#FF6B6B', filter: 'blur(3px)', animation: '26s light3 linear infinite'}} />
        <div className="light" style={{width: '98px', height: '98px', top: '75%', left: '15%', background: '#4ECDC4', filter: 'blur(4px)', animation: '28s light5 linear infinite'}} />
        <div className="light" style={{width: '96px', height: '96px', top: '47%', left: '96%', background: '#FF0000', filter: 'blur(3px)', animation: '14s light2 linear infinite'}} />
        <div className="light" style={{width: '76px', height: '76px', top: '55%', left: '54%', background: '#FFA500', filter: 'blur(4px)', animation: '18s light5 linear infinite'}} />
        <div className="light" style={{width: '82px', height: '82px', top: '65%', left: '72%', background: '#FF1744', filter: 'blur(4px)', animation: '16s light4 linear infinite'}} />
        <div className="light" style={{width: '99px', height: '99px', top: '92%', left: '35%', background: '#00FF00', filter: 'blur(3px)', animation: '27s light3 linear infinite'}} />
        <div className="light" style={{width: '89px', height: '89px', top: '23%', left: '50%', background: '#FFD700', filter: 'blur(4px)', animation: '20s light1 linear infinite'}} />
        <div className="light" style={{width: '75px', height: '75px', top: '10%', left: '80%', background: '#FF6B6B', filter: 'blur(3px)', animation: '22s light6 linear infinite'}} />
        <div className="light" style={{width: '92px', height: '92px', top: '85%', left: '60%', background: '#4ECDC4', filter: 'blur(4px)', animation: '15s light2 linear infinite'}} />
        <div className="light" style={{width: '87px', height: '87px', top: '35%', left: '10%', background: '#FFA500', filter: 'blur(3px)', animation: '25s light4 linear infinite'}} />
        <div className="light" style={{width: '80px', height: '80px', top: '70%', left: '85%', background: '#00FF00', filter: 'blur(4px)', animation: '19s light3 linear infinite'}} />
        <div className="light" style={{width: '95px', height: '95px', top: '15%', left: '25%', background: '#FFD700', filter: 'blur(3px)', animation: '23s light5 linear infinite'}} />
        <div className="light" style={{width: '78px', height: '78px', top: '45%', left: '65%', background: '#FF1744', filter: 'blur(4px)', animation: '17s light1 linear infinite'}} />
        <div className="light" style={{width: '90px', height: '90px', top: '5%', left: '40%', background: '#4ECDC4', filter: 'blur(3px)', animation: '21s light6 linear infinite'}} />
        <div className="light" style={{width: '85px', height: '85px', top: '80%', left: '20%', background: '#FFA500', filter: 'blur(4px)', animation: '26s light2 linear infinite'}} />
        <div className="light" style={{width: '88px', height: '88px', top: '30%', left: '75%', background: '#00FF00', filter: 'blur(3px)', animation: '18s light4 linear infinite'}} />
        <div className="light" style={{width: '93px', height: '93px', top: '60%', left: '5%', background: '#FF6B6B', filter: 'blur(4px)', animation: '24s light3 linear infinite'}} />
        <div className="light" style={{width: '77px', height: '77px', top: '20%', left: '90%', background: '#FFD700', filter: 'blur(3px)', animation: '20s light5 linear infinite'}} />
        <div className="light" style={{width: '84px', height: '84px', top: '50%', left: '35%', background: '#FF1744', filter: 'blur(4px)', animation: '22s light1 linear infinite'}} />
      </div>
    </>
  )
}