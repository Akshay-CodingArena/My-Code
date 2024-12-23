import { Helmet } from "react-helmet"

const ThankYouCash = ()=>{
    return (<>
        <Helmet>
        {/*       
            <script dangerouslySetInnerHTML={{__html: ` 
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MHBT7XT');
            
            `}}>
            </script>
            <script type="text/javascript" dangerouslySetInnerHTML={{
      __html: `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MHBT7XT"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></script> */}

        <script>
          {`
          window.dataLayer.push({
            event: 'transaction_success'
         });
        `}
        </script>
      </Helmet>
      <div className="light-grey admin-page padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
                <h1>Booking Confirmed!</h1>
                <p>Thank you for booking with us! Your bike is reserved and ready for you. We'll see you at pickup. If you need any assistance, feel free to contact us.</p>
            </div>
        </div>
       </div>
      </div>
    </>
    )
}

export default ThankYouCash