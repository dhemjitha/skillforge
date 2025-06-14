export default function NotFound() {
  return (
    <div style={{
      color: '#000',
      background: '#fff',
      fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
      height: '100vh',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div>
        <style dangerouslySetInnerHTML={{
          __html: `
            body { margin: 0; color: #000; background: #fff; }
            .next-error-h1 {
              display: inline-block;
              margin: 0 20px 0 0;
              padding-right: 23px;
              font-size: 24px;
              font-weight: 500;
              vertical-align: top;
              line-height: 49px;
              border-right: 1px solid rgba(0, 0, 0, .3);
            }
            .next-error-message {
              display: inline-block;
              text-align: left;
              line-height: 49px;
              height: 49px;
              vertical-align: middle;
            }
            .next-error-message h2 {
              font-size: 14px;
              font-weight: normal;
              line-height: 49px;
              margin: 0;
              padding: 0;
            }
            
            /* Tablet styles */
            @media (max-width: 1024px) {
              .next-error-h1 {
                font-size: 22px;
                margin: 0 15px 0 0;
                padding-right: 20px;
              }
            }
            
            /* Mobile styles */
            @media (max-width: 768px) {
              .next-error-h1 {
                display: block;
                margin: 0 0 20px;
                padding: 0 0 20px 0;
                border-right: 0;
                border-bottom: 1px solid rgba(0, 0, 0, .3);
                text-align: center;
                font-size: 20px;
                line-height: 1.2;
              }
              .next-error-message {
                display: block;
                text-align: center;
                line-height: 1.4;
                height: auto;
              }
              .next-error-message h2 {
                line-height: 1.4;
                font-size: 13px;
              }
            }
            
            /* Small mobile styles */
            @media (max-width: 480px) {
              .next-error-h1 {
                font-size: 18px;
                margin: 0 0 15px;
                padding: 0 0 15px 0;
              }
              .next-error-message h2 {
                font-size: 12px;
              }
            }
            
            /* Large desktop styles */
            @media (min-width: 1200px) {
              .next-error-h1 {
                font-size: 28px;
                margin: 0 25px 0 0;
                padding-right: 28px;
              }
              .next-error-message h2 {
                font-size: 16px;
              }
            }
          `
        }} />
        <h1 className="next-error-h1">404</h1>
        <div className="next-error-message">
          <h2>
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  )
} 